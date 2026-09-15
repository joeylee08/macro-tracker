import { calculateEntryMacros } from '../util/helpers'

const MacroChart = ({ currentUser, userMealEntries }) => {
    const todaysMacros = { cal: 0, protein: 0, carb: 0, fat: 0, sodium: 0}
    
    const macroTotals = userMealEntries
                            .map(entry => calculateEntryMacros(entry))
                            .reduce((a, b) => {
                                for (const macro in a) a[macro] += b[macro]
                                return a
                            }, todaysMacros)
    
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
        const remainder = Math.round(userGoals[macro] - value)
        const overColor = macro === 'protein' ? 'blue' : 'red'

        return (
            <div className='meterAndLabel' key={macro}>
                <h2 className='meterLabel'>{labels[macro]}</h2>
                <div className='macroMeter'>
                    <div className='macroMeterFill' id={macro} style={{ width: `${Math.min(percentage, 100)}%`}}></div>
                </div>
                <h2 className='stats' style={{ color: percentage > 100 ? overColor : 'inherit' }}>{Math.round(value)} / {userGoals[macro]} [{percentage}%]</h2>
                <h3 id='remaining' style={{ color: percentage > 100 ? overColor : 'green' }}>{percentage <= 100 ? remainder : `+${Math.abs(remainder)}`}</h3>
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