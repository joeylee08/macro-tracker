import express, { Request, Response, NextFunction } from 'express'
import cors from "cors"
import "dotenv/config";
import session from 'express-session'
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client";
import { validateData } from "./util/helpers"
import { Prisma } from './generated/prisma/client.js'
import { verifyPassword, hashPassword } from "./util/auth";

const app = express()
const PORT = 5000

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

// Middleware. Allows the React client's origin to access this server.
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

// Middleware. Parses incoming JSON requests into Javascript objects.
app.use(express.json())

app.use(session({
    name: 'macroTracker.sid',
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 30
    }
}))

// Centralized Error Handler
const errorHandler = (error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(error)
    return res.status(500).json({
        error: 'Internal server error.'
    })
}

//Require Authorization. Inline check for the existence of an active userId in session
const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    if (!req.session.userId) {
        return res.status(401).json({
            error: 'Not authenticated.'
        })
    }
    next()
}

const isParamInt = (req: Request, res: Response, next: NextFunction) => {
    const param = req.params.id || req.params.userId || req.params.foodId
    const paramId = +param
    if (Number.isNaN(paramId) || !Number.isInteger(paramId) || paramId <= 0) {
        return res.status(400).json({
            'error': 'Route parameter needs to be a positive integer.'
        })
    }
    next()
}

//Verify ownership of specific resource(s)
type ResourceType = 'user' | 'food' | 'meal' | 'mealEntry'

//Resource type dictionary
const findResource = {
    user: (itemId: number) => prisma.user.findUnique({ where: { id: itemId } }),
    food: (itemId: number) => prisma.food.findUnique({ where: { id: itemId } }),
    meal: (itemId: number) => prisma.meal.findUnique({ where: { id: itemId } }),
    mealEntry: (itemId: number) => prisma.mealEntry.findUnique({ where: { id: itemId } })
}

const verifyById = (type: ResourceType) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const userId = req.session.userId
        const itemId = +req.params.id

        if (type === 'user') {
            if (itemId !== userId) {
                return res.status(403).json({ error: 'FORBIDDEN.' })
            }
            return next()
        }
        const resource = await findResource[type](itemId)
        if (!resource) {
            return res.status(404).json({ 'error': 'Resource not found.'})
        }

        if (userId !== resource.userId) {
            return res.status(403).json({ 'error': 'FORBIDDEN.'})
        }
        return next()
    }
}

// LOGIN / LOGOUT ROUTES
app.post(`/api/auth/login`, async (req, res) => {
    if (!validateData(req.body, 'signup')) {
        return res.status(400).json({
            'error': 'Username and password must be strings.'
        })
    }
    const { username, password } = req.body
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

app.post('/api/auth/logout', requireAuth, (req, res) => {
    req.session.destroy((error) => {
        if (error) {
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

app.get('/api/auth/me', async (req, res) => {
    const userId = req.session.userId
    if (!userId) {
        return res.status(401).json({
            'error': 'Not authenticated.'
        })
    }
    const user = await prisma.user.findUnique({
        where: { id: userId}
    })
    if (!user) {
        return res.status(401).json({
            'error': 'Not authenticated.'
        })
    }
    const { passwordHash, ...safeUser } = user
    return res.json(safeUser)
})

// GET ROUTES 
app.get('/api/users/:id', requireAuth, isParamInt, verifyById('user'), async (req, res) => {
    const id = +req.params.id

    const user = await prisma.user.findUnique({
        where: { id: id }
    })
    if (user === null) {
        return res.status(404).json({
            'error': 'User not found.'
        })
    }
    const { passwordHash: _, ...safeUser } = user
    res.json(safeUser)
})

app.get('/api/users/:userId/meals', requireAuth, isParamInt, async (req, res) => {
    const id = +req.params.userId

    const userId = req.session.userId
    if (id !== userId) {
        return res.status(403).json({'error': 'FORBIDDEN.'})
    }
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { id: true}
    })
    if (user === null) {
        return res.status(404).json({
            'error': 'User not found.'
        })
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

app.get('/api/meals/:id', requireAuth, isParamInt, verifyById('meal'), async (req, res) => {
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

app.get('/api/users/:userId/foods',requireAuth, isParamInt, async (req, res) => {
    const id = +req.params.userId
    
    const userId = req.session.userId
    if (id !== userId) {
        return res.status(403).json({'error': 'FORBIDDEN.'})
    }
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { id: true }
    })
    if (user === null) {
        return res.status(404).json({
            'error': 'User not found.'
        })
    }
    const foods = await prisma.food.findMany({
        where: { userId: userId }
    })
    res.json(foods)
})

app.get('/api/foods/:id', requireAuth, isParamInt, verifyById('food'), async (req, res) => {
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

app.get('/api/users/:userId/mealEntries', requireAuth, isParamInt, async (req, res) => {
    const id = +req.params.userId
    
    const userId = req.session.userId
    if (id !== userId) {
        return res.status(403).json({'error': 'FORBIDDEN.'})
    }
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { id: true }
    })
    if (user === null) {
        return res.status(404).json({
            'error': 'User not found.'
        })
    }
    const mealEntries = await prisma.mealEntry.findMany({
        where: { userId: userId },
        orderBy: { dateAndTime: 'asc' }
    })
    res.json(mealEntries)
})

app.get('/api/mealEntries/:id', requireAuth, isParamInt, verifyById('mealEntry'), async (req, res) => {
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

app.get('/api/foods/:foodId/meals', requireAuth, isParamInt, async (req, res) => {
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

//POST ROUTES
app.post('/api/users', async (req, res) => {
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
    //Race handling [if someone steals your username in the milliseconds between form submission and db update]
    try {
        const added = await prisma.user.create({
            data: newUser
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

app.post('/api/meals', requireAuth, async (req, res) => {
    const mealData = req.body
    if (!validateData(mealData, 'meal')) {
        return res.status(400).json({
            'error': 'Your meal data contains invalid properties.'
        })
    }
    const userId = req.session.userId!

    const user = await prisma.user.findUnique({
        where: { id: userId }
    })
    if (!user) {
        return res.status(404).json({
            'error': 'Associated user does not exist.'
        })
    }
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
            name: mealData.name,
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

app.post('/api/foods', requireAuth, async (req, res) => {
    const foodData = req.body
    if (!validateData(foodData, 'food')) {
        return res.status(400).json({
            'error': 'Your food data contains invalid properties.'
        })
    }
    const userId = req.session.userId!
    
    const user = await prisma.user.findUnique({
        where: { id: userId }
    })
    if (!user) {
        return res.status(404).json({
            'error': 'Associated user does not exist.'
        })
    }
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

app.post('/api/mealEntries', requireAuth, async (req, res) => {
    const mealEntryData = req.body
    if (!validateData(mealEntryData, 'mealEntry')) {
        return res.status(400).json({
            'error': 'Your meal entry data contains invalid properties.'
        })
    }
    const userId = req.session.userId!
    
    const user = await prisma.user.findUnique({
        where: { id: userId }
    })
    if (!user) {
        return res.status(404).json({
            'error': 'Associated user does not exist.'
        })
    }
    const name = mealEntryData.name.trim()
    if (name === '' || name.length > 19) {
        return res.status(400).json({
            'error': 'Meal name must contain between 1 and 19 characters.'
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

//PATCH ROUTES
app.patch('/api/users/:id', requireAuth, isParamInt, verifyById('user'), async (req, res) => {
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
})

app.patch('/api/meals/:id', requireAuth, isParamInt, verifyById('meal'), async (req, res) => {
    const id = +req.params.id
    
    const meal = await prisma.meal.findUnique({
        where : { id: id },
        select: { id: true, userId: true }
    })
    if (!meal) {
        return res.status(404).json({
            'error': 'Meal not found.'
        })
    }
    //THIS IS TEMPORARY!
    const userId = meal.userId

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
})

app.patch('/api/foods/:id', requireAuth, isParamInt, verifyById('food'), async (req, res) => {
    const id = +req.params.id
    
    const food = await prisma.food.findUnique({
        where : { id: id },
        select: { id: true }
    })
    if (!food) {
        return res.status(404).json({
            'error': 'Food not found.'
        })
    }
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
})

//DELETE ROUTES
app.delete('/api/users/:id', requireAuth, isParamInt, verifyById('user'), async (req, res) => {
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

app.delete('/api/meals/:id', requireAuth, isParamInt, verifyById('meal'), async (req, res) => {
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

app.delete('/api/foods/:id', requireAuth, isParamInt, verifyById('food'), async (req, res) => {
    const id = +req.params.id
    
    try {
        await prisma.$transaction(async (tx) => {
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
            res.json({
                'message': 'Successfully deleted food.',
                'deletedFoodId': id,
                'emptyMealIds': emptyMealIds,
                'remainingMeals': formattedMeals
            })
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

app.delete('/api/foods/:foodId/meals', requireAuth, isParamInt, async (req, res) => {
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
        await prisma.$transaction(async (tx) => {
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
            res.json({
                'message': 'Succesfully deleted food and all associated meals.',
                'foodId': id,
                'deletedMeals': idArray
            })
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

app.delete('/api/mealEntries/:id', requireAuth, isParamInt, verifyById('mealEntry'), async (req, res) => {
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

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})