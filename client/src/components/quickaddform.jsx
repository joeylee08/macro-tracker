import { validateData } from "../util/helpers"
import { useState } from 'react'

const QuickAddForm = ({ currentUser, myMealEntries, setMealEntries, toggleQuickAdd }) => {
    const nextEntryIndex = myMealEntries.length
                                    ? Math.max(...myMealEntries.map(entry => entry.id)) + 1
                                    : 1

    const [formData, setFormData] = useState({
        id: nextEntryIndex,
        userId: currentUser.id,
        name: '',
        dateAndTime: new Date().toISOString(),
        ingredients: [
            {   name: 'quickAddItem',
                servingSize: 1,
                servingUnit: 'piece',
                units: 1,
                cal: '',
                protein: '',
                carb: '',
                fat: '',
                sodium: ''
            }]
        })
    
        const handleChange = (event) => {
            const { name, value } = event.target

            if (name === 'name') setFormData(previous => ({...previous, name: value}))
            else {
                setFormData(previous => ({
                    ...previous,
                    ingredients: [{
                        ...previous.ingredients[0],
                        [name]: value
                    }]
                }))
            }
        }
    
        const handleSubmit = (event) => {
            event.preventDefault()

            const toNumbers = {
                id: formData.id,
                userId: formData.userId,
                name: formData.name,
                dateAndTime: formData.dateAndTime,
                ingredients: [
                    {   name: 'quickAddItem',
                        servingSize: 1,
                        servingUnit: 'piece',
                        units: 1,
                        cal: +formData.ingredients[0].cal,
                        protein: +formData.ingredients[0].protein,
                        carb: +formData.ingredients[0].carb,
                        fat: +formData.ingredients[0].fat,
                        sodium: +formData.ingredients[0].sodium
                    }]
            }

            if (!validateData(toNumbers, 'mealEntry')) return

            setMealEntries(previous => [
                ...previous,
                toNumbers
            ])
            
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