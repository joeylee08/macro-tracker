import { Router } from 'express'
import { prisma } from '../db/prisma.js';
import { Prisma } from '../generated/prisma/client.js'
import { requireAuth } from '../middleware/requireauth.js'
import { isParamInt } from '../middleware/isparamint.js';
import { verifyById } from '../middleware/verifybyid.js';
import { validateData } from "../util/helpers.js";

const router = Router()

router.get('/:id', requireAuth, isParamInt, verifyById('mealEntry'), async (req, res) => {
    const id = +req.params.id
    
    const mealEntry = await prisma.mealEntry.findUnique({
        where: { id: id }
    })
    if (!mealEntry) {
        return res.status(404).json({
            'error': 'Meal entry not found.'
        })
    }
    res.json(mealEntry)
})

router.post('/', requireAuth, async (req, res) => {
    const mealEntryData = req.body
    if (!validateData(mealEntryData, 'mealEntry')) {
        return res.status(400).json({
            'error': 'Your meal entry data contains invalid properties.'
        })
    }
    const userId = req.session.userId!
    
    const name = mealEntryData.name.trim()
    if (name === '' || name.length > 18) {
        return res.status(400).json({
            'error': 'Meal name must contain between 1 and 18 characters.'
        })
    }
    const macroValues = [
        mealEntryData.cal,
        mealEntryData.protein,
        mealEntryData.carb,
        mealEntryData.fat,
        mealEntryData.sodium
    ]
    for (const macro of macroValues) {
        if (macro < 0) {
            return res.status(400).json({
                'error': 'Macro values may not be negative.'
            })
        }
    }
    const added = await prisma.mealEntry.create({
        data: {
            userId: userId,
            name: name,
            cal: mealEntryData.cal,
            protein: mealEntryData.protein,
            carb: mealEntryData.carb,
            fat: mealEntryData.fat,
            sodium: mealEntryData.sodium
        }
    })
    res.status(201).json(added)
})

router.delete('/:id', requireAuth, isParamInt, verifyById('mealEntry'), async (req, res) => {
    const id = +req.params.id
    
    try {
        await prisma.mealEntry.delete({
            where: { id: id }
        })
    } catch(error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            return res.status(404).json({
                'error': 'Meal entry not found.'
            })
        }
        throw error
    }
    res.json({
        'message': 'Successfully deleted meal entry.',
    })
})

export { router }