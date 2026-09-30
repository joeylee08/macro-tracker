import { Router } from 'express'
import { prisma } from '../db/prisma.js'
import { validateData } from '../util/helpers.js'
import { verifyPassword } from '../util/auth.js'
import { requireAuth } from '../middleware/requireauth.js'

const router = Router()

// LOGIN / LOGOUT ROUTES
router.post(`/login`, async (req, res) => {
    if (!validateData(req.body, 'signup')) {
        return res.status(400).json({
            'error': 'Username and password must be strings.'
        })
    }
    const username = req.body.username.trim()
    const password = req.body.password

    const user = await prisma.user.findUnique({
        where: { username: username}
    })
    if (user === null) {
        return res.status(401).json({
            'error': 'Username and/or password is incorrect.'
        })
    }
    const verified = await verifyPassword(password, user.passwordHash)
    if (!verified) {
        return res.status(401).json({
            'error': 'Username and/or password is incorrect.'
        })
    }
    req.session.userId = user.id

    const { passwordHash, ...safeUser } = user
    return res.json(safeUser)
})

router.post('/logout', requireAuth, (req, res) => {
    //session.destroy() does not return a promise, so we format it OG Node style as a cb
    req.session.destroy((error) => {
        if (error) {
            console.error(error)
            return res.status(500).json({
                'error': 'Unable to end current session.'
            })
        }
        res.clearCookie('macroTracker.sid')
        return res.json({
            'message': 'Successfully ended current session.'
        })
    })
})

router.get('/me', requireAuth, (req, res) => {
    const { passwordHash: _, ...safeUser } = req.currentUser!
    return res.json(safeUser)
})

export { router }