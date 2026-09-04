import { useState } from 'react'


const MacroChart = ({ myMealEntries }) => {
    const renderedMealEntries = myMealEntries.map(item => item.mealId)

    return (
        <div className='myGoals'>
            <div className ='myGoalsChild'>
                <div className='meterAndLabel'>
                    <h2 className='meterLabel'>Calories</h2>
                    <div className='macroMeter'>
                        <div className='macroMeterFill' id='calories'></div>
                    </div>
                </div>
                <div className='meterAndLabel'>
                    <h2 className='meterLabel'>Protein</h2>
                    <div className='macroMeter'>
                        <div className='macroMeterFill' id='protein'></div>
                    </div>
                </div>
                <div className='meterAndLabel'>
                    <h2 className='meterLabel'>Carbs</h2>
                    <div className='macroMeter'>
                        <div className='macroMeterFill' id='carbs'></div>
                    </div>
                </div>
                <div className='meterAndLabel'>
                    <h2 className='meterLabel'>Fat</h2>
                    <div className='macroMeter'>
                        <div className='macroMeterFill' id='fat'></div>
                    </div>
                </div>              
                <div className='meterAndLabel'>
                    <h2 className='meterLabel'>Sodium</h2>
                    <div className='macroMeter'>
                        <div className='macroMeterFill' id='sodium'></div>
                    </div>
                </div>
            </div>
            <div className='myGoalsChild'>
                {renderedMealEntries}
            </div>
        </div>
    )
}

export default MacroChart