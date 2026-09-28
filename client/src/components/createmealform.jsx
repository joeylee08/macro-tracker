import { useState } from 'react'
import FoodThumb from './foodthumb'
import { validateData } from '../util/helpers'

const CreateMealForm = ({ onAddMeal, myFoods, handleToggleForm, isEditing, selectedItem, handleDelete }) => {
    const [meal, setMeal] = useState(
        isEditing  
            ? selectedItem
            : {
                name: '',
                ingredients: []
            }
        )

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

        if (meal.ingredients.find(item => item.foodId === +ingredient.foodId)) {
            const adjustedForDuplicate = meal.ingredients.map(item => 
                item.foodId !== +ingredient.foodId ? item : {...item, units: +ingredient.units}
            )
            setMeal(previous => ({
                ...previous,
                ingredients: adjustedForDuplicate
            }))
            console.log('Adjusted ingredient amount.')
            //reset ingredient / units
            setIngredient({ foodId: 0, units: 1 })
            return
        }

        const newIngredient = {
            foodId: +ingredient.foodId,
            units: +(+ingredient.units).toFixed(2)
        }
        setMeal(previous => ({
            ...previous,
            ingredients: [...previous.ingredients, newIngredient]
        }))
        //reset ingredient / units
        setIngredient({ foodId: 0, units: 1 })
    }

    //submit completed meal
    function handleSubmit(event) {
        event.preventDefault()

        if (!validateData(meal,'meal')) return

        if (isEditing) {
            if (meal.ingredients.length === 0) {
                handleDelete('meal', selectedItem.id)
                handleToggleForm('meal')
                return
            }
            return fetch(`http://localhost:5000/api/meals/${selectedItem.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(meal)
                })
                .then(res => {
                    if (!res.ok) {
                        return res.json()
                                    .then(json => {throw new Error(json.error)})
                    }
                    return res.json()
                }) 
                .then(json => {
                    onAddMeal(json, false)
                    console.log('Meal successfully updated.')
                    console.log('RETURNED JSON ING', json.ingredients)
                })
                .catch(error => console.error(error.message))
        }

        fetch('http://localhost:5000/api/meals', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(meal)
            })
            .then(res => {
                if (!res.ok) {
                    return res.json()
                                .then(json => {throw new Error(json.error)})
                }
                return res.json()
            }) 
            .then(json => onAddMeal(json))
            .catch(error => console.error(error.message))
    }

    //close temporary thumbnail on dashboard
    function closeThumbnail(foodId) {
        const filtered = meal.ingredients.filter(item => 
            item.foodId !== foodId
        )
        setMeal(previous => ({
            ...previous,
            ingredients: filtered
        }))
    }

    const ingredients = myFoods.map(food => 
        <option key={food.id} value={food.id}>{food.name} ({food.servingSize} {food.servingUnit})</option>
    )

    const dashboard = meal.ingredients.map((item) => {
        const food = myFoods.find(food => food.id === item.foodId)

        if (!food) {
            console.error(`Food not found for foodId ${item.foodId}.`)
            return null
        }

        return (
            <FoodThumb key={food.id} food={food} item={item} closeThumbnail={closeThumbnail} />
        )
    })

    return (
        <form className='form' onSubmit={handleSubmit}>
            <button type='button' className='redX closeFormX' onClick={() => handleToggleForm('meal')}>×</button>
            <div className='foodFormField'>
                <label htmlFor='name'>Meal Name</label>
                <input type='text' id='name' name='name' value={meal.name} onChange={handleMealChange} required minLength='1' maxLength='19'></input>
                <label htmlFor='ingredients'>Ingredients</label>
                <select name='foodId' value={ingredient.foodId} onChange={handleIngredientChange}>
                    <option value='0'>Select An Ingredient</option>
                    {ingredients}
                </select>
                <label htmlFor='units'>Units</label>
                <input type='number' id='units' name='units' value={ingredient.units} onChange={handleIngredientChange} required min='0.1' step='any'></input>
            </div>
            <div className='formBtnContainer'>
                <button type='button' className='formBtn formBtnMeal' onClick={handleAddIngredient}>Add Item</button>
                <button type='submit' className='formBtn formBtnMeal'>{isEditing ? 'Save Edit' : 'Save Meal'}</button>
            </div>
            <div className='foodThumbDashboard'>
                {dashboard}
            </div>
            
        </form>
    )
}

export default CreateMealForm