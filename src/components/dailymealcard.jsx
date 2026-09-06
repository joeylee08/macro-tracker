import { calculateMacros } from "../util/helpers"

const DailyMealCard = ({ meal, myFoods }) => {
    
    const macros = calculateMacros(myFoods, meal)

    return (
        <div className='foodCard'>
            <button type='button' className='deleteBtn'>×</button>
            <h3>{meal.name}</h3>
            <p>{Math.round(macros.cal)} Calories</p>
            <p>{Math.round(macros.protein)}g Protein</p>
            <p>{Math.round(macros.carb)}g Carbs</p>
            <p>{Math.round(macros.fat)}g Fat</p>
            <p>{Math.round(macros.sodium)}mg Sodium</p>
        </div>
    )
}

export default DailyMealCard