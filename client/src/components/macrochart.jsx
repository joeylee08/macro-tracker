const MacroChart = ({ currentUser, todaysMealEntries }) => {
    const todaysMacros = { cal: 0, protein: 0, carb: 0, fat: 0, sodium: 0}

    const macroTotals = todaysMealEntries
                            .map(entry => ({
                                cal: entry.cal,
                                protein: entry.protein,
                                carb: entry.carb,
                                fat: entry.fat,
                                sodium: entry.sodium,
                            }))
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
        const roundedValue = Math.round(value)
        const remainder = userGoals[macro] - roundedValue
        const percentage = userGoals[macro] === 0
                                        ? 0
                                        : Math.floor((roundedValue / userGoals[macro]) * 100)
        
        let overColor = macro === 'protein' ? 'blue' : 'red'
        if (remainder === 0) overColor = 'green'

        return (
            <div className='meterAndLabel' key={macro}>
                <h2 className='meterLabel'>{labels[macro]}</h2>
                <div className='macroMeter'>
                    <div className='macroMeterFill' id={macro} style={{ width: `${Math.min(percentage, 100)}%`}}></div>
                </div>
                <h2 className='stats' style={{ color: remainder >= 0 ? 'inherit' : overColor }}>{roundedValue} / {userGoals[macro]} [{percentage}%]</h2>
                <h3 className='remaining' style={{ color: remainder >= 0 ? 'green' : overColor }}>{remainder >= 0 ? `${Math.abs(remainder)}` : `+${Math.abs(remainder)}`}</h3>
            </div>                                                                                        
        )
    })

    return (
        <div className='macroChart'>
            {macroRows}
        </div>
    )
}

export default MacroChart