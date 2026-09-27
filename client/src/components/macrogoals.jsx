import { useState, useContext } from 'react'
import { UserContext } from '../context/usercontext'

const MacroGoals = ({ handleToggleSettingsForm }) => {
    const { currentUser, setCurrentUser } = useContext(UserContext)

    const [formData, setFormData] = useState({
        cal: currentUser.calGoal,
        protein: currentUser.proteinGoal,
        carb: currentUser.carbGoal, 
        fat: currentUser.fatGoal,
        sodium: currentUser.sodiumGoal,
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

        const updatedGoals = {
            calGoal: +formData.cal,
            proteinGoal: +formData.protein,
            carbGoal: +formData.carb,
            fatGoal: +formData.fat,
            sodiumGoal: +formData.sodium
        }

        fetch(`http://localhost:5000/api/users/${currentUser.id}`, {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedGoals)
        })
        .then(res => {
            if (!res.ok) {
                return res.json()
                    .then(json => {
                        throw new Error(json.error)
                    })
            }

            return res.json()
        })
        .then(updatedUser => {
            setCurrentUser(updatedUser)
            handleToggleSettingsForm()
        })
        .catch(error => {
            console.error(error.message)
        })
    }
    return (
        <form className='form editMacroGoals' onSubmit={handleSubmit}>
            <button type='button' className='redX closeFormX' onClick={handleToggleSettingsForm}>×</button>
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
            
            <button className='formBtn formBtnSettings'>
                Save Edit
            </button>
        </form>
    )
}

export default MacroGoals