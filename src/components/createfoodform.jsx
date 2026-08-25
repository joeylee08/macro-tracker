import { useState } from 'react'

const CreateFoodForm = ({ onAddFood, currentUserId }) => {
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        userId: '',
        servingSize: '',
        servingUnit: '',
        cal: '',
        protein: '',
        carb: '',
        fat: '',
        sodium: ''
    })

    function handleChange(event) {
        const { name, value } = event.target

        setFormData(previousData => ({
            ...previousData,
            [name]: value
        }))
    }

    function handleSubmit(event) {
        event.preventDefault()
        //event.target.value gives number values as strings so convert
        onAddFood(newFood)
    }
    return (
        <form className='form' onChange={handleChange} onSubmit={handleSubmit}>
            <label htmlFor='name'>Name</label>
            <input type='text' id='name' name='name' value={formData.name}></input>
            <label htmlFor='servingSize'>Serving Size</label>
            <input type='number' id='servingSize' name='servingSize' value={formData.servingSize}></input>
            <label htmlFor='servingUnit'>Serving Unit</label>
            <select id='servingUnit' name='servingUnit' value={formData.servingUnit}>
                <option value='oz'>oz</option>
                <option value='g'>g</option>
                <option value='tbsp'>tbsp</option>
                <option value='tsp'>tsp</option>
                <option value='cup'>cup</option>
                <option value='piece'>piece</option>
            </select>
            <label htmlFor='cal'>Calories</label>
            <input type='number' id='cal' name='cal' value={formData.cal}></input>
            <label htmlFor='protein'>Protein (g)</label>
            <input type='number' id='protein' name='protein' value={formData.protein}></input>
            <label htmlFor='carb'>Carbs (g)</label>
            <input type='number' id='carb' name='carb' value={formData.carb}></input>
            <label htmlFor='fat'>Fat (g)</label>
            <input type='number' id='fat' name='fat' value={formData.fat}></input>
            <label htmlFor='sodium'>Sodium (mg)</label>
            <input type='number' id='sodium' name='sodium' value={formData.sodium}></input>
        </form>
    )
}

export default CreateFoodForm