const userModel = {
    username: 'string',
    password: 'string',
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

export { userModel, mealModel, foodModel, ingredientModel, mealEntryModel }