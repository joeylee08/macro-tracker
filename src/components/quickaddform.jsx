import { validateData } from "../util/helpers"

const QuickAddForm = ({ currentUser, myMealEntries, toggleQuickAdd }) => {
    const nextEntryIndex = myMealEntries.length
                                    ? Math.max(...myMealEntries.map(entry => entry.id)) + 1
                                    : 1

    const [formData, setFormData] = useState({
        id: nextEntryIndex,
        userId: currentUser.id,
        name: '',
        dateAndTime: new Date().toISOString(),
        ingredients: [
            {   name: formData.name,
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
    
        const handleSubmit = () => {
            if (!validateData(formData, 'mealEntryModel')) return

        }

    return (
        <form className='form' onSubmit={handleSubmit}>
            <button type='button' className='closeForm' onClick={toggleQuickAdd}>×</button>
            <div className='foodFormField'>
                <label htmlFor='name'>Name</label>
                <input type='text' id='name' name='name' value={formData.name} onChange={handleChange} required minLength='1' maxLength='19'></input>
                <label htmlFor='servingSize'>Serving Size</label>
                <input type='number' id='servingSize' name='servingSize' value={formData.servingSize} onChange={handleChange} required min='.01' step='any'></input>
                <label htmlFor='servingUnit'>Serving Unit</label>
                <select id='servingUnit' name='servingUnit' value={formData.servingUnit} onChange={handleChange}>
                    <option value=''>Select Unit</option>
                    <option value='oz'>oz</option>
                    <option value='g'>g</option>
                    <option value='tbsp'>tbsp</option>
                    <option value='tsp'>tsp</option>
                    <option value='cup'>cup</option>
                    <option value='piece'>piece</option>
                </select>
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
            
            <button id='formBtnFood'>
                {isEditing ? 'Save Edit' : 'Submit'}
            </button>
        </form>
    )
}

export default QuickAddForm