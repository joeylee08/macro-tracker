const userSignup = {
    username: 'string',
    password: 'string',
}

const macroModel = {
    calGoal: 'number',
    proteinGoal: 'number',
    carbGoal: 'number',
    fatGoal: 'number',
    sodiumGoal: 'number'
}

const mealModel = {
    name: 'string',
    ingredients: 'object' //an array of objects
}

const foodModel = {
    name: 'string',
    servingSize: 'number',
    servingUnit: 'string',
    cal: 'number',
    protein: 'number',
    carb: 'number',
    fat: 'number',
    sodium: 'number'
}

const ingredientModel = {
    foodId: 'number',
    units: 'number'
}

const mealEntryModel = {
    name: 'string',
    cal: 'number',
    protein: 'number',
    carb: 'number',
    fat: 'number',
    sodium: 'number'
}

export { userSignup, macroModel, mealModel, foodModel, ingredientModel, mealEntryModel }