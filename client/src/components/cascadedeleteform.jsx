const CascadeDeleteForm = ({ myMeals, myFoods, handleToggleForm, linkedFoodId, linkedMeals, handleSetMyFoods, handleSetMyMeals, postCascadeFoodDelete }) => {
    const allLinkedMeals = linkedMeals.map(meal => {
        return <li key={meal.id} className='cascadeDeleteItems'>{meal.name}</li>
    })
    
    const foodName = myFoods.find(item => item.id === linkedFoodId).name
    console.log('LINKED FOOD NAME AND ID:', foodName, linkedFoodId)
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

        // handleSetMyMeals(updated, true)
        // postCascadeFoodDelete(linkedFoodId)
        
    }
    //CREATE A DEDICATED POST-CASCADE FOOD DELETE FUNCTION THAT BYPASSES THE LINKEDMEALS DEPENDENCY CHECK
    const deleteMeals = () => {
        const filtered = myMeals.filter(meal => !meal.ingredients.some(item => item.foodId === linkedFoodId))
        handleSetMyMeals(filtered, true)

        handleToggleForm('cascadeDelete')
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
                <button className='formBtn formBtnCD' onClick={deleteMeals}>
                    Remove all associated meals.
                </button>
            </div>
        </div>
        
    )
}

export default CascadeDeleteForm