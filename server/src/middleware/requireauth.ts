//Require Authorization. Inline check for the existence of an active userId in session
import type { Request, Response, NextFunction } from 'express'
import { prisma } from '../db/prisma'

const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.session.userId) {
        return res.status(401).json({
            error: 'Not authenticated.'
        })
    }
    const user = await prisma.user.findUnique({
        where: {
            id: req.session.userId
        }
    })

    //if user stored in session does not exist in db, destroy session and logout
    if (!user) {
        req.session.destroy((error) => {
            if (error) {
                console.error(error)
                return res.status(500).json({
                    'error': 'Unable to end current session.'
                })
            }
            res.clearCookie('macroTracker.sid')
            return res.status(401).json({
                error: 'Not authenticated.'
            })
        })
        return
    }
    req.currentUser = user
    next()
}

export { requireAuth }