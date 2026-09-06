const MealSelect = ({ myMeals, myMealEntries}) => {
    const options = myMeals.map(meal => {
        return <option key={meal.id} name=''>{meal.name}</option>
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