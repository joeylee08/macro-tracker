import { UserContext } from '../context/usercontext'
import { useContext } from 'react'
import { API_URL } from '../util/helpers'

const CascadeDeleteForm = ({ myFoods, handleToggleForm, linkedFoodId, linkedMeals, handleSetMyFoods, handleSetMyMeals, handleMealUpdate }) => {
    const { authFetch } = useContext(UserContext)
    
    const allLinkedMeals = linkedMeals.map(meal => {
        return <li key={meal.id} className='cascadeDeleteItems'>{meal.name}</li>
    })
    
    const foodName = myFoods.find(item => item.id === linkedFoodId)?.name

    const deleteIngredient = () => {
        authFetch(`${API_URL}/api/foods/${linkedFoodId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => {
                if (!res.ok) {
                    return res.json()
                                .then(json => {throw new Error(json.error)})
                }
                else return res.json()
            }) 
            .then((json) => {
                const deletedFoodId = +json.deletedFoodId
                const deletedFood = myFoods.find(food => food.id === deletedFoodId)
                const emptyMealIds = json.emptyMealIds
                const remainingMeals = json.remainingMeals

                //pass the food or meal(s) to remove from React State
                handleSetMyFoods(deletedFood, true)
                handleSetMyMeals(emptyMealIds, true)
                handleMealUpdate(remainingMeals)
                handleToggleForm('cascadeDelete')
            })
            .catch(error => console.error(error.message))
    }

    const deleteFoodAndMeals = () => {
        authFetch(`${API_URL}/api/foods/${linkedFoodId}/meals`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => {
                if (!res.ok) {
                    return res.json()
                                .then(json => {throw new Error(json.error)})
                }
                else return res.json()
            }) 
            .then(json => {
                const deletedFood = myFoods.find(food => food.id === json.foodId)
                const deletedMealIds = json.deletedMeals
                handleSetMyFoods(deletedFood, true)
                handleSetMyMeals(deletedMealIds, true)
                handleToggleForm('cascadeDelete')
            })
            .catch(error => console.error(error.message))
    }

    return (
        <div className='form cascadeDeleteForm'>
            <button type='button' className='redX closeFormX cascadeDeleteX' onClick={() => handleToggleForm('cascadeDelete')}>×</button>
            <div className='cascadeDeleteChild'>
                <h3>Warning!</h3>
                <p><span style={{ color: 'green'}}>{foodName}</span> is currently used in the following:</p>
            </div>
            <div className='cascadeDeleteChild2'>
                <ul id='linkedMealsList'>
                    {allLinkedMeals}
                </ul>
            </div>
            <div className='cascadeDeleteBtnBox'>
                <button className='formBtn formBtnCD' onClick={deleteIngredient}>
                    Remove item everywhere.
                </button>
                <button className='formBtn formBtnCD' onClick={deleteFoodAndMeals}>
                    Remove all linked meals.
                </button>
            </div>
        </div>
        
    )
}

export default CascadeDeleteForm