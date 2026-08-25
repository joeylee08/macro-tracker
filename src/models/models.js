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
    ingredients: 'object'
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
    quantity: 'number'
}

export { userModel, mealModel, foodModel, ingredientModel }