import { calculateMacros } from "../util/helpers"

const MealCard = ({ meal, myFoods, handleIsEditing, handleDelete }) => {
    
    const macros = calculateMacros(myFoods, meal)

    return (
        <div className='foodCard' onClick={() => handleIsEditing('meal', true, meal.id)}>
            <button type='button' className='deleteBtn' onClick={(event) => handleDelete(event, 'meal', meal.id)}>×</button>
            <h3>{meal.name}</h3>
            <p>{Math.round(macros.cal)} Calories</p>
            <p>{Math.round(macros.protein)}g Protein</p>
            <p>{Math.round(macros.carb)}g Carbs</p>
            <p>{Math.round(macros.fat)}g Fat</p>
            <p>{Math.round(macros.sodium)}mg Sodium</p>
        </div>
    )
}

export default MealCard