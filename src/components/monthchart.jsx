import { calculateMacros, getFormattedDate } from "../util/helpers"

const MonthChart = ({ currentUser, currentYearMonth, handleSelectDay, myFoods, myMeals, myMealEntries }) => {
    const [year, month] = currentYearMonth.split('-')
    const dayCount = new Date(year, month, 0).getDate()
    const startDay = new Date(year, month - 1, 1).getDay()


    const goals = currentUser.macroGoals
    
    const getDailyOffset = (entriesOfDay, myFoods) => {
        if (entriesOfDay.length === 0) return null
        const entriesMacros = entriesOfDay.map(entry => calculateMacros(myFoods, myMeals.find(meal => entry.mealId === meal.id)))
        const dailyTotal = entriesMacros.reduce((start, entry) => {
            start.cal += entry.cal
            start.protein += entry.protein
            start.carb += entry.carb
            start.fat += entry.fat
            start.sodium += entry.sodium
            return start
        }, {
            cal: 0,
            protein: 0,
            carb: 0,
            fat: 0,
            sodium: 0
        })
        const scoreOffsets = ['cal', 'protein', 'carb', 'fat', 'sodium'].map(item => {
            switch(item) {
                case 'cal':
                    const calDiff = Math.abs(dailyTotal.cal - goals.cal)
                    return Math.min((calDiff / goals.cal), 1)
                case 'protein':
                    return dailyTotal.protein >= goals.protein 
                                ? 0
                                : Math.min(((goals.protein - dailyTotal.protein) / goals.protein), 1)
                case 'carb':
                    const carbDiff = Math.abs(dailyTotal.carb - goals.carb)
                    return Math.min((carbDiff / goals.carb), 1)
                case 'fat':
                    const fatDiff = Math.abs(dailyTotal.fat - goals.fat)
                    return Math.min((fatDiff / goals.fat), 1 )
                case 'sodium':
                    return dailyTotal.sodium <= goals.sodium 
                                ? 0
                                : Math.min(((dailyTotal.sodium - goals.sodium) / goals.sodium), 1)
                default:
                    return 0
            }
        })

        return (scoreOffsets.reduce((a, b) => a + b) / scoreOffsets.length).toFixed(2)
    }

    const days = [...Array(startDay).fill(0), ...Array(dayCount).fill(1)]
                    .map((item, index) => {
                        const dayNumber = index - startDay + 1
                        const entriesOfDay = myMealEntries.filter(entry => 
                                                getFormattedDate(entry.dateAndTime) === getFormattedDate(new Date(+year, +month - 1, dayNumber)))
                        const dailyOffset = getDailyOffset(entriesOfDay, myFoods)
                        const hue = 120 - (120 * dailyOffset)
                        const logged = entriesOfDay.length === 0 ? false : true

                        return item === 0 
                            ? <div key={`empty-${index}`} id='emptyDayTile'></div>
                            : <button key={`day-${index}`} 
                                      type='button' 
                                      id='dayTile' 
                                      onClick={() => handleSelectDay(dayNumber)} 
                                      style={logged 
                                                ? { backgroundColor: `hsl(${hue}, 60%, 70%)`} 
                                                : null}>{dayNumber}</button>
                        })

    return (
        <div id='monthChart'>
            {days}
        </div>
    )
}

export default MonthChart