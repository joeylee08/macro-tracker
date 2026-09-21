import { useState } from 'react'

const MonthYearSelect = ({ handleToggleHistoryForm, setCurrentYearMonth, handleSelectDay, myMealEntries }) => {
    const now = new Date()

    const [defaultYearMonth, setDefaultYearMonth] = useState(`${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`)
    const [defaultYear, defaultMonth] = defaultYearMonth.split('-')

    const [tempMonthYear, setTempMonthYear] = useState({year: defaultYear, month: defaultMonth})

    const loggedYears = [...new Set([
        defaultYear,
        ...myMealEntries.map(entry => String(new Date(entry.dateAndTime).getFullYear()))
    ])]

    const yearsList = loggedYears.map(year => <option key={year} value={year}>{year}</option>)

    const handleChange = (event) => {
        const { name, value } = event.target
        setTempMonthYear(previousData => ({
            ...previousData,
            [name]: value
        }))
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        
        const updatedYearMonth = `${tempMonthYear.year}-${tempMonthYear.month}`
        setCurrentYearMonth(updatedYearMonth)

        const displayedDay = tempMonthYear.year === defaultYear && tempMonthYear.month === defaultMonth ? now.getDate() : 1
        
        handleSelectDay(displayedDay, tempMonthYear.year, tempMonthYear.month)
        handleToggleHistoryForm()
    }

    return (
        <form className='form monthYear' onSubmit={handleSubmit}>
            <button type='button' className='redX closeFormX' onClick={handleToggleHistoryForm}>×</button>
            <div className='historyFormField'>
                <select className='monthYear' name='month' value={tempMonthYear.month} onChange={handleChange}>
                    <option value=''>Select Month</option>
                    <option value='01'>January</option>
                    <option value='02'>February</option>
                    <option value='03'>March</option>
                    <option value='04'>April</option>
                    <option value='05'>May</option>
                    <option value='06'>June</option>
                    <option value='07'>July</option>
                    <option value='08'>August</option>
                    <option value='09'>September</option>
                    <option value='10'>October</option>
                    <option value='11'>November</option>
                    <option value='12'>December</option>
                </select>
                <select className='monthYear' name='year' value={tempMonthYear.year} onChange={handleChange}>
                    <option value=''>Select Year</option>
                    {yearsList}
                </select>
                <button className='formBtn formBtnHistory'>Find History</button>
            </div>
            
        </form>
    )
}

export default MonthYearSelect