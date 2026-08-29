import { useState } from 'react'

const CreateMealForm = ({ onAddMeal, currentUserId, nextMealIndex, myFoods }) => {
    const [meal, setMeal] = useState({
        id: nextMealIndex,
        name: '',
        userId: currentUserId,
        ingredients: []
    })

    //use to set meal name only
    function handleMealChange(event) {
        const { name, value } = event.target
        setMeal(previousData => ({
            ...previousData,
            [name]: value
        }))
    }

    //ingredient model
    const [ingredient, setIngredient] = useState({
        foodId: 0,
        units: 1
    })

    //use to adjust ingredient parameters
    function handleIngredientChange(event) {
        const { name, value } = event.target
        setIngredient(previous => ({
            ...previous,
            [name]: value
        }))
    }

    //set the meal with updated ingredients
    function handleAddIngredient() {       
        if (ingredient.foodId === 0 || +ingredient.units <= 0) return

        const newIngredient = {
            foodId: +ingredient.foodId,
            units: +ingredient.units
        }
        setMeal(previous => ({
            ...previous,
            ingredients: [...previous.ingredients, newIngredient]
        }))
    }

    //submit completed meal
    function handleSubmit(event) {
        event.preventDefault()
        onAddMeal(meal)
    }

    const ingredients = myFoods.map(food => 
        <option key={food.id} value={food.id}>{food.name} ({food.servingSize} {food.servingUnit})</option>
    )

    const dashboard = meal.ingredients.map((item, index) => {
        const food = myFoods.find(food => food.id === item.foodId)

        if (!food) {
            console.error(`Food not found for foodId ${item.foodId}.`)
            return null
        }

        //find another key instead of using index... 
        //prevent multiple of the same item from being added twice
        return (
            <p key={index}>{food.name} {+food.servingSize * +item.units} {food.servingUnit}</p>
        )
    })

    return (
        <form className='form' onSubmit={handleSubmit}>
            <label htmlFor='name'>Meal Name</label>
            <input type='text' id='name' name='name' value={meal.name} onChange={handleMealChange} required minLength='1' maxLength='26'></input>
            <label htmlFor='ingredients'>Ingredients</label>
            <select id='ingredients' name='foodId' value={ingredient.foodId} onChange={handleIngredientChange}>
                <option value='0'>Select An Ingredient</option>
                {ingredients}
            </select>
            <label htmlFor='units'>Units</label>
            <input type='number' id='units' name='units' value={ingredient.units} onChange={handleIngredientChange} required min='0.1' step='any'></input>
            <button type='button' className='formBtn' onClick={handleAddIngredient}>Add Ingredient</button>
            <button type='submit' className='formBtn'>Save New Meal</button>
            <div id='dashboard'>
                {dashboard}
            </div>
            
        </form>
    )
}

export default CreateMealForm