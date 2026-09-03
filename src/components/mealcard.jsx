const MealCard = ({ meal, myFoods, handleIsEditing, handleDelete }) => {
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
        <div className='foodCard' onClick={() => handleIsEditing('meal', true, meal.id)}>
            <button type='button' className='deleteBtn' onClick={(event) => handleDelete(event, 'meal', meal.id)}>x</button>
            <h3>{meal.name}</h3>
            <p>{Math.round(macros.cal)} Calories</p>
            <p>{Math.round(macros.protein)}g Protein</p>
            <p>{Math.round(macros.carb)}g Carbs</p>
            <p>{Math.round(macros.fat)}g Fat</p>
            <p>{Math.round(macros.sodium)}mg Sodium</p>
        </div>
    )
}

export default MealCard