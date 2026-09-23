const userModel = {
    username: 'string',
    firstName: 'string',
    lastName: 'string',
    calGoal: 'number',
    proteinGoal: 'number',
    carbGoal: 'number',
    fatGoal: 'number',
    sodiumGoal: 'number'
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
    userId: 'number',
    ingredients: 'object' //an array of objects
}

const foodModel = {
    name: 'string',
    userId: 'number',
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

const mealEntryIngredientModel = {
    name: 'string',
    servingSize: 'number',
    servingUnit: 'string',
    units: 'number',
    cal: 'number',
    protein: 'number',
    carb: 'number',
    fat: 'number',
    sodium: 'number'
}

const mealEntryModel = {
    userId: 'number',
    name: 'string',
    dateAndTime: 'string',
    ingredients: [
        {
            name: 'string',
            servingSize: 'number',
            servingUnit: 'string',
            units: 'number',
            cal: 'number',
            protein: 'number',
            carb: 'number',
            fat: 'number',
            sodium: 'number'
        }]
}

export { userModel, macroModel, mealModel, foodModel, ingredientModel, mealEntryModel, mealEntryIngredientModel }