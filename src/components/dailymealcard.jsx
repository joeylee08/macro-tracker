import { calculateEntryMacros } from "../util/helpers"

const DailyMealCard = ({ entryId, mealEntry, handleMealEntries, readOnly }) => {
    
    const macros = calculateEntryMacros(mealEntry)

    return (
        <div className={readOnly ? 'foodCard readOnly' : 'foodCard'}>
            {readOnly ? null : <button type='button' className='redX deleteBtn' onClick={() => handleMealEntries(entryId, 'delete')}>×</button>}
            <h3>{mealEntry.name}</h3>
            <p>{Math.round(macros.cal)} Calories</p>
            <p>{Math.round(macros.protein)}g Protein</p>
            <p>{Math.round(macros.carb)}g Carbs</p>
            <p>{Math.round(macros.fat)}g Fat</p>
            <p>{Math.round(macros.sodium)}mg Sodium</p>
        </div>
    )
}

export default DailyMealCard