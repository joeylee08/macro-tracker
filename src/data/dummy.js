const users = [
    { id: 1, username: 'joeylee08', firstName: 'Joseph', lastName: 'Lee', dateJoined: '', calGoal: 0, proteinGoal: 0, carbGoal: 0, fatGoal: 0, sodiumGoal: 0},
    { id: 2, username: 'demonslayer666', firstName: 'Bobert', lastName: 'Smith', dateJoined: '', calGoal: 0, proteinGoal: 0, carbGoal: 0, fatGoal: 0, sodiumGoal: 0},
    { id: 3, username: 'wildgirl69', firstName: 'Katie', lastName: 'Contreras', dateJoined: '', calGoal: 0, proteinGoal: 0, carbGoal: 0, fatGoal: 0, sodiumGoal: 0},
    { id: 4, username: 'littlekidlover', firstName: 'Michael', lastName: 'Scott', dateJoined: '', calGoal: 0, proteinGoal: 0, carbGoal: 0, fatGoal: 0, sodiumGoal: 0},
    { id: 5, username: 'prisonbuddy', firstName: 'Ablaham', lastName: 'Rincon', dateJoined: '', calGoal: 0, proteinGoal: 0, carbGoal: 0, fatGoal: 0, sodiumGoal: 0},
    { id: 6, username: 'oregondude12', firstName: 'Taylor', lastName: 'Treehugger', dateJoined: '', calGoal: 0, proteinGoal: 0, carbGoal: 0, fatGoal: 0, sodiumGoal: 0},
    { id: 7, username: 'therealbobhope', firstName: 'Bob', lastName: 'Hope', dateJoined: '', calGoal: 0, proteinGoal: 0, carbGoal: 0, fatGoal: 0, sodiumGoal: 0},
    { id: 8, username: 'ibench405', firstName: 'Yeah', lastName: 'Bruh', dateJoined: '', calGoal: 0, proteinGoal: 0, carbGoal: 0, fatGoal: 0, sodiumGoal: 0},
]

const meals = [
    {id: 1, name: 'Prison Oatmeal', userId: 1, ingredients: []},
    {id: 2, name: 'Chicken Avocado Wrap', userId: 1, ingredients: []},
    {id: 3, name: 'Egg Avocado Wrap', userId: 1, ingredients: []},
    {id: 4, name: 'Salmon Quinoa Kimchi Bowl', userId: 1, ingredients: []},
    {id: 5, name: 'Chicken Teriyaki Bowl', userId: 1, ingredients: []},
    {id: 6, name: 'Turkey Breakfast Burrito', userId: 1, ingredients: []},
]

const globalFoods = [
    {id: 1, name: 'Chicken Breast', servingSize: 4, servingUnit: 'oz', cal: 187, protein: 35, carb: 0, fat: 4, sodium: 84},
    {id: 2, name: 'Canned Salmon', servingSize: 3, servingUnit: 'oz', cal: 90, protein: 18, carb: 0, fat: 2, sodium: 230},
    {id: 3, name: 'Egg', servingSize: 1, servingUnit: 'piece', cal: 72, protein: 6.3, carb: 0.4, fat: 4.8, sodium: 71},
    {id: 4, name: '2% Milk', servingSize: 8, servingUnit: 'oz', cal: 122, protein: 8.1, carb: 12, fat: 4.6, sodium: 115},
    {id: 5, name: 'Oatmeal', servingSize: 0.5, servingUnit: 'cup', cal: 150, protein: 5, carb: 27, fat: 2.5, sodium: 0},
    {id: 6, name: 'Peanut Butter', servingSize: 2, servingUnit: 'tbsp', cal: 180, protein: 8, carb: 7, fat: 16, sodium: 70},
    {id: 7, name: 'Honey', servingSize: 1, servingUnit: 'tbsp', cal: 70, protein: 0, carb: 17, fat: 0, sodium: 0},
    {id: 8, name: 'Banana', servingSize: 1, servingUnit: 'piece', cal: 105, protein: 1.3, carb: 27, fat: 0.4, sodium: 1},
    {id: 9, name: 'Avocado', servingSize: 1, servingUnit: 'piece', cal: 240, protein: 3, carb: 13, fat: 22, sodium: 10},
    {id: 10, name: 'Quinoa', servingSize: 0.5, servingUnit: 'cup', cal: 111, protein: 4.1, carb: 19.7, fat: 1.8, sodium: 7},
    {id: 11, name: 'Wheat Tortilla', servingSize: 1, servingUnit: 'piece', cal: 120, protein: 4, carb: 21, fat: 3.5, sodium: 420},
    {id: 12, name: 'Corn Tortilla', servingSize: 1, servingUnit: 'piece', cal: 80, protein: 2, carb: 16, fat: 0.5, sodium: 35},
    {id: 13, name: 'Egg White', servingSize: 1, servingUnit: 'piece', cal: 17, protein: 3.6, carb: 0.2, fat: 0.1, sodium: 55},
    {id: 14, name: 'Tofu', servingSize: 3, servingUnit: 'oz', cal: 60, protein: 6, carb: 2, fat: 3, sodium: 10},
]

const userFoods = [

]

export { users, meals, globalFoods, userFoods }
