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
    {id: 1, name: 'Prison Oatmeal', userId: 1, ingredients: [{foodId: 4, units: 1}, {foodId: 5, units: 2}, {foodId: 6, units: 1}, {foodId: 7, units: 1}]},
    {id: 2, name: 'Ch. Avocado Wrap', userId: 1, ingredients: [{foodId: 1, units: 4}, {foodId: 8, units: 0.25}, {foodId: 2, units: 3}]},
    {id: 3, name: 'Egg Avocado Wrap', userId: 1, ingredients: [{foodId: 3, units: 2}, {foodId: 8, units: 0.25}, {foodId: 2, units: 3}]},
    {id: 4, name: 'Ch. Teriyaki Bowl', userId: 1, ingredients: [{foodId: 1, units: 4}, {foodId: 9, units: 2}]},
]

const foods= [
    {id: 1, userId: 1, name: 'Chicken Breast', servingSize: 1, servingUnit: 'oz', cal: 46.75, protein: 8.75, carb: 0, fat: 1, sodium: 21},
    {id: 2, userId: 1, name: 'Corn Tortilla', servingSize: 1, servingUnit: 'piece', cal: 80, protein: 2, carb: 16, fat: 0.5, sodium: 35},
    {id: 3, userId: 1, name: 'Egg', servingSize: 1, servingUnit: 'piece', cal: 72, protein: 6.3, carb: 0.4, fat: 4.8, sodium: 71},
    {id: 4, userId: 1, name: 'Oatmeal', servingSize: 0.5, servingUnit: 'cup', cal: 150, protein: 5, carb: 27, fat: 2.5, sodium: 0},
    {id: 5, userId: 1, name: 'Peanut Butter', servingSize: 1, servingUnit: 'tbsp', cal: 90, protein: 4, carb: 3.5, fat: 8, sodium: 35},
    {id: 6, userId: 1, name: 'Honey', servingSize: 1, servingUnit: 'tbsp', cal: 70, protein: 0, carb: 17, fat: 0, sodium: 0},
    {id: 7, userId: 1, name: 'Banana', servingSize: 1, servingUnit: 'piece', cal: 105, protein: 1.3, carb: 27, fat: 0.4, sodium: 1},
    {id: 8, userId: 1, name: 'Avocado', servingSize: 1, servingUnit: 'piece', cal: 240, protein: 3, carb: 13, fat: 22, sodium: 10},
    {id: 9, userId: 1, name: 'Quinoa', servingSize: 0.5, servingUnit: 'cup', cal: 111, protein: 4.1, carb: 19.7, fat: 1.8, sodium: 7},
]


export { users, meals, foods }
