import { calculateMacros, getFormattedDate } from "../util/helpers"

const MonthChart = ({ currentUser, currentYearMonth, handleSelectDay, myFoods, myMeals, myMealEntries }) => {
    const [year, month] = currentYearMonth.split('-')
    const dayCount = new Date(year, month, 0).getDate()
    const startDay = new Date(year, month - 1, 1).getDay()


    const goals = currentUser.macroGoals
    const getDailyScore = (entriesOfDay, myFoods) => {
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
                    return calDiff / goals.cal
                case 'protein':
                    return dailyTotal.protein >= goals.protein 
                                ? 0
                                : (goals.protein - dailyTotal.protein) / goals.protein
                case 'carb':
                    const carbDiff = Math.abs(dailyTotal.carb - goals.carb)
                    return carbDiff / goals.carb
                case 'fat':
                    return dailyTotal.fat <= goals.fat 
                                ? 0
                                : (dailyTotal.fat - goals.fat) / goals.fat
                case 'sodium':
                    return dailyTotal.sodium <= goals.sodium 
                                ? 0
                                : (dailyTotal.sodium - goals.sodium) / goals.sodium
            }
        })

        return scoreOffsets.reduce((a, b) => a + b).toFixed(2)
    }
 

    const days = [...Array(startDay).fill(0), ...Array(dayCount).fill(1)]
                    .map((item, index) => {
                        const dayNumber = index - startDay + 1
                        const entriesOfDay = myMealEntries.filter(entry => getFormattedDate(entry.dateAndTime) === getFormattedDate(new Date(+year, +month - 1, dayNumber)))
                        console.log(dayNumber, entriesOfDay)
                        return item === 0 
                            ? <div key={`empty-${index}`} id='emptyDayTile'></div>
                            : <button key={`day-${index}`} type='button' id='dayTile' onClick={() => handleSelectDay(dayNumber)}>{getDailyScore(entriesOfDay, myFoods)}</button>
                        })

    return (
        <div id='monthChart'>
            {days}
        </div>
    )
}

export default MonthChart