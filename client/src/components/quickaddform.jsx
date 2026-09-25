import { validateData } from "../util/helpers"
import { useState } from 'react'

const QuickAddForm = ({ currentUser, setMealEntries, toggleQuickAdd }) => {
    const [formData, setFormData] = useState({
        userId: currentUser.id,
        name: '',
        cal: '',
        protein: '',
        carb: '',
        fat: '',
        sodium: ''
        })
    
        const handleChange = (event) => {
            const { name, value } = event.target
            setFormData(previous => ({
                ...previous,
                [name]: value
            }))
        }
    
        const handleSubmit = (event) => {
            event.preventDefault()

            const toNumbers = {
                userId: +formData.userId,
                name: formData.name,
                cal: +formData.cal,
                protein: +formData.protein,
                carb: +formData.carb,
                fat: +formData.fat,
                sodium: +formData.sodium
            }

            if (!validateData(toNumbers, 'mealEntry')) return

            fetch('http://localhost:5000/api/mealEntries', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(toNumbers)
            })
            .then(res => {
                if (!res.ok) {
                    return res.json()
                                .then(json => {throw new Error(json.error)})
                }
                return res.json()
            }) 
            .then(json => setMealEntries(previous => [
                ...previous,
                json
            ]))
            
            toggleQuickAdd()
        }

    return (
        <form className='form quickAddForm' onSubmit={handleSubmit}>
            <button type='button' className='redX closeFormX quickAddX' onClick={toggleQuickAdd}>×</button>
            <div className='foodFormField'>
                <label htmlFor='name'>Name</label>
                <input type='text' id='name' name='name' value={formData.name} onChange={handleChange} required minLength='1' maxLength='19'></input>
                <label htmlFor='cal'>Calories</label>
                <input type='number' id='cal' name='cal' value={formData.cal} onChange={handleChange} min='0' step='any'></input>
                <label htmlFor='protein'>Protein (g)</label>
                <input type='number' id='protein' name='protein' value={formData.protein} onChange={handleChange} min='0' step='any'></input>
                <label htmlFor='carb'>Carbs (g)</label>
                <input type='number' id='carb' name='carb' value={formData.carb} onChange={handleChange} min='0' step='any'></input>
                <label htmlFor='fat'>Fat (g)</label>
                <input type='number' id='fat' name='fat' value={formData.fat} onChange={handleChange} min='0' step='any'></input>
                <label htmlFor='sodium'>Sodium (mg)</label>
                <input type='number' id='sodium' name='sodium' value={formData.sodium} onChange={handleChange} min='0' step='any'></input>
            </div>
            
            <button className='formBtn formBtnFood'>
                Submit
            </button>
        </form>
    )
}

export default QuickAddForm