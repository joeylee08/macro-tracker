const users = [
    { id: 1, username: 'joeylee08', firstName: 'Joseph', lastName: 'Lee', dateJoined: '', macroGoals: {cal: 2000, protein: 125, carb: 225, fat: 67, sodium: 1800}},
    { id: 2, username: 'demonslayer666', firstName: 'Bobert', lastName: 'Smith', dateJoined: '', macroGoals: {cal: 0, protein: 0, carb: 0, fat: 0, sodium: 0}},
    { id: 3, username: 'wildgirl69', firstName: 'Katie', lastName: 'Contreras', dateJoined: '', macroGoals: {cal: 0, protein: 0, carb: 0, fat: 0, sodium: 0}},
    { id: 4, username: 'littlekidlover', firstName: 'Michael', lastName: 'Scott', dateJoined: '', macroGoals: {cal: 0, protein: 0, carb: 0, fat: 0, sodium: 0}},
    { id: 5, username: 'prisonbuddy', firstName: 'Ablaham', lastName: 'Rincon', dateJoined: '', macroGoals: {cal: 0, protein: 0, carb: 0, fat: 0, sodium: 0}},
    { id: 6, username: 'oregondude12', firstName: 'Taylor', lastName: 'Treehugger', dateJoined: '', macroGoals: {cal: 0, protein: 0, carb: 0, fat: 0, sodium: 0}},
    { id: 7, username: 'therealbobhope', firstName: 'Bob', lastName: 'Hope', dateJoined: '', macroGoals: {cal: 0, protein: 0, carb: 0, fat: 0, sodium: 0}},
    { id: 8, username: 'ibench405', firstName: 'Yeah', lastName: 'Bruh', dateJoined: '', macroGoals: {cal: 0, protein: 0, carb: 0, fat: 0, sodium: 0}},
]

const meals = [
    {id: 1, name: 'OSP Oatmeal', userId: 1, ingredients: [{foodId: 4, units: 1}, {foodId: 5, units: 1}, {foodId: 6, units: 1}, {foodId: 7, units: 1}]},
    {id: 2, name: 'Ch. Avocado Wrap', userId: 1, ingredients: [{foodId: 1, units: 4.5}, {foodId: 8, units: 0.125}, {foodId: 2, units: 3}, {foodId: 14, units: 1}, {foodId: 11, units: 2}, {foodId: 13, units: 1}]},
    {id: 3, name: 'Egg Avocado Wrap', userId: 1, ingredients: [{foodId: 3, units: 2}, {foodId: 8, units: 0.125}, {foodId: 2, units: 3}, {foodId: 14, units: 1}, {foodId: 13, units: 1}]},
    {id: 4, name: 'Orange Ch. Bowl', userId: 1, ingredients: [{foodId: 1, units: 4.5}, {foodId: 9, units: 1}, {foodId: 12, units: 1}, {foodId: 13, units: 1}, {foodId: 14, units: 1}, {foodId: 15, units: 1}]},
    {id: 5, name: 'OSP Tostadas Ch.', userId: 1, ingredients: [{foodId: 1, units: 4.5}, {foodId: 2, units: 3}, {foodId: 8, units: 0.125}, {foodId: 11, units: 2}, {foodId: 13, units: 1}, {foodId: 14, units: 1}]},
    {id: 6, name: 'Orange Pork Bowl', userId: 1, ingredients: [{foodId: 16, units: 4.4}, {foodId: 9, units: 1}, {foodId: 12, units: 1}, {foodId: 13, units: 1}, {foodId: 14, units: 1}, {foodId: 15, units: 1}]},
    {id: 7, name: 'OSP Tostadas Pork', userId: 1, ingredients: [{foodId: 16, units: 4.4}, {foodId: 2, units: 3}, {foodId: 8, units: 0.125}, {foodId: 11, units: 2}, {foodId: 13, units: 1}, {foodId: 14, units: 1}]},
    {id: 8, name: 'Avocado Tostadas', userId: 1, ingredients: [{foodId: 2, units: 3}, {foodId: 8, units: 0.125}, {foodId: 11, units: 2}]}
]

const foods= [
    {id: 1, userId: 1, name: 'Chicken Breast', servingSize: 1, servingUnit: 'oz', cal: 34, protein: 6.4, carb: 0, fat: 0.74, sodium: 13},
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
    {id: 13, userId: 1, name: 'Olive Oil', servingSize: 0.5, servingUnit: 'tsp', cal: 20, protein: 0, carb: 0, fat: 2.34, sodium: 0},
    {id: 14, userId: 1, name: 'Hotel Seasoning', servingSize: 0.5, servingUnit: 'tsp', cal: 0, protein: 0, carb: 0, fat: 0, sodium: 61},
    {id: 15, userId: 1, name: 'Cabbage Mix', servingSize: 0.5, servingUnit: 'cup', cal: 15, protein: 0.5, carb: 0, fat: 0, sodium: 12},
    {id: 16, userId: 1, name: 'Pork Chop', servingSize: 1, servingUnit: 'oz', cal: 45, protein: 6, carb: 0, fat: 2, sodium: 14}
]

const mealEntries = [
    {id: 1, userId: 1, mealId: 1, dateAndTime: "2026-09-06T08:47:00-07:00"},
    {id: 2, userId: 1, mealId: 3, dateAndTime: "2026-09-07T10:23:00-07:00"},
    {id: 3, userId: 1, mealId: 3, dateAndTime: "2026-09-07T16:02:00-07:00"},
    {id: 4, userId: 1, mealId: 1, dateAndTime: "2026-09-07T20:23:00-07:00"},
    {id: 5, userId: 1, mealId: 4, dateAndTime: "2026-09-08T08:47:00-07:00"},
    {id: 6, userId: 1, mealId: 2, dateAndTime: "2026-09-08T10:23:00-07:00"},
    {id: 7, userId: 1, mealId: 3, dateAndTime: "2026-09-09T16:02:00-07:00"},
    {id: 8, userId: 1, mealId: 3, dateAndTime: "2026-09-09T20:23:00-07:00"},
    {id: 9, userId: 1, mealId: 1, dateAndTime: "2026-09-09T08:47:00-07:00"},
    {id: 10, userId: 1, mealId: 1, dateAndTime: "2026-09-09T10:23:00-07:00"},
    {id: 11, userId: 1, mealId: 2, dateAndTime: "2026-09-10T16:02:00-07:00"},
    {id: 12, userId: 1, mealId: 3, dateAndTime: "2026-09-10T20:23:00-07:00"},
    {id: 13, userId: 1, mealId: 1, dateAndTime: "2026-09-11T08:47:00-07:00"},
    {id: 14, userId: 1, mealId: 1, dateAndTime: "2026-09-11T10:23:00-07:00"},
    {id: 15, userId: 1, mealId: 1, dateAndTime: "2026-09-11T08:47:00-07:00"},
]


export { users, meals, foods, mealEntries }
