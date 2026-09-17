import { getFormattedDate } from "../util/helpers"
import MonthChart from "../components/monthchart"
import MacroChart from "../components/macrochart"
import DailyMealCard from "../components/dailymealcard"
import MonthYearSelect from "../components/monthyearselect"
import { useState } from "react"
import { useContext } from 'react'
import { UserContext } from '../context/usercontext'
import { Clock } from 'lucide-react'

const History = ({ myMealEntries }) => {
    const { currentUser } = useContext(UserContext)

    // calendar stuff
    const now = new Date()

    const [currentYearMonth, setCurrentYearMonth] = useState(`${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`)
    const [year, month] = currentYearMonth.split('-')
    const formattedMonth = new Date(year, month - 1).toLocaleDateString('en-US', {
                                                        month: 'long',
                                                        year: 'numeric'
                                                    })

    const [toggleHistoryForm, setToggleHistoryForm] = useState(false)
    const handleToggleHistoryForm = () => {
        setToggleHistoryForm(bool => !bool)
    }

    // macrochart and readOnly meal tiles   
    const [selectedDay, setSelectedDay] = useState(getFormattedDate(now))   
    const handleSelectDay = (dayNumber, specificYear = year, specificMonth = month) => {
        const newDay = new Date(+specificYear, +specificMonth - 1, dayNumber)
        setSelectedDay(getFormattedDate(newDay))
    }

    const selectedDaysEntries = myMealEntries.filter(entry => getFormattedDate(entry.dateAndTime) === selectedDay)
                        
    const dailyMealCards = selectedDaysEntries.map(entry => <DailyMealCard 
                                                                key={entry.id} 
                                                                entryId={entry.id} 
                                                                mealEntry={entry} 
                                                                readOnly={true}/>)
    
    return (
        <div className='mainPage'>
            {toggleHistoryForm && <div id='screenBlock'></div>}
            {toggleHistoryForm && <MonthYearSelect handleToggleHistoryForm={handleToggleHistoryForm} setCurrentYearMonth={setCurrentYearMonth} handleSelectDay={handleSelectDay} myMealEntries={myMealEntries}/>}
            <div className='headerBox' id='history'>
                <h1>Your Dietary History</h1>
            </div>
            <div className='dateHeader'>
                <h1>{formattedMonth}</h1>
            </div>
            <div className='myHistory'>
                <button className='calendarBtn' onClick={handleToggleHistoryForm} aria-label='Choose month and year' title='Choose month and year'>
                    <Clock size={30.5}/>
                </button>
                <MonthChart currentUser={currentUser} currentYearMonth={currentYearMonth} selectedDay={selectedDay} myMealEntries={myMealEntries} handleSelectDay={handleSelectDay}/>
            </div>
            <div className='headerBox'>
                <h1>Daily Summary</h1>
            </div>
            <div className='dateHeader'>
                <h1>{selectedDay}</h1>
            </div>
            <div className='myHistory2'>
                <MacroChart currentUser={currentUser} todaysMealEntries={selectedDaysEntries}/>
            </div>
            <div className='myHistory3'>
                {dailyMealCards.length === 0 ? <h1 className='dashboardPlaceholder' id='historyPlaceholder'>No logged meals for this day.</h1> : dailyMealCards}
            </div>
        </div>
    )
}

export default History

// dateAndTime: "2026-09-08T08:47:00-07:00"
// Date Month Year [getFormattedDate]