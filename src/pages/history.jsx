import { getFormattedDate, getMonthYear } from "../util/helpers"
import MonthChart from "../components/monthchart"
import MacroChart from "../components/macrochart"
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
    // macrochart stuff   
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)

    const [selectedDay, setSelectedDay] = useState(getFormattedDate(yesterday))                                                 
    const selectedDaysEntries = myMealEntries.filter(entry => getFormattedDate(entry.dateAndTime) === selectedDay)
    
    return (
        <div className='mainPage'>
            <div className='headerBox'>
                <h1>Your Dietary History</h1>
            </div>
            <div className='dateHeader'>
                <h1>{formattedMonth}</h1>
            </div>
            <div className='myHistory'>
                <hr className='dividerLine'/>
                <MonthChart currentYearMonth={currentYearMonth} myMealEntries={myMealEntries} />
                <hr className='dividerLine'/>
            </div>
            <div className='myHistory2'>
                <MacroChart currentUser={currentUser} myFoods={myFoods} myMeals={myMeals} todaysEntries={selectedDaysEntries}/>
            </div>
        </div>
    )
}

export default History

// dateAndTime: "2026-09-08T08:47:00-07:00"
// Date Month Year [getFormattedDate]