import { useState } from 'react'


const MacroChart = ({ myMeals, myMealEntries }) => {
    const [macroTotals, setMacroTotals] = useState({
        cal: 0,
        protein: 0,
        carb: 0,
        fat: 0,
        sodium: 0
    })

    const handleSetTotals = () => {

    }

    const renderedMealEntries = myMealEntries.map(item => item.mealId)

    // const macroRows = 

                // <div className='meterAndLabel'>
                //     <h2 className='meterLabel'>Calories (kcal)</h2>
                //     <div className='macroMeter'>
                //         <div className='macroMeterFill' id='calories'></div>
                //     </div>
                //     <h2 className='stats'>2,300 of 2,300 total</h2>
                // </div>

    return (
        <div className='myGoals'>
            <div className ='myGoalsChild'>
                
            </div>
            <div className='myGoalsChild'>

            </div>
        </div>
    )
}

export default MacroChart