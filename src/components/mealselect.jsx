const MealSelect = ({ myMeals, myMealEntries}) => {
    const options = myMealEntries.map(item => {
        const meal = myMeals.find (selected => selected.id === item.mealId)

        return <option key={meal.id}>{meal.name}</option>
    })
    return (
        <div id='selectorBox'>
            <select id='mealSelect'>
                <option>Add Daily Meal</option>
                {options}
            </select>
            <button type='button' id='addDailyBtn' onClick='addDailyItem'>Add Item</button>
        </div>
        
    )
}

export default MealSelect