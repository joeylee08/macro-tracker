import { Router } from 'express'
import { prisma } from '../db/prisma';
import { Prisma } from '../generated/prisma/client.js'
import { validateData } from "../util/helpers";
import { requireAuth } from '../middleware/requireauth'
import { isParamInt } from '../middleware/isparamint.js';
import { verifyById } from '../middleware/verifybyid.js';

const router = Router()

router.get('/:id', requireAuth, isParamInt, verifyById('food'), async (req, res) => {
    const id = +req.params.id
    
    const food = await prisma.food.findUnique({
        where: { id: id }
    })
    if (!food) {
        return res.status(404).json({
            'error': 'Food not found.'
        })
    }
    res.json(food)
})

router.post('/', requireAuth, async (req, res) => {
    const foodData = req.body
    if (!validateData(foodData, 'food')) {
        return res.status(400).json({
            'error': 'Your food data contains invalid properties.'
        })
    }
    const userId = req.session.userId!
    
    const name = foodData.name.trim()
    if (name === '' || name.length > 19) {
        return res.status(400).json({
            'error': 'Food name must contain between 1 and 19 characters.'
        })
    }
    const servingUnits = ['oz', 'tsp', 'tbsp', 'g', 'cup', 'piece']
    if (!servingUnits.includes(foodData.servingUnit)) {
        return res.status(400).json({
            'error': 'Not a valid serving unit.'
        })
    }
    if (foodData.servingSize <= 0) {
        return res.status(400).json({
            'error': 'Serving size must be greater than zero.'
        })
    }
    const macroValues = [
        foodData.cal,
        foodData.protein,
        foodData.carb,
        foodData.fat,
        foodData.sodium
    ]
    for (const macro of macroValues) {
        if (macro < 0) {
            return res.status(400).json({
                'error': 'Macro values may not be negative.'
            })
        }
    }
    const added = await prisma.food.create({
        data: {
            name: name,
            userId: userId,
            servingSize: +foodData.servingSize,
            servingUnit: foodData.servingUnit,
            cal: +foodData.cal,
            protein: +foodData.protein,
            carb: +foodData.carb,
            fat: +foodData.fat,
            sodium: +foodData.sodium
        }
    })
    res.status(201).json(added)
})

router.patch('/:id', requireAuth, isParamInt, verifyById('food'), async (req, res) => {
    const id = +req.params.id
    
    const foodData = req.body
    if (!validateData(foodData, 'food')) {
        return res.status(400).json({
            'error': 'Your food data contains invalid properties.'
        })
    }
    const { name, servingSize, servingUnit, cal, protein, carb, fat, sodium } = foodData
    const trimmed = name.trim()
    if (trimmed.length === 0 || trimmed.length > 19) {
        return res.status(400).json({
            'error': 'Name must be between 1 and 19 characters.'
        })
    }
    const servingUnits = ['oz', 'tsp', 'tbsp', 'g', 'cup', 'piece']
    if (!servingUnits.includes(foodData.servingUnit)) {
        return res.status(400).json({
            'error': 'Not a valid serving unit.'
        })
    }
    if (foodData.servingSize <= 0) {
        return res.status(400).json({
            'error': 'Serving size must be greater than zero.'
        })
    }
    const macroValues = [
        foodData.cal,
        foodData.protein,
        foodData.carb,
        foodData.fat,
        foodData.sodium
    ]
    for (const macro of macroValues) {
        if (macro < 0) {
            return res.status(400).json({
                'error': 'Macro values may not be negative.'
            })
        }
    }
    try {
        const updated = await prisma.food.update({
            where: { id: id },
            data: {
                name: trimmed,
                servingSize: +servingSize,
                servingUnit: servingUnit,
                cal: +cal,
                protein: +protein,
                carb: +carb,
                fat: +fat,
                sodium: +sodium
            }
        })
        res.json(updated)
    } catch(error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            return res.status(404).json({
                'error': 'Food not found.'
            })
        }
        throw error
    }
})

router.delete('/:id', requireAuth, isParamInt, verifyById('food'), async (req, res) => {
    const id = +req.params.id
    
    try {
        const result = await prisma.$transaction(async (tx) => {
            //find linked meals
            const linkedMealEntries = await tx.mealIngredient.findMany({
                where: { foodId: id },
                select: { mealId: true }
            })
            const linkedMealIds = linkedMealEntries.map(entry => entry.mealId)

            //delete the food
            await tx.food.delete({
                where: { id: id }
            })
            //see if any of the previously linked meals now have zero ingredients
            const linkedMeals = await tx.meal.findMany({
                where: {
                    id: { in: linkedMealIds },
                    mealIngredients: { none: {} }
                },
                select: { id: true }
            })
            //systematically delete those now empty meals
            const emptyMealIds = linkedMeals.map(meal => meal.id)
            await tx.meal.deleteMany({
                where: {
                    id: { in: emptyMealIds }
                }
            })
            //query again to find suriviving meals from original list [still has >= 1 food]
            const remainingMeals = await tx.meal.findMany({
                where: {
                    id: { in: linkedMealIds}
                },
                include: {
                    mealIngredients: true
                }
            })
            const formattedMeals = remainingMeals.map(meal => ({
                id: meal.id,
                name: meal.name,
                userId: meal.userId,
                ingredients: meal.mealIngredients
            }))
            return {
                'deletedFoodId': id,
                'emptyMealIds': emptyMealIds,
                'remainingMeals': formattedMeals
            }
        })
        res.json({
            message: 'Successfully deleted food.',
            ...result
        })
    } catch(error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            return res.status(404).json({
                'error': 'Food not found.'
            })
        }
        throw error
    }
})

router.get('/:foodId/meals', requireAuth, isParamInt, async (req, res) => {
    const id = +req.params.foodId
    
    const food = await prisma.food.findUnique({
        where: { id: id}
    })
    if (!food) {
        return res.status(404).json({
            error: 'Food not found.'
        })
    }
    const userId = req.session.userId
    if (food.userId !== userId) {
        return res.status(403).json({'error': 'FORBIDDEN.'})
    }
    const linkedMealIngredients = await prisma.mealIngredient.findMany({
        where: { foodId: id },
        select: { mealId: true}
    })
    const linkedMealIds = linkedMealIngredients.map(meal => meal.mealId)
    const linkedMeals = await prisma.meal.findMany({
        where: {
            id: { in: linkedMealIds }
        }
    })
    res.json(linkedMeals)
})

router.delete('/:foodId/meals', requireAuth, isParamInt, async (req, res) => {
    const id = +req.params.foodId
    
    const food = await prisma.food.findUnique({
        where: { id: id}
    })
    if (!food) {
        return res.status(404).json({
            error: 'Food not found.'
        })
    }
    const userId = req.session.userId
    if (food.userId !== userId) {
        return res.status(403).json({'error': 'FORBIDDEN.'})
    }
    try {
        const result = await prisma.$transaction(async (tx) => {
            const linkedMealIds = await tx.mealIngredient.findMany({
                where: { foodId: id },
                select: { mealId: true }
            })
            const idArray = linkedMealIds.map(item => item.mealId)

            await tx.meal.deleteMany({
                where: {
                    id: { in: idArray }
                }
            })
            await tx.food.delete({
                where: { id: id}
            })
            return {
                'foodId': id,
                'deletedMeals': idArray
            }
        })
        res.json({
            'message': 'Successfully deleted food and all associated meals.',
            ...result
        })
    } catch(error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            return res.status(404).json({
                'error': 'Food not found.'
            })
        }
        throw error
    }    
})

export { router }