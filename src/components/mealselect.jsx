import { useState } from 'react'

const MealSelect = ({ myMeals, handleMealEntries }) => {
    const [selectedMealId, setSelectedMealId] = useState(0)
    
    const handleChange = (event) => {
        const mealId = +event.target.value 
        setSelectedMealId(mealId)
    }
 
    const options = myMeals.map(meal => {
        return <option key={meal.id} value={meal.id}>{meal.name}</option>
    })

    return (
        <div id='selectorBox'>
            <select id='mealSelect' value={selectedMealId} onChange={handleChange}>
                <option>Add Daily Meal</option>
                {options}
            </select>
            <button type='button' id='addDailyBtn' onClick={() => handleMealEntries(selectedMealId, 'add')}>Add Item</button>
        </div>
        
    )
}

export default MealSelect