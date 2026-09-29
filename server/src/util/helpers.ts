import { userSignup, macroModel, mealModel, foodModel, ingredientModel, mealEntryModel } from './models';
import { starterFoods, starterMeals } from '../data/starterfoods'
import type { Prisma } from "../generated/prisma/client.js"

async function seedStarterData(userId: number, tx: Prisma.TransactionClient) {
    //create all the starter foods for userId
    const createdFoods = await tx.food.createManyAndReturn({
        data: starterFoods.map(item => ({
            ...item,
            userId: userId
        }))
    })
    //take the returned list of starter foods, and using the starterMeals collection
    //assemble properly formatted meals, with the nested ingredients in { foodId, units } format
    const formattedMeals = starterMeals.map(item => ({
        name: item.name,
        userId: userId,
        ingredients: item.ingredients.map(food => {
            const createdFood = createdFoods.find(item => item.name === food.foodName)

            if (!createdFood) {
                 throw new Error(`Starter food not found: ${food.foodName}`)
            }

            return {
                foodId: createdFood.id, 
                units: food.units
            }
        })
    }))
    //iterate through this collection and call tx.meal.create() for each item.
    for (const meal of formattedMeals) {
        await tx.meal.create({
            data: {
                name: meal.name,
                userId: meal.userId,
                mealIngredients: {
                    create: meal.ingredients
                }
            }
        })
    }
}

const modelObj = {
    'signup': userSignup,
    'macro': macroModel,
    'meal': mealModel,
    'food': foodModel,
    'ingredient': ingredientModel,
    'mealEntry': mealEntryModel
}

type ModelType = keyof typeof modelObj;

const validateData = (data: Record <string, unknown> , modelType: ModelType) => {
    if (!(modelType in modelObj)) {
        return false
    }

    const model = modelObj[modelType]

    for (const key in model) {
        if (key === 'ingredients' && modelType === 'meal') {
            if (!Array.isArray(data[key])) return false
            for (const item of data[key]) {
                if (!validateData(item, 'ingredient')) return false
            } 
            continue
        }
        if (data[key] === null || data[key] === undefined) {
            return false
        } else if (typeof data[key] !== model[key as keyof typeof model]) {
            return false
        }
    }
    return true
}

export { validateData, seedStarterData };