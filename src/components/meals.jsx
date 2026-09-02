import MealCard from "./mealcard"

const Meals = ({ myMeals, myFoods, handleToggleForm, currentUserId }) => {
    const renderedMeals = myMeals
                            .filter(item => item.userId === currentUserId)
                            .sort((a, b) => a.name.localeCompare(b.name))
                            .map(item => <MealCard key={item.id} meal={item} myFoods={myFoods}/>)
                            
    return (
        <div className='myFoods'>
            <div id='buttonDiv'>
                <button className='createBtn' id='createMealBtn' onClick={() => handleToggleForm('meal')}>Create New Meal</button>
                <button className='createBtn' id='addItemBtn' onClick={() => handleToggleForm('food')}>Add Ingredient</button>
            </div>
            <div className='myFoodsChild'>
                {renderedMeals}
            </div>
        </div>
    )
}

export default Meals