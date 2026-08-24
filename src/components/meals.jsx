const Meals = ({ myMeals, myFoods, onAddMeal, currentUserId }) => {
    const renderedMeals = myMeals
                            .filter(item => item.userId === currentUserId)
                            .sort((a, b) => a.name.localeCompare(b.name))
                            
    return (
        <div className='myFoods' id='pinned'>
                <button className='createMealBtn' onClick={onAddMeal}>Create New Meal</button>
            
        </div>
    )
}

export default Meals