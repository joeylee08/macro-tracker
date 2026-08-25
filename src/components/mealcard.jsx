const MealCard = ({ meal, myFoods }) => {
    const ingredients = meal.ingredients

    const macros = {
        cal: 0,
        protein: 0,
        carb: 0,
        fat: 0,
        sodium: 0
    }

    const calculateMacros = () => {
        for (const { foodId, units } of ingredients) {
   
            const food = myFoods.find(food => food.id === foodId)

            if (!food) {
                console.error('Food not found.')
                return
            }

            for (const macro in macros) {
                macros[macro] += (food[macro] * units)
            }
        }
    }

    calculateMacros()

    return (
        <div className='foodCard'>
            <h3>{meal.name}</h3>
            <p>{macros.cal.toFixed(1)} Calories</p>
            <p>{macros.protein.toFixed(1)}g Protein</p>
            <p>{macros.carb.toFixed(1)}g Carbs</p>
            <p>{macros.fat.toFixed(1)}g Fat</p>
            <p>{macros.sodium.toFixed(1)}mg Sodium</p>
        </div>
    )
}

export default MealCard