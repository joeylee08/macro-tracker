import { useState } from 'react'

const CreateMealForm = ({ onAddMeal, currentUserId, nextMealIndex, myFoods }) => {
    const [meal, setMeal] = useState({
        id: nextMealIndex,
        name: '',
        userId: currentUserId,
        ingredients: []
    })

    function handleMealChange(event) {
        const { name, value } = event.target
        setMeal(meal)
    }

    const [ingredient, setIngredient] = useState({
        foodId: null,
        units: 1
    })

    function handleIngredientChange(event) {
        
    }

    function handleSetIngredient(event) {
        setIngredient(ingredient)
    }

    function handleSubmit(event) {
        event.preventDefault()
        onAddMeal()

    }

    const ingredients = myFoods.map(food => 
        <option key={food.id} value={food.id}>{food.name} ({food.servingSize} {food.servingUnit})</option>
    )

    return (
        <form className='form' onSubmit={handleSubmit}>
            <label htmlFor='name'>Meal Name</label>
            <input type='text' id='name' name='name' value={meal.name} onChange={handleMealChange} required minLength='1' maxLength='26'></input>
            <label htmlFor='ingredients'>Ingredients</label>
            <select id='ingredients' name='foodId' value={ingredient.foodId} onChange={handleIngredientChange}>
                {ingredients}
            </select>
            <label htmlFor='units'>Units</label>
            <input type='number' id='units' name='units' value={ingredient.units} onChange={handleIngredientChange} required min='0.1' step='any'></input>
            <button className='formBtn'>Add Ingredient</button>
            <button className='formBtn'>Save New Meal</button>
        </form>
    )
}

export default CreateMealForm