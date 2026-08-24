const MealCard = ({ meal, myFoods }) => {
    const ingredients = meal.ingredients

    const macros = {
        cal: 0,
        protein: 0,
        carb: 0,
        fat: 0,
        sodium: 0
    }

    const calculateMacros = (meal) => {
        for (const item in ingredients) {
            const currentFoodId = ingredients[item].foodId
            const quantity = ingredients[item].quantity
            const food = myFoods.find(food => food.id === currentFoodId)
            
        }
    }

    return (
        <div className='foodCard'>
            <h3>{meal.name}</h3>
            <p>{meal.cal} Calories</p>
            <p>{meal.protein}g Protein</p>
            <p>{meal.carb}g Carbs</p>
            <p>{meal.fat}g Fat</p>
            <p>{meal.sodium}mg Sodium</p>
        </div>
    )
}

export default MealCard