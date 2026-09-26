import express from "express"
import cors from "cors"
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client";
import { validateData } from "./util/helpers"
import { Prisma } from './generated/prisma/client.js'
import { empty } from "@prisma/client/runtime/client";

const app = express()
const PORT = 5000

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

// Middleware. Allows the React client's origin to access this server.
app.use(cors({
    origin: "http://localhost:5173"
}))

// Middleware. Parses incoming JSON requests into Javascript objects.
app.use(express.json())

// GET ROUTES 
app.get('/api/users/:id', async (req, res) => {
    const id = +req.params.id
    if (!Number.isInteger(id) || id < 1) {
        return res.status(400).json({
            'error': 'User ID must be a positive integer.'
        })
    }
    // const username = req.body.username
    // const hashedPass = req.body.password // apply the hash before checking the db
    const user = await prisma.user.findUnique({
        where: {
            id: id,
            // username: username,
            // hashed: hashedPass
        }
    })
    //check hashed password and return error if password incorrect
    if (user === null) {
        return res.status(404).json({
            'error': 'User not found.'
        })
    }
    res.json(user)
})

app.get('/api/users/:userId/meals', async (req, res) => {
    const id = +req.params.userId
    if (!Number.isInteger(id) || id < 1) {
        return res.status(400).json({
            'error': 'User ID must be a positive integer.'
        })
    }
    const user = await prisma.user.findUnique({
        where: { id: id },
        select: { id: true}
    })
    if (user === null) {
        return res.status(404).json({
            'error': 'User not found.'
        })
    }
    const meals = await prisma.meal.findMany({
        where: { userId: id },
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

app.get('/api/meals/:id', async (req, res) => {
    const id = +req.params.id
    if (!Number.isInteger(id) || id < 1) {
        return res.status(400).json({
            'error': 'Meal ID must be a positive integer.'
        })
    }
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

app.get('/api/users/:userId/foods', async (req, res) => {
    const id = +req.params.userId
    if (!Number.isInteger(id) || id < 1) {
        return res.status(400).json({
            'error': 'User ID must be a positive integer.'
        })
    }
    const user = await prisma.user.findUnique({
        where: { id: id },
        select: { id: true }
    })
    if (user === null) {
        return res.status(404).json({
            'error': 'User not found.'
        })
    }
    const foods = await prisma.food.findMany({
        where: { userId: id }
    })
    res.json(foods)
})

app.get('/api/foods/:id', async (req, res) => {
    const id = +req.params.id
    if (!Number.isInteger(id) || id < 1) {
        return res.status(400).json({
            'error': 'Food ID must be a positive integer.'
        })
    }
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

app.get('/api/users/:userId/mealEntries', async (req, res) => {
    const id = +req.params.userId
    if (!Number.isInteger(id) || id < 1) {
        return res.status(400).json({
            'error': 'User ID must be a positive integer.'
        })
    }
    const user = await prisma.user.findUnique({
        where: { id: id },
        select: { id: true }
    })
    if (user === null) {
        return res.status(404).json({
            'error': 'User not found.'
        })
    }
    const mealEntries = await prisma.mealEntry.findMany({
        where: { userId: id },
        orderBy: { dateAndTime: 'asc' }
    })
    res.json(mealEntries)
})

app.get('/api/mealEntries/:id', async (req, res) => {
    const id = +req.params.id
    if (!Number.isInteger(id) || id < 1) {
        return res.status(400).json({
            'error': 'Meal entry ID must be a positive integer.'
        })
    }
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

app.get('/api/foods/:foodId/meals', async (req, res) => {
    const id = +req.params.foodId
    if (!Number.isInteger(id) || id < 1) {
        return res.status(400).json({
            'error': 'Food ID must be a positive integer.'
        })
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
    if (!validateData(userData, 'user')) {
        return res.status(400).json({
            'error': 'User data is not formatted properly.'
        })
    }
    const username = userData.username.trim()
    const firstName = userData.firstName.trim()
    const lastName = userData.lastName.trim()

    if (username === ''  || firstName === '' || lastName === '') {
        return res.status(400).json({
            'error': 'First, last, and user names must each contain at least 1 character.'
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
    const newUser = {
        username: username,
        firstName: firstName,
        lastName: lastName,
        calGoal: +userData.calGoal,
        proteinGoal: +userData.proteinGoal,
        carbGoal: +userData.carbGoal,
        fatGoal: +userData.fatGoal,
        sodiumGoal: +userData.sodiumGoal
    }
    const added = await prisma.user.create({
        data: newUser
    })
    res.status(201).json(added)
})

app.post('/api/meals', async (req, res) => {
    const mealData = req.body
    if (!validateData(mealData, 'meal')) {
        return res.status(400).json({
            'error': 'Your meal data contains invalid properties.'
        })
    }
    const userId = mealData.userId
    if (!Number.isInteger(userId) || userId < 1) {
        return res.status(400).json({
            'error': 'User ID must be a positive integer.'
        })
    }
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
            userId: mealData.userId,
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

app.post('/api/foods', async (req, res) => {
    const foodData = req.body
    if (!validateData(foodData, 'food')) {
        return res.status(400).json({
            'error': 'Your food data contains invalid properties.'
        })
    }
    const userId = foodData.userId
    if (!Number.isInteger(userId) || userId < 1) {
        return res.status(400).json({
            'error': 'User ID must be a positive integer.'
        })
    }
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

app.post('/api/mealEntries', async (req, res) => {
    const mealEntryData = req.body
    if (!validateData(mealEntryData, 'mealEntry')) {
        return res.status(400).json({
            'error': 'Your meal entry data contains invalid properties.'
        })
    }
    const userId = mealEntryData.userId
    if (!Number.isInteger(userId) || userId < 1) {
        return res.status(400).json({
            'error': 'User ID must be a positive integer.'
        })
    }
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
app.patch('/api/users/:id', async (req, res) => {
    const id = +req.params.id
    if (!Number.isInteger(id) || id < 1) {
        return res.status(400).json({
            'error': 'User ID must be a positive integer.'
        })
    }
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
    res.json(updated)
})

app.patch('/api/meals/:id', async (req, res) => {
    const id = +req.params.id
    if (!Number.isInteger(id) || id < 1) {
        return res.status(400).json({
            'error': 'Meal ID must be a positive integer.'
        })
    }
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
    const mealIngredients = mealData.mealIngredients
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
    const updated = await prisma.meal.update({
        where: { id: id },
        data: {
            name: trimmed,
            mealIngredients: {
                deleteMany: {},
                create: mealIngredients
            }
        },
        include: {
            mealIngredients: {
                include: { food: true }
            }
        }
    })
    res.json(updated)
})

app.patch('/api/foods/:id', async (req, res) => {
    const id = +req.params.id
    if (!Number.isInteger(id) || id < 1) {
        return res.status(400).json({
            'error': 'Food ID must be a positive integer.'
        })
    }
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
app.delete('/api/users/:id', async (req, res) => {
    const id = +req.params.id
    if (!Number.isInteger(id) || id < 1) {
        return res.status(400).json({
            'error': 'User ID must be a positive integer.'
        })
    }
    try {
        await prisma.user.delete({
            where: { id: id }
        })
    } catch(error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            return res.status(404).json({
                'error': 'User not found.'
            })
        }
        return res.status(500).json({
            'error': 'Unable to perform delete operation.'
        })
    }
    res.json({
        'message': 'Successfully deleted user.',
    })
})

app.delete('/api/meals/:id', async (req, res) => {
    const id = +req.params.id
    if (!Number.isInteger(id) || id < 1) {
        return res.status(400).json({
            'error': 'Meal ID must be a positive integer.'
        })
    }
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
        return res.status(500).json({
            'error': 'Unable to perform delete operation.'
        })
    }
    res.json({
        'message': 'Successfully deleted meal.',
    })
})

app.delete('/api/foods/:id', async (req, res) => {
    const id = +req.params.id
    if (!Number.isInteger(id) || id < 1) {
        return res.status(400).json({
            'error': 'Food ID must be a positive integer.'
        })
    }
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
        return res.status(500).json({
            'error': 'Unable to perform delete operation.'
        })
    }
})

app.delete('/api/foods/:foodId/meals', async (req, res) => {
    const id = +req.params.foodId
    if (!Number.isInteger(id) || id < 1) {
        return res.status(400).json({
            'error': 'Food ID must be a positive integer.'
        })
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
        return res.status(500).json({
            'error': 'Unable to perform delete operation.'
        })
    }    
})

app.delete('/api/mealEntries/:id', async (req, res) => {
    const id = +req.params.id
    if (!Number.isInteger(id) || id < 1) {
        return res.status(400).json({
            'error': 'Meal entry ID must be a positive integer.'
        })
    }
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
        return res.status(500).json({
            'error': 'Unable to perform delete operation.'
        })
    }
    res.json({
        'message': 'Successfully deleted meal entry.',
    })
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})