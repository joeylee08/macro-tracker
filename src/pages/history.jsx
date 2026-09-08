import { getFormattedDate, getMonthYear } from "../util/helpers"

const History = ({ myMealEntries}) => {
    const now = new Date()
    const currentYearMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
    const thisMonthsEntries = myMealEntries.filter(entry => getMonthYear(entry.dateAndTime) === currentYearMonth)
    
    return (
        <div className='mainPage'>
            <h1>Your Dietary History</h1>
            <p>What have you eaten?</p>
        </div>
    )
}

export default History

// dateAndTime: "2026-09-08T08:47:00-07:00"
// Date Month Year [getFormattedDate]