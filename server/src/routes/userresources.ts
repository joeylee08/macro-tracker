import { Router } from 'express'
import { prisma } from '../db/prisma.js';
import { requireAuth } from '../middleware/requireauth.js'
import { isParamInt } from '../middleware/isparamint.js';

const router = Router({ mergeParams: true })

router.get('/foods',requireAuth, isParamInt, async (req, res) => {
    const id = +req.params.userId
    
    const userId = req.session.userId!
    if (id !== userId) {
        return res.status(403).json({'error': 'FORBIDDEN.'})
    }
    
    const foods = await prisma.food.findMany({
        where: { userId: userId }
    })
    res.json(foods)
})

router.get('/meals', requireAuth, isParamInt, async (req, res) => {
    const id = +req.params.userId
    const userId = req.session.userId!

    if (id !== userId) {
        return res.status(403).json({'error': 'FORBIDDEN.'})
    }
    
    const meals = await prisma.meal.findMany({
        where: { userId: userId },
        include: {
            mealIngredients: {
                select: { foodId: true, units: true }
            }
        }
    })
    const formattedMeals = meals.map(meal => ({
        id: meal.id,
        name: meal.name,
        userId: meal.userId,
        ingredients: meal.mealIngredients
    }))
    res.json(formattedMeals)
})

router.get('/mealEntries', requireAuth, isParamInt, async (req, res) => {
    const id = +req.params.userId
    
    const userId = req.session.userId!
    if (id !== userId) {
        return res.status(403).json({'error': 'FORBIDDEN.'})
    }
    
    const mealEntries = await prisma.mealEntry.findMany({
        where: { userId: userId },
        orderBy: { dateAndTime: 'asc' }
    })
    res.json(mealEntries)
})

export { router }