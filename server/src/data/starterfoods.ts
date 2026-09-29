const starterFoods= [
    {name: 'Chicken Breast', servingSize: 1, servingUnit: 'oz', cal: 27.5, protein: 6.25, carb: 0, fat: 0.375, sodium: 22.5},
    {name: 'Corn Tortilla', servingSize: 1, servingUnit: 'piece', cal: 50, protein: 1, carb: 10, fat: 0.5, sodium: 10},
    {name: 'Egg', servingSize: 1, servingUnit: 'piece', cal: 72, protein: 6.3, carb: 0.4, fat: 4.8, sodium: 71},
    {name: 'Oatmeal', servingSize: 0.5, servingUnit: 'cup', cal: 150, protein: 5, carb: 27, fat: 2.5, sodium: 0},
    {name: 'Peanut Butter', servingSize: 1, servingUnit: 'tbsp', cal: 90, protein: 4, carb: 3.5, fat: 8, sodium: 35},
    {name: 'Banana', servingSize: 1, servingUnit: 'piece', cal: 105, protein: 1.3, carb: 27, fat: 0.4, sodium: 1},
    {name: 'Honey', servingSize: 1, servingUnit: 'tbsp', cal: 70, protein: 0, carb: 17, fat: 0, sodium: 0},
    {name: 'Avocado', servingSize: 1, servingUnit: 'piece', cal: 240, protein: 3, carb: 13, fat: 22, sodium: 10},
    {name: 'White Rice', servingSize: 0.5, servingUnit: 'cup', cal: 170, protein: 4, carb: 38, fat: 0, sodium: 0},
    {name: 'Olive Oil', servingSize: 1, servingUnit: 'tsp', cal: 40, protein: 0, carb: 0, fat: 4.68, sodium: 0},
    {name: 'Pork Chop', servingSize: 1, servingUnit: 'oz', cal: 45, protein: 6, carb: 0, fat: 2, sodium: 13.75},
    {name: 'Ground Turkey', servingSize: 1, servingUnit: 'oz', cal: 40, protein: 5.5, carb: 0, fat: 2, sodium: 21.25},
    {name: 'Egg White', servingSize: 1, servingUnit: 'piece', cal: 17, protein: 3.6, carb: 0.2, fat: 0.1, sodium: 55},
]

const starterMeals = [
    {name: 'PB Oatmeal', ingredients: [{foodName: 'Oatmeal', units: 1}, {foodName: 'Peanut Butter', units: 2}, {foodName: 'Honey', units: 1}]},
    {name: 'Chicken Avo Tacos', ingredients: [{foodName: 'Chicken Breast', units: 4}, {foodName: 'Avocado', units: 0.125}, {foodName: 'White Rice', units: 1}, {foodName: 'Olive Oil', units: 1}]},
    {name: 'Turkey Egg Tacos', ingredients: [{foodName: 'Egg', units: 2}, {foodName: 'Ground Turkey', units: 1.33}, {foodName: 'Corn Tortilla', units: 3}, {foodName: 'Olive Oil', units: 1}]},
    {name: 'Chicken Bowl', ingredients: [{foodName: 'Chicken Breast', units: 4}, {foodName: 'White Rice', units: 1}, {foodName: 'Olive Oil', units: 1}]},
    {name: 'Pork Chop Bowl', ingredients: [{foodName: 'Pork Chop', units: 4}, {foodName: 'White Rice', units: 1}, {foodName: 'Olive Oil', units: 1}]},
]

export { starterFoods, starterMeals }