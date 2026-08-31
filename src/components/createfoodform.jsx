import { useState } from 'react'
import { validateData } from '../util/helpers'

const CreateFoodForm = ({ onAddFood, currentUserId, nextFoodIndex }) => {
    const [formData, setFormData] = useState({
        id: nextFoodIndex,
        name: '',
        userId: currentUserId,
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

        if (formData.servingUnit === '') {
            console.error('Please specify units.')
            return null
        }

        //event.target.value gives number values as strings so convert
        const toNumbers = {
            id: +formData.id,
            name: formData.name,
            userId: +formData.userId,
            servingSize: +formData.servingSize,
            servingUnit: formData.servingUnit,
            cal: +formData.cal,
            protein: +formData.protein,
            carb: +formData.carb,
            fat: +formData.fat,
            sodium: +formData.sodium
        }

        const isValid = validateData(toNumbers, 'food')
        if (!isValid) return

        onAddFood(toNumbers)
    }

    return (
        <form className='form' onChange={handleChange} onSubmit={handleSubmit}>
            <label htmlFor='name'>Name</label>
            <input type='text' id='name' name='name' value={formData.name} required minLength='1' maxLength='19'></input>
            <label htmlFor='servingSize'>Serving Size</label>
            <input type='number' id='servingSize' name='servingSize' value={formData.servingSize} required min='.01' step='any'></input>
            <label htmlFor='servingUnit'>Serving Unit</label>
            <select id='servingUnit' name='servingUnit' value={formData.servingUnit}>
                <option value=''>Select Unit</option>
                <option value='oz'>oz</option>
                <option value='g'>g</option>
                <option value='tbsp'>tbsp</option>
                <option value='tsp'>tsp</option>
                <option value='cup'>cup</option>
                <option value='piece'>piece</option>
            </select>
            <label htmlFor='cal'>Calories</label>
            <input type='number' id='cal' name='cal' value={formData.cal} min='0' step='any'></input>
            <label htmlFor='protein'>Protein (g)</label>
            <input type='number' id='protein' name='protein' value={formData.protein} min='0' step='any'></input>
            <label htmlFor='carb'>Carbs (g)</label>
            <input type='number' id='carb' name='carb' value={formData.carb} min='0' step='any'></input>
            <label htmlFor='fat'>Fat (g)</label>
            <input type='number' id='fat' name='fat' value={formData.fat} min='0' step='any'></input>
            <label htmlFor='sodium'>Sodium (mg)</label>
            <input type='number' id='sodium' name='sodium' value={formData.sodium} min='0' step='any'></input>
            <button id='formBtnFood'>
                SUBMIT
            </button>
        </form>
    )
}

export default CreateFoodForm