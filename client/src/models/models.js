const userModel = {
    id: 'number',
    username: 'string',
    firstName: 'string',
    lastName: 'string',
    dateJoined: 'string',
    calGoal: 'number',
    proteinGoal: 'number',
    carbGoal: 'number',
    fatGoal: 'number',
    sodiumGoal: 'number'
}

const mealModel = {
    id: 'number',
    name: 'string',
    userId: 'number',
    ingredients: 'object' //an array of objects
}

const foodModel = {
    id: 'number',
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
    id: 'number',
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

export { userModel, mealModel, foodModel, ingredientModel, mealEntryModel, mealEntryIngredientModel }