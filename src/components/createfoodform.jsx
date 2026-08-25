import { useState } from 'react'

const CreateFoodForm = ({ onAddFood, currentUserId }) => {
    const [formData, setFormData] = useState({
        id: 'number',
        name: 'string',
        userId: 'number',
        servingSize: 'number',
        servingUnit: 'string',
        cal: 'number',
        protein: 'number',
        carb: 'number',
        fat: 'number',
        sodium: 'number'
    })

    function handleChange(event) {
        const { name, value } = event.target

        setFormData(previousData => ({
            ...previousData,
            [name]: value
        }))
    }

    function handleSubmit() {

        onAddFood(newFood)
    }
    return (
        <form className='form' onChange={handleChange} onSubmit={handleSubmit}>
            <input name='name' value={formData.name}></input>
            <input name='servingSize' value={formData.servingSize}></input>
            <input name='servingUnit' value={formData.servingUnit}></input>
            <input name='cal' value={formData.cal}></input>
            <input name='protein' value={formData.protein}></input>
            <input name='carb' value={formData.carb}></input>
            <input name='fat' value={formData.fat}></input>
            <input name='sodium' value={formData.sodium}></input>
        </form>
    )
}

export default CreateFoodForm