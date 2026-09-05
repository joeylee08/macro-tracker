import { useState } from 'react'
import { calculateMacros } from '../util/helpers'

const MacroChart = ({ currentUser, myFoods, myMeals, myMealEntries }) => {

    const macroTotals = myMealEntries.reduce((totals, entry) => {
        const meal = myMeals.find(item => item.id === entry.mealId)

        if (!meal) return totals

        const mealMacros = calculateMacros(myFoods, meal)
        for (const macro in totals) totals[macro] += mealMacros[macro]

        return totals
        }, { cal: 0, protein: 0, carb: 0, fat: 0, sodium: 0 }
    )

    const userGoals = currentUser.macroGoals

    const labels = {
        cal: 'Calories (kcal)',
        protein: 'Protein (g)',
        carb: 'Carbs (g)',
        fat: 'Fat (g)',
        sodium: 'Sodium (mg)'
    }

    //calculate from consolidated macros object
    const macroRows = Object.entries(macroTotals).map(([macro, value]) => {
        const percentage = Math.round((value / userGoals[macro]) * 100)

        return (
            <div className='meterAndLabel' key={macro}>
                <h2 className='meterLabel'>{labels[macro]}</h2>
                <div className='macroMeter'>
                    <div className='macroMeterFill' id={macro} style={{ width: `${Math.min(percentage, 100)}%`}}></div>
                </div>
                <h2 className='stats'>{Math.round(value)} / {userGoals[macro]} [{percentage}%]</h2>
            </div>
        )
    })

    return (
        <div id='macroChart'>
            {macroRows}
        </div>
    )
}

export default MacroChart