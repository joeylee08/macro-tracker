import { Router } from 'express'
import { prisma } from '../db/prisma.js';
import { Prisma } from '../generated/prisma/client.js'
import { requireAuth } from '../middleware/requireauth.js'
import { isParamInt } from '../middleware/isparamint.js';
import { verifyById } from '../middleware/verifybyid.js';
import { validateData } from "../util/helpers.js";

const router = Router()

router.get('/:id', requireAuth, isParamInt, verifyById('meal'), async (req, res) => {
    const id = +req.params.id
    
    const meal = await prisma.meal.findUnique({
        where: { id: id },
        include: {
            mealIngredients: {
                include: { food: true }
            }
        }
    })
    if (!meal) {
        return res.status(404).json({
            'error': 'Meal not found.'
        })
    }
    res.json(meal)
})

router.post('/', requireAuth, async (req, res) => {
    const mealData = req.body
    if (!validateData(mealData, 'meal')) {
        return res.status(400).json({
            'error': 'Your meal data contains invalid properties.'
        })
    }
    const userId = req.session.userId!

    const name = mealData.name.trim()
    if (name === '' || name.length > 19) {
        return res.status(400).json({
            'error': 'Name must contain between 1 and 19 characters.'
        })
    }
    const mealIngredients = mealData.ingredients
    if (!Array.isArray(mealIngredients) || mealIngredients.length === 0) {
        return res.status(400).json({
            'error': 'Ingredients must be an array containing at least one item.'
        })
    }
    for (const item of mealIngredients) {
        if (!validateData(item, 'ingredient')) {
            return res.status(400).json({
                'error': 'Meal ingredient must be comprised of a foodId and units.'
            })
        }
        if (!Number.isInteger(item.foodId) || item.foodId < 1) {
            return res.status(400).json({
                'error': 'Food ID must be a positive integer.'
            })
        }
        if (item.units <= 0) {
            return res.status(400).json({
                'error': 'Units must be greater than zero.'
            })
        }
    }
    const foodIds = mealIngredients.map(item => item.foodId)
    const uniqueFoodIds = [...new Set(foodIds)]
    if (foodIds.length !== uniqueFoodIds.length) {
        return res.status(400).json({
                'error': 'A food may only appear once in each meal.'
            })
    }
    const usersRelatedFoods = await prisma.food.findMany({
        where: {
            userId: userId,
            id: { in: uniqueFoodIds }
        }
    })
    if (uniqueFoodIds.length !== usersRelatedFoods.length) {
        return res.status(400).json({
                'error': 'One or more of the proposed ingredients are unavailable to the user.'
            })
    }
    const added = await prisma.meal.create({
        data: {
            name: name,
            userId: userId,
            mealIngredients: {
                create: mealIngredients
            }
        },
        include : {
            mealIngredients: {
                select: { foodId: true, units: true }
            }
        }
    })
    const formattedMeal = {
        id: added.id,
        name: added.name,
        userId: added.userId,
        ingredients: added.mealIngredients
    }
    res.status(201).json(formattedMeal)
})

router.patch('/:id', requireAuth, isParamInt, verifyById('meal'), async (req, res) => {
    const id = +req.params.id
    
    const userId = req.session.userId!

    const mealData = req.body
    if (typeof mealData.name !== 'string') {
        return res.status(400).json({
            'error': 'Meal name must be a string.'
        })
    }
    const trimmed = mealData.name.trim()
    if (trimmed.length === 0 || trimmed.length > 19) {
        return res.status(400).json({
            'error': 'Name must be between 1 and 19 characters'
        })
    }
    const mealIngredients = mealData.ingredients
    if (!Array.isArray(mealIngredients) || mealIngredients.length === 0) {
        return res.status(400).json({
            'error': 'Ingredients must be an array containing at least one item.'
        })
    }
    for (const item of mealIngredients) {
        if (!validateData(item, 'ingredient')) {
            return res.status(400).json({
                'error': 'Meal ingredient must be comprised of a foodId and units.'
            })
        }
        if (!Number.isInteger(item.foodId) || item.foodId < 1) {
            return res.status(400).json({
                'error': 'Food ID must be a positive integer.'
            })
        }
        if (item.units <= 0) {
            return res.status(400).json({
                'error': 'Units must be greater than zero.'
            })
        }
    }
    const foodIds = mealIngredients.map(item => item.foodId)
    const uniqueFoodIds = [...new Set(foodIds)]

    if (foodIds.length !== uniqueFoodIds.length) {
        return res.status(400).json({
                'error': 'A food may only appear once in each meal.'
            })
    }
    const usersRelatedFoods = await prisma.food.findMany({
        where: {
            userId: userId,
            id: { in: uniqueFoodIds }
        }
    })
    if (uniqueFoodIds.length !== usersRelatedFoods.length) {
        return res.status(400).json({
                'error': 'One or more of the proposed ingredients are unavailable to the user.'
            })
    }
    const formattedIngredients = mealIngredients.map(ingredient => ({
        foodId: ingredient.foodId,
        units: ingredient.units
    }))
    try {
        const updated = await prisma.meal.update({
            where: { id: id },
            data: {
                name: trimmed,
                mealIngredients: {
                    deleteMany: {},
                    create: formattedIngredients
                }
            },
            include: {
                mealIngredients: {
                    include: { food: true }
                }
            }
        })
        const formattedMeal = {
            id: updated.id,
            name: updated.name,
            userId: updated.userId,
            ingredients: updated.mealIngredients
        }
        res.json(formattedMeal)
    } catch(error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            return res.status(404).json({
                'error': 'Meal not found.'
            })
        }
        throw error
    }
})

router.delete('/:id', requireAuth, isParamInt, verifyById('meal'), async (req, res) => {
    const id = +req.params.id
    
    try {
        await prisma.meal.delete({
            where: { id: id }
        })
    } catch(error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            return res.status(404).json({
                'error': 'Meal not found.'
            })
        }
        throw error
    }
    res.json({
        'message': 'Successfully deleted meal.',
    })
})

export { router }