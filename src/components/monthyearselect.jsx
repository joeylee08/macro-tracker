import { useState } from 'react'

const MonthYearSelect = ({ handleToggleHistoryForm }) => {
    const [tempMonthYear, setTempMonthYear] = useState({month: 'January', year: '2026'})

    const handleChange = (event) => {
        const { name, value } = event.target
        setTempMonthYear(previousData => ({
            ...previousData,
            [name]: value
        }))
        console.log(tempMonthYear)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
    }

    return (
        <form className='form' id='monthYear'>
            <button type='button' className='closeForm' onClick={handleToggleHistoryForm}>×</button>
            <div className='historyFormField'>
                <select id='month' name='month' className='monthYear' value={tempMonthYear.month} onChange={handleChange}>
                    <option value=''>Select Month</option>
                    <option value='jan'>January</option>
                    <option value='feb'>February</option>
                    <option value='mar'>March</option>
                    <option value='apr'>April</option>
                    <option value='may'>May</option>
                    <option value='jun'>June</option>
                    <option value='jul'>July</option>
                    <option value='aug'>August</option>
                    <option value='sep'>September</option>
                    <option value='nov'>November</option>
                    <option value='dec'>December</option>
                </select>
                <select id='year' name='year' className='monthYear' value={tempMonthYear.year} onChange={handleChange}>
                    <option value=''>Select Year</option>
                </select>
                <button id='formBtnHistory'>Find History</button>
            </div>
            
        </form>
    )
}

export default MonthYearSelect