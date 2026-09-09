const MonthChart = ({ currentYearMonth, myMealEntries }) => {
    const [year, month] = currentYearMonth.split('-')
    const dayCount = new Date(year, month, 0).getDate()
    const thisMonthsEntries = myMealEntries.filter(entry => entry.dateAndTime.slice(0, 7) === currentYearMonth)    

    const days = Array(dayCount).fill(0).map((entry, index) => 
        <button key={index + 1} type='button' id='dayTile'>{index + 1}</button>
    )

    return (
        <div id='monthChart'>
            {days}
        </div>
    )
}

export default MonthChart