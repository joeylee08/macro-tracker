const MonthChart = ({ currentYearMonth, handleSelectDay }) => {
    const [year, month] = currentYearMonth.split('-')
    const dayCount = new Date(year, month, 0).getDate()
    const startDay = new Date(year, month - 1, 1).getDay()
 

    const days = [...Array(startDay).fill(0), ...Array(dayCount).fill(1)]
                    .map((item, index) => {
                        const dayNumber = index - startDay + 1
                        return item === 0 
                            ? <div key={`empty-${index}`} id='emptyDayTile'></div>
                            : <button key={`day-${index}`} type='button' id='dayTile' onClick={() => handleSelectDay(dayNumber)}>{dayNumber}</button>
                        })

    return (
        <div id='monthChart'>
            {days}
        </div>
    )
}

export default MonthChart