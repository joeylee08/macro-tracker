import { getFormattedDate, getMonthYear } from "../util/helpers"
import MonthChart from "../components/monthchart"
import MacroChart from "../components/macrochart"
import DailyMealCard from "../components/dailymealcard"
import { useState } from "react"

const History = ({ currentUser, myMealEntries, myFoods, myMeals }) => {
    // calendar stuff
    const now = new Date()

    const [currentYearMonth, setCurrentYearMonth] = useState(`${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`)
    const [year, month] = currentYearMonth.split('-')
    const formattedMonth = new Date(year, month - 1).toLocaleDateString('en-US', {
                                                        month: 'long',
                                                        year: 'numeric'
                                                    })
    // macrochart and readOnly meal tiles   
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)

    const [selectedDay, setSelectedDay] = useState(getFormattedDate(yesterday))   
    const handleSelectDay = (dayNumber) => {
        const newDay = new Date(+year, +month - 1, dayNumber)
        setSelectedDay(getFormattedDate(newDay))
    }            

    const selectedDaysEntries = myMealEntries.filter(entry => getFormattedDate(entry.dateAndTime) === selectedDay)

    const dailyMealCards = selectedDaysEntries.map(entry => {
        const selectedMeal = myMeals.find(meal => meal.id === +entry.mealId)
        if (!selectedMeal) return null
        return <DailyMealCard key={entry.id} entryId={entry.id} meal={selectedMeal} myFoods={myFoods} readOnly={true}/>
    })
    
    return (
        <div className='mainPage'>
            <div className='headerBox'>
                <h1>Your Dietary History</h1>
            </div>
            <div className='dateHeader'>
                <h1>{formattedMonth}</h1>
            </div>
            <div className='myHistory'>
                <hr className='dividerLine2'/>
                <MonthChart currentYearMonth={currentYearMonth} currentUser={currentUser} myFoods={myFoods} myMeals={myMeals} myMealEntries={myMealEntries} handleSelectDay={handleSelectDay}/>
                <hr className='dividerLine3'/>
            </div>
            <div className='headerBox'>
                <h1>Daily Summary</h1>
            </div>
            <div className='dateHeader'>
                <h1>{selectedDay}</h1>
            </div>
            <div className='myHistory2'>
                <MacroChart currentUser={currentUser} myFoods={myFoods} myMeals={myMeals} todaysEntries={selectedDaysEntries}/>
            </div>
            <div className='myHistory3'>
                {dailyMealCards}
            </div>
        </div>
    )
}

export default History

// dateAndTime: "2026-09-08T08:47:00-07:00"
// Date Month Year [getFormattedDate]