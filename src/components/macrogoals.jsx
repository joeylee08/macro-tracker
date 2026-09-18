import { useState, useContext } from 'react'
import { UserContext } from '../context/usercontext'

const MacroGoals = ({ handleToggleForm }) => {
    const { currentUser } = useContext(UserContext)

    const [formData, setFormData] = useState(currentUser.macroGoals)

    const handleChange = (event) => {
        const { name, value } = event.target
    
        setFormData(previous => ({
            ...previous,
            [name]: value
        }))
    }

    const handleSubmit = () => {
        console.log('penis')
    }
    return (
        <form className='form' id='editMacroGoals' onSubmit={handleSubmit}>
            <button type='button' className='closeForm' onClick={handleToggleForm}>×</button>
            <div className='foodFormField'>
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
            
            <button id='formBtnSettings'>
                Save Edit
            </button>
        </form>
    )
}

export default MacroGoals