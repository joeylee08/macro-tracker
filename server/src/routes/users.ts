import { Router } from 'express';
import { prisma } from '../db/prisma';
import { Prisma } from '../generated/prisma/client.js'
import { requireAuth } from '../middleware/requireauth'
import { isParamInt } from '../middleware/isparamint.js';
import { verifyById } from '../middleware/verifybyid.js';
import { validateData } from "../util/helpers";
import { hashPassword } from "../util/auth";
import { seedStarterData } from '../util/helpers';


const router = Router()

router.get('/:id', requireAuth, isParamInt, verifyById('user'), async (req, res) => {
    const { passwordHash: _, ...safeUser } = req.currentUser!
    res.json(safeUser)
})

router.post('/', async (req, res) => {
    const userData = req.body
    if (!validateData(userData, 'signup')) {
        return res.status(400).json({
            'error': 'User data is not formatted properly.'
        })
    }
    const username = userData.username.trim()
    const password = userData.password

    if (username === '' || password.length === 0) {
        return res.status(400).json({
            'error': 'Username and password must each contain at least 1 character.'
        })
    }
    const existingUsername = await prisma.user.findUnique({
        where: {
            username: username
        }
    })
    if (existingUsername) {
        return res.status(409).json({
            'error': 'That username is already taken.'
        })
    }
    const passwordHash = await hashPassword(password)
    const newUser = {
        username: username,
        passwordHash: passwordHash,
    }
    //Race handling [if someone steals your username in the ms between form submission and db update]
    try {
        const added = await prisma.$transaction(async (tx) => {
            const user = await tx.user.create({
                data: newUser
            })
            await seedStarterData(user.id, tx)
            return user
        })
        const { passwordHash: _, ...withoutPassword } = added
        req.session.userId = added.id
        res.status(201).json(withoutPassword)
    } catch(error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
            return res.status(409).json({
                error: 'That username is already taken.'
            })
        }
        throw error
    }
    
})

router.patch('/:id', requireAuth, isParamInt, verifyById('user'), async (req, res) => {
    const id = +req.params.id
    
    const userData = req.body
    if (!validateData(userData, 'macro')) {
        return res.status(400).json({
            'error': 'Your user data contains invalid properties.'
        })
    }
    const macroValues = [
        userData.calGoal,
        userData.proteinGoal,
        userData.carbGoal,
        userData.fatGoal,
        userData.sodiumGoal
    ]
    for (const macro of macroValues) {
        if (macro < 0 || !Number.isInteger(macro)) {
            return res.status(400).json({
                'error': 'All macro values must be non-negative integers.'
            })
        }
    }
    const { calGoal, proteinGoal, carbGoal, fatGoal, sodiumGoal } = userData
    try {
        const updated = await prisma.user.update({
            where: { id: id },
            data: {
                calGoal: +calGoal,
                proteinGoal: +proteinGoal,
                carbGoal: +carbGoal,
                fatGoal: +fatGoal,
                sodiumGoal: +sodiumGoal
            }
        })
        const { passwordHash: _, ...safeUser } = updated
        res.json(safeUser)
    } catch(error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            return res.status(404).json({
                'error': 'User not found.'
            })
        }
        throw error
    }
})

router.delete('/:id', requireAuth, isParamInt, verifyById('user'), async (req, res) => {
    const id = +req.params.id
    
    try {
        await prisma.user.delete({
            where: { id: id }
        })
    } catch(error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            return res.status(404).json({
                error: 'User not found.'
            })
        }
        throw error
    }
    res.json({
        'message': 'Successfully deleted user.',
    })
})

export { router }