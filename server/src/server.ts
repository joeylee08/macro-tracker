import express from "express"
import cors from "cors"
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client";
import { validateData } from "./util/helpers"

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
    if (Number.isNaN(id)) {
        return res.status(400).json({
            'error': 'Requested userID must be a number.'
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
    if (Number.isNaN(id)) {
        return res.status(400).json({
            'error': 'Requested userID must be a number.'
        })
    }
    const user = await prisma.user.findUnique({
        where: {
            id: id
        },
        select: {
            id: true
        }
    })
    if (user === null) {
        return res.status(404).json({
            'error': 'User not found.'
        })
    }
    const meals = await prisma.meal.findMany({
        where: {
            userId: id
        },
        include: {
            mealIngredients: {
                include: {
                    food: true
                }
            }
        }
    })
    res.json(meals)
})

app.get('/api/meals/:id', async (req, res) => {
    const id = +req.params.id
    if (Number.isNaN(id)) {
        return res.status(400).json({
            'error': 'Requested mealID must be a number.'
        })
    }
    const meal = await prisma.meal.findUnique({
        where: {
            id: id,
        },
        include: {
            mealIngredients: {
                include: {
                    food: true
                }
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
    if (Number.isNaN(id)) {
        return res.status(400).json({
            'error': 'Requested userID must be a number.'
        })
    }
    const user = await prisma.user.findUnique({
        where: {
            id: id
        },
        select: {
            id: true
        }
    })
    if (user === null) {
        return res.status(404).json({
            'error': 'User not found.'
        })
    }
    const foods = await prisma.food.findMany({
        where: {
            userId: id
        }
    })
    res.json(foods)
})

app.get('/api/foods/:id', async (req, res) => {
    const id = +req.params.id
    if (Number.isNaN(id)) {
        return res.status(400).json({
            'error': 'Requested foodID must be a number.'
        })
    }
    const food = await prisma.food.findUnique({
        where: {
            id: id,
        }
    })
    if (!food) {
        return res.status(404).json({
            'error': 'Food not found.'
        })
    }
    res.json(food)
})

//POST ROUTES
app.post('/api/users', async (req, res) => {
    const userData = req.body
    if (!validateData(userData, 'user')) {
        return res.status(400).json({
            'error': 'User data is not formatted properly.'
        })
    }
    const newUser = {
        username: userData.username.trim(),
        firstName: userData.firstName.trim(),
        lastName: userData.lastName.trim(),
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
    }
    const added = await prisma.meal.create({
        data: {
            name: mealData.name,
            userId: mealData.userId,
            mealIngredients : {
                create: mealIngredients
            }
        },
        include : {
            mealIngredients: {
                include: {
                    food: true
                }
            }
        }
    })
    res.status(201).json(added)
})

app.post('/api/foods', async (req, res) => {
    const foodData = req.body
    if (!validateData(foodData, 'food')) {
        return res.status(400).json({
            'error': 'Your food data contains invalid properties.'
        })
    }
    const name = foodData.name.trim()
    if (name === '' || name.length > 19) {
        return res.status(400).json({
            'error': 'Food name must contain between 1 and 19 characters.'
        })
    }
    const added = await prisma.food.create({
        data: {
            name: foodData.name,
            userId: +foodData.userId,
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

//PATCH ROUTES
app.patch('/api/users/:id', async (req, res) => {
    const id = +req.params.id
    if (Number.isNaN(id)) {
        return res.status(400).json({
            'error': 'UserID must be a number.'
        })
    }
    const userData = req.body
    if (!validateData(userData, 'macro')) {
        return res.status(400).json({
            'error': 'Your user data contains invalid properties.'
        })
    }
    const { calGoal, proteinGoal, carbGoal, fatGoal, sodiumGoal } = userData
    const updated = await prisma.user.update({
        where: {
            id: id
        },
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
    if (Number.isNaN(id)) {
        return res.status(400).json({
            'error': 'Requested mealID must be a number.'
        })
    }
    const meal = await prisma.meal.findUnique({
        where : {
            id: id
        },
        select: {
            id: true
        }
    })
    if (!meal) {
        return res.status(404).json({
            'error': 'Meal not found.'
        })
    }
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
    }
    const updated = await prisma.meal.update({
        where: {
            id: id
        },
        data: {
            name: trimmed,
            mealIngredients: {
                deleteMany: {},
                create: mealIngredients
            }
        },
        include: {
            mealIngredients: {
                include: {
                    food: true
                }
            }
        }
    })
    res.json(updated)
})

app.patch('/api/foods/:id', async (req, res) => {
    const id = +req.params.id
    if (Number.isNaN(id)) {
        return res.status(400).json({
            'error': 'Requested foodID must be a number.'
        })
    }
    const food = await prisma.food.findUnique({
        where : {
            id: id
        },
        select: {
            id: true
        }
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
    const updated = await prisma.food.update({
        where: {
            id: id
        },
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
    if (Number.isNaN(id)) {
        return res.status(400).json({
            'error': 'User ID must be a number.'
        })
    }
    try {
        await prisma.user.delete({
            where: {
                id: id
            }
        })
    } catch {
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
    if (Number.isNaN(id)) {
        return res.status(400).json({
            'error': 'Meal ID must be a number.'
        })
    }
    try {
        await prisma.meal.delete({
            where: {
                id: id
            }
        })
    } catch {
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
    if (Number.isNaN(id)) {
        return res.status(400).json({
            'error': 'Food ID must be a number.'
        })
    }
    try {
        await prisma.food.delete({
            where: {
                id: id
            }
        })
    } catch {
         return res.status(500).json({
            'error': 'Unable to perform delete operation.'
        })
    }
    res.json({
        'message': 'Successfully deleted food.',
    })
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})