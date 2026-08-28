import MealCard from "./mealcard"

const Meals = ({ myMeals, myFoods, handleToggleForm, currentUserId }) => {
    const renderedMeals = myMeals
                            .filter(item => item.userId === currentUserId)
                            .sort((a, b) => a.name.localeCompare(b.name))
                            .map(item => <MealCard key={item.id} meal={item} myFoods={myFoods}/>)
                            
    return (
        <div className='myFoods' id='pinned'>
            <div className='myFoods' id='buttonDiv'>
                <button className='createBtn' id='createMealBtn' onClick={() => handleToggleForm('meal')}>CREATE NEW MEAL</button>
                <button className='createBtn' id='addItemBtn' onClick={() => handleToggleForm('food')}>ADD FOOD ITEM</button>
            </div>
            <div className='myFoods' id='mealsDiv'>
                {renderedMeals}
            </div>
        </div>
    )
}

export default Meals