const CascadeDeleteForm = ({ myMeals, myFoods, handleToggleForm, linkedFoodId, linkedMeals, handleSetMyMeals, handleDelete }) => {
    const allLinkedMeals = linkedMeals.map(meal => {
        return <li key={meal.id} className='cascadeDeleteItems'>{meal.name}</li>
    })
    
    const foodName = myFoods.find(item => item.id === linkedFoodId).name

    const deleteIngredient = () => {
        const updated = linkedMeals.map(meal => ({
            ...meal,
            ingredients: meal.ingredients.filter(item => item.foodId !== linkedFoodId)
        })).filter(meal => meal.ingredients.length !== 0)

        handleSetMyMeals(updated)
        handleDelete(event, 'food', linkedFoodId)
    }

    const deleteMeals = (event, itemType, itemId) => {

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