import { useState } from 'react'


const MacroChart = ({ myMealEntries }) => {
    const renderedMealEntries = myMealEntries.map(item => item.mealId)

    return (
        <div id='myGoals'>
            <div id='myGoalsChild'>
                {renderedMealEntries}
            </div>
        </div>
    )
}

export default MacroChart