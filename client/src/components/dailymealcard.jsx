const DailyMealCard = ({ entryId, mealEntry, handleMealEntries, readOnly }) => {
    
    return (
        <div className={readOnly ? 'foodCard readOnly' : 'foodCard'}>
            {readOnly ? null : <button type='button' className='redX deleteBtnX' onClick={() => handleMealEntries(entryId, 'delete')}>×</button>}
            <h3>{mealEntry.name}</h3>
            <p>{Math.round(mealEntry.cal)} Calories</p>
            <p>{Math.round(mealEntry.protein)}g Protein</p>
            <p>{Math.round(mealEntry.carb)}g Carbs</p>
            <p>{Math.round(mealEntry.fat)}g Fat</p>
            <p>{Math.round(mealEntry.sodium)}mg Sodium</p>
        </div>
    )
}

export default DailyMealCard