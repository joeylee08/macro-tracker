const users = [
    { id: 1, username: 'joeylee08', password: 'poo3', firstName: 'Joseph', lastName: 'Lee', dateJoined: '', macroGoals: {cal: 2000, protein: 125, carb: 225, fat: 67, sodium: 1800}},
    { id: 2, username: 'demonslayer666', password: 'poo1', firstName: 'Bobert', lastName: 'Smith', dateJoined: '', macroGoals: {cal: 0, protein: 0, carb: 0, fat: 0, sodium: 0}},
    { id: 3, username: 'wildgirl69', password: 'poo2', firstName: 'Katie', lastName: 'Contreras', dateJoined: '', macroGoals: {cal: 0, protein: 0, carb: 0, fat: 0, sodium: 0}},
    { id: 4, username: 'littlekidlover', password: 'poo5', firstName: 'Michael', lastName: 'Scott', dateJoined: '', macroGoals: {cal: 0, protein: 0, carb: 0, fat: 0, sodium: 0}},
    { id: 5, username: 'prisonbuddy', password: 'poo4', firstName: 'Ablaham', lastName: 'Rincon', dateJoined: '', macroGoals: {cal: 0, protein: 0, carb: 0, fat: 0, sodium: 0}},
    { id: 6, username: 'oregondude12', password: 'poo6', firstName: 'Taylor', lastName: 'Treehugger', dateJoined: '', macroGoals: {cal: 0, protein: 0, carb: 0, fat: 0, sodium: 0}},
    { id: 7, username: 'therealbobhope', password: 'poo7', firstName: 'Bob', lastName: 'Hope', dateJoined: '', macroGoals: {cal: 0, protein: 0, carb: 0, fat: 0, sodium: 0}},
    { id: 8, username: 'ibench405', password: 'poo8', firstName: 'Yeah', lastName: 'Bruh', dateJoined: '', macroGoals: {cal: 0, protein: 0, carb: 0, fat: 0, sodium: 0}},
]

const meals = [
    {id: 1, name: 'Prison Oatmeal', userId: 1, ingredients: [{foodId: 4, units: 1}, {foodId: 5, units: 2}, {foodId: 6, units: 1}, {foodId: 7, units: 1}]},
    {id: 2, name: 'Tacos Ch Avo', userId: 1, ingredients: [{foodId: 1, units: 5.92}, {foodId: 8, units: 0.125}, {foodId: 2, units: 3}, {foodId: 14, units: 1}, {foodId: 11, units: 2}, {foodId: 13, units: 1}]},
    {id: 3, name: 'Tacos Egg Avo GT', userId: 1, ingredients: [{foodId: 3, units: 2}, {foodId: 17, units: 1.33}, {foodId: 8, units: 0.125}, {foodId: 2, units: 3}, {foodId: 14, units: 1}, {foodId: 13, units: 1}]},
    {id: 4, name: 'Orange Ch Bowl', userId: 1, ingredients: [{foodId: 1, units: 5.92}, {foodId: 9, units: 1}, {foodId: 12, units: 1}, {foodId: 13, units: 1}, {foodId: 14, units: 1}, {foodId: 15, units: 1}]},
    {id: 5, name: 'Prison Tostadas Ch', userId: 1, ingredients: [{foodId: 1, units: 5.92}, {foodId: 2, units: 3}, {foodId: 8, units: 0.125}, {foodId: 11, units: 2}, {foodId: 13, units: 1}, {foodId: 14, units: 1}]},
    {id: 6, name: 'Orange Pk Bowl', userId: 1, ingredients: [{foodId: 16, units: 6.34}, {foodId: 9, units: 1}, {foodId: 12, units: 1}, {foodId: 13, units: 1}, {foodId: 14, units: 1}, {foodId: 15, units: 1}]},
    {id: 7, name: 'Prison Tostadas Pk', userId: 1, ingredients: [{foodId: 16, units: 6.34}, {foodId: 2, units: 3}, {foodId: 8, units: 0.125}, {foodId: 11, units: 2}, {foodId: 13, units: 1}, {foodId: 14, units: 1}]},
]

const foods= [
    {id: 1, userId: 1, name: 'Chicken Breast', servingSize: 1, servingUnit: 'oz', cal: 27.5, protein: 6.25, carb: 0, fat: 0.375, sodium: 22.5},
    {id: 2, userId: 1, name: 'Corn Tortilla', servingSize: 1, servingUnit: 'piece', cal: 50, protein: 1, carb: 10, fat: 0.5, sodium: 10},
    {id: 3, userId: 1, name: 'Egg', servingSize: 1, servingUnit: 'piece', cal: 72, protein: 6.3, carb: 0.4, fat: 4.8, sodium: 71},
    {id: 4, userId: 1, name: 'Oatmeal', servingSize: 0.5, servingUnit: 'cup', cal: 150, protein: 5, carb: 27, fat: 2.5, sodium: 0},
    {id: 5, userId: 1, name: 'Peanut Butter', servingSize: 1, servingUnit: 'tbsp', cal: 90, protein: 4, carb: 3.5, fat: 8, sodium: 35},
    {id: 6, userId: 1, name: 'Honey', servingSize: 1, servingUnit: 'tsp', cal: 23.33, protein: 0, carb: 5.67, fat: 0, sodium: 0},
    {id: 7, userId: 1, name: 'Banana', servingSize: 1, servingUnit: 'piece', cal: 105, protein: 1.3, carb: 27, fat: 0.4, sodium: 1},
    {id: 8, userId: 1, name: 'Avocado', servingSize: 1, servingUnit: 'piece', cal: 240, protein: 3, carb: 13, fat: 22, sodium: 10},
    {id: 9, userId: 1, name: 'White Rice', servingSize: 0.5, servingUnit: 'cup', cal: 170, protein: 4, carb: 38, fat: 0, sodium: 0},
    {id: 10, userId: 1, name: 'Chili Garlic Sauce', servingSize: 1, servingUnit: 'tsp', cal: 0, protein: 0, carb: 0, fat: 0, sodium: 75},
    {id: 11, userId: 1, name: 'Tapatio Salsa', servingSize: 1, servingUnit: 'tbsp', cal: 5, protein: 0, carb: 1.5, fat: 0, sodium: 62.5},
    {id: 12, userId: 1, name: 'Orange Sauce', servingSize: 1, servingUnit: 'tbsp', cal: 22, protein: 0, carb: 5.5, fat: 0, sodium: 121},
    {id: 13, userId: 1, name: 'Olive Oil', servingSize: 1, servingUnit: 'tsp', cal: 40, protein: 0, carb: 0, fat: 4.68, sodium: 0},
    {id: 14, userId: 1, name: 'Hotel Seasoning', servingSize: 0.5, servingUnit: 'tsp', cal: 0, protein: 0, carb: 0, fat: 0, sodium: 61},
    {id: 15, userId: 1, name: 'Cabbage Mix', servingSize: 0.5, servingUnit: 'cup', cal: 15, protein: 0.5, carb: 0, fat: 0, sodium: 12},
    {id: 16, userId: 1, name: 'Pork Chop', servingSize: 1, servingUnit: 'oz', cal: 45, protein: 6, carb: 0, fat: 2, sodium: 13.75},
    {id: 17, userId: 1, name: 'Ground Turkey 93/7', servingSize: 1, servingUnit: 'oz', cal: 40, protein: 5.5, carb: 0, fat: 2, sodium: 21.25},
]

const mealEntries = [
    {
        id: 1,
        userId: 1,
        name: 'Chicken Penis Bowl',
        dateAndTime: '2026-09-14T18:42:31.123Z',
        ingredients: [
            {
                name: 'Chicken Breast',
                servingSize: 1,
                servingUnit: 'oz',
                units: 5,
                cal: 35,
                protein: 14,
                carb: 0,
                fat: 0.5,
                sodium: 38
            },
            {
                name: 'White Rice',
                servingSize: 0/5,
                servingUnit: 'cup',
                units: 1,
                cal: 170,
                protein: 2,
                carb: 28,
                fat: 0.5,
                sodium: 10
            },
        ]
    },
    {
        id: 2,
        userId: 1,
        name: 'Poo Salad 3',
        dateAndTime: '2028-09-14T18:42:31.123Z',
        ingredients: [
            {
                name: 'Poo Cubes',
                servingSize: 1,
                servingUnit: 'oz',
                units: 5,
                cal: 55,
                protein: 14,
                carb: 0,
                fat: 0.5,
                sodium: 40
            },
            {
                name: 'Cabbage Mix',
                servingSize: 2,
                servingUnit: 'cup',
                units: 1,
                cal: 40,
                protein: 2,
                carb: 12,
                fat: 0,
                sodium: 10
            },
        ]
    }
]


export { users, meals, foods, mealEntries }
