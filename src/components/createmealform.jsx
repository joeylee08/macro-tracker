import { useState } from 'react'

const CreateMealForm = ({ onAddMeal, currentUserId, nextMealIndex, myFoods }) => {
    const [formData, setFormData] = useState({
        id: nextMealIndex,
        name: '',
        userId: currentUserId,
        ingredients: []
    })

    function handleChange(event) {
        const { name, value } = event.target

    }

    function handleSubmit(event) {
        event.preventDefault()
        onAddMeal()

    }

    const ingredients = myFoods.map(food => 
        <option key={food.id} value={food.id}>{food.name} ({food.servingSize} {food.servingUnit})</option>
    )

    return (
        <form className='form' onChange={handleChange} onSubmit={handleSubmit}>
            <label htmlFor='name'>Meal Name</label>
            <input type='text' id='name' name='name' value={formData.name} required minLength='1' maxLength='26'></input>
            <label htmlFor='ingredients'>Ingredients</label>
            <select id='ingredients' name='ingredients'>
                {ingredients}
            </select>
        </form>
    )
}

export default CreateMealForm