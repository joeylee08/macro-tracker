const CascadeDeleteForm = ({ myMeals, myFoods, setToggleCascadeDelete, linkedFoodId, linkedMeals, handleSetMyMeals, postCascadeFoodDelete }) => {
    const allLinkedMeals = linkedMeals.map(meal => {
        return <li key={meal.id} className='cascadeDeleteItems'>{meal.name}</li>
    })
    
    const foodName = myFoods.find(item => item.id === linkedFoodId).name

    const deleteIngredient = () => {
        const updated = myMeals.map(meal => ({
            ...meal,
            ingredients: meal.ingredients.filter(item => item.foodId !== linkedFoodId)
        })).filter(meal => meal.ingredients.length !== 0)

        handleSetMyMeals(updated, true)
        postCascadeFoodDelete(linkedFoodId)
        setToggleCascadeDelete()
    }
    //CREATE A DEDICATED POST-CASCADE FOOD DELETE FUNCTION THAT BYPASSES THE LINKEDMEALS DEPENDENCY CHECK
    const deleteMeals = () => {
        const filtered = myMeals.filter(meal => !meal.ingredients.some(item => item.foodId === linkedFoodId))
        handleSetMyMeals(filtered, true)
        postCascadeFoodDelete(linkedFoodId)
        setToggleCascadeDelete()
    }

    return (
        <div className='form' id='cascadeDeleteForm'>
            <button type='button' className='closeForm' id='cascadeDeleteCloseBtn' onClick={() => handleToggleForm('cascadeDelete')}>×</button>
            <div className='cascadeDeleteChild'>
                <h3>Warning!</h3>
                <p><span style={{ color: 'green'}}>{foodName}</span> is currently used in the following:</p>
            </div>
            <div className='cascadeDeleteChild2'>
                <ul id='linkedMealsList'>
                    {allLinkedMeals}
                </ul>
            </div>
            <div className='btnContainer' id='cascadeDeleteBtns'>
                <button className='formBtnCD' onClick={deleteIngredient}>
                    Remove item from all meals.
                </button>
                <button className='formBtnCD' onClick={deleteMeals}>
                    Remove all associated meals.
                </button>
            </div>
        </div>
        
    )
}

export default CascadeDeleteForm