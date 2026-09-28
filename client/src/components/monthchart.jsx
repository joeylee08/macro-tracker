import { getFormattedDate } from "../util/helpers"

const MonthChart = ({ currentUser, currentYearMonth, selectedDay, handleSelectDay, myMealEntries }) => {
    const [year, month] = currentYearMonth.split('-')
    const dayCount = new Date(year, month, 0).getDate()
    const startDay = new Date(year, month - 1, 1).getDay()

    const macroGoals = {
        cal: currentUser.calGoal,
        protein: currentUser.proteinGoal,
        carb: currentUser.carbGoal,
        fat: currentUser.fatGoal,
        sodium: currentUser.sodiumGoal
    }
    
    const getDailyOffset = (entriesOfDay) => {
        if (entriesOfDay.length === 0) return null
 
        const entriesMacros = entriesOfDay.map(entry => ({
                                                cal: entry.cal,
                                                protein: entry.protein,
                                                carb: entry.carb,
                                                fat: entry.fat,
                                                sodium: entry.sodium,
                                            }))
        const dailyTotal = entriesMacros.reduce((start, entry) => {
            start.cal += entry.cal
            start.protein += entry.protein
            start.carb += entry.carb
            start.fat += entry.fat
            start.sodium += entry.sodium
            return start
        })
        const scoreOffsets = ['cal', 'protein', 'carb', 'fat', 'sodium'].map(item => {
            switch(item) {
                case 'cal':
                    const calDiff = Math.abs(dailyTotal.cal - macroGoals.cal)
                    return Math.min((calDiff / macroGoals.cal), 1)
                case 'protein':
                    return dailyTotal.protein >= macroGoals.protein 
                                ? 0
                                : Math.min(((macroGoals.protein - dailyTotal.protein) / macroGoals.protein), 1)
                case 'carb':
                    const carbDiff = Math.abs(dailyTotal.carb - macroGoals.carb)
                    return Math.min((carbDiff / macroGoals.carb), 1)
                case 'fat':
                    const fatDiff = Math.abs(dailyTotal.fat - macroGoals.fat)
                    return Math.min((fatDiff / macroGoals.fat), 1 )
                case 'sodium':
                    return dailyTotal.sodium <= macroGoals.sodium 
                                ? 0
                                : Math.min(((dailyTotal.sodium - macroGoals.sodium) / macroGoals.sodium), 1)
                default:
                    return 0
            }
        })
        
        const scaledOffsets = scoreOffsets.map(offset => {
            return Math.min((offset * 2) ** 1.5, 1)
        })

        const weightedOffsets = scaledOffsets.map((item, index) => {
            return index === 0 ? item * 0.75 : item * 0.35
        })

        const totalPenalty = weightedOffsets.reduce((a, b) => a + b)

        return Math.min(totalPenalty, 1)
    }

    const days = [...Array(startDay).fill(0), ...Array(dayCount).fill(1)]
                    .map((item, index) => {
                        const dayNumber = index - startDay + 1
                        const entriesOfDay = myMealEntries.filter(entry => 
                                                getFormattedDate(entry.dateAndTime) === getFormattedDate(new Date(+year, +month - 1, dayNumber)))
                        const dailyOffset = getDailyOffset(entriesOfDay)
                        const hue = 120 - (120 * dailyOffset)
                        const logged = entriesOfDay.length === 0 ? false : true
                        const isSelected = selectedDay === getFormattedDate(new Date(+year, +month - 1, dayNumber))

                        return item === 0 
                            ? <div key={`empty-${index}`} className='emptyDayTile'></div>
                            : <button key={`day-${index}`} 
                                      type='button' 
                                      className={`dayTile ${isSelected ? 'isSelected' : ''}`} 
                                      onClick={() => handleSelectDay(dayNumber)} 
                                      style={logged 
                                                ? { backgroundColor: `hsl(${hue}, 60%, 70%)`} 
                                                : null}>{dayNumber}</button>
                        })

    return (
        <div className='monthChart'>
            {days}
        </div>
    )
}

export default MonthChart