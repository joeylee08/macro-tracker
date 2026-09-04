import { useState } from 'react'


const MacroChart = ({ myMealEntries }) => {
    const renderedMealEntries = myMealEntries.map(item => item.mealId)

    return (
        <div className='myGoals'>
            <div className ='myGoalsChild'>
                <div className='meterAndLabel'>
                    <h2 className='meterLabel'>Calories (kcal)</h2>
                    <div className='macroMeter'>
                        <div className='macroMeterFill' id='calories'></div>
                    </div>
                    <h2 className='stats'>2,300 of 2,300 total</h2>
                </div>
                <div className='meterAndLabel'>
                    <h2 className='meterLabel'>Protein (g)</h2>
                    <div className='macroMeter'>
                        <div className='macroMeterFill' id='protein'></div>
                    </div>
                    <h2 className='stats'>penis of penis</h2>
                </div>
                <div className='meterAndLabel'>
                    <h2 className='meterLabel'>Carbs (g)</h2>
                    <div className='macroMeter'>
                        <div className='macroMeterFill' id='carbs'></div>
                    </div>
                    <h2 className='stats'>penis of penis</h2>
                </div>
                <div className='meterAndLabel'>
                    <h2 className='meterLabel'>Fat (g)</h2>
                    <div className='macroMeter'>
                        <div className='macroMeterFill' id='fat'></div>
                    </div>
                    <h2 className='stats'>penis of penis</h2>
                </div>              
                <div className='meterAndLabel'>
                    <h2 className='meterLabel'>Sodium (mg)</h2>
                    <div className='macroMeter'>
                        <div className='macroMeterFill' id='sodium'></div>
                    </div>
                    <h2 className='stats'>penis of penis</h2>
                </div>
            </div>
            <div className='myGoalsChild'>

            </div>
        </div>
    )
}

export default MacroChart