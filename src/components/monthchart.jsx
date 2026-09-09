const MonthChart = ({ currentYearMonth, myMealEntries }) => {
    const [year, month] = currentYearMonth.split('-')
    const dayCount = new Date(year, month, 0).getDate()
    const startDay = new Date(year, month - 1, 1).getDay()

    const thisMonthsEntries = myMealEntries.filter(entry => entry.dateAndTime.slice(0, 7) === currentYearMonth)    

    const days = [...Array(startDay).fill(0), ...Array(dayCount).fill(1)]
                    .map((item, index) => 
                        item === 0 
                            ? <div key={`empty-${index}`} id='emptyDayTile'></div>
                            : <button key={`day-${index}`} type='button' id='dayTile'>{index - startDay + 1}</button>
                        )

    return (
        <div id='monthChart'>
            {days}
        </div>
    )
}

export default MonthChart