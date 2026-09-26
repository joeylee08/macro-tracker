const CascadeDeleteForm = ({ myMeals, myFoods, handleToggleForm, linkedFoodId, linkedMeals, handleSetMyFoods, handleSetMyMeals }) => {
    const allLinkedMeals = linkedMeals.map(meal => {
        return <li key={meal.id} className='cascadeDeleteItems'>{meal.name}</li>
    })
    
    const foodName = myFoods.find(item => item.id === linkedFoodId)?.name

    const deleteIngredient = () => {
        fetch(`http://localhost:5000/api/foods/${linkedFoodId}`, {
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

                //pass the food or meal(s) to remove from React State
                handleSetMyFoods(deletedFood, true)
                handleSetMyMeals(emptyMealIds, true)
                handleToggleForm('cascadeDelete')
            })
            .catch(error => console.error(error.message))
    }

    const deleteFoodAndMeals = () => {
        fetch(`http://localhost:5000/api/foods/${linkedFoodId}/meals`, {
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
                    Remove item from all meals.
                </button>
                <button className='formBtn formBtnCD' onClick={deleteFoodAndMeals}>
                    Remove all associated meals.
                </button>
            </div>
        </div>
        
    )
}

export default CascadeDeleteForm