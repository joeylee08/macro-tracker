import { useState } from 'react'

const MealSelect = ({ myMeals, handleMealEntries }) => {
    const [selectedMealId, setSelectedMealId] = useState(0)
    
    const handleChange = (event) => {
        const mealId = +event.target.value 
        setSelectedMealId(mealId)
    }
 
    const options = [...myMeals]
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .map(meal => {
                            return <option key={meal.id} value={meal.id}>{meal.name}</option>
                        })

    const addAndClear = (action) => {
        handleMealEntries(selectedMealId, action)
        setSelectedMealId(0)
    }

    return (
        <div id='selectorBox'>
            <select id='mealSelect' value={selectedMealId} onChange={handleChange}>
                <option value={0}>Select a Meal</option>
                {options}
            </select>
            <button type='button' id='addDailyBtn' onClick={() => addAndClear('add')}>Log Meal</button>
        </div>
        
    )
}

export default MealSelect