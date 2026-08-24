import MealCard from "./mealcard"

const Meals = ({ myMeals, myFoods, onAddMeal, currentUserId }) => {
    const renderedMeals = myMeals
                            .filter(item => item.userId === currentUserId)
                            .sort((a, b) => a.name.localeCompare(b.name))
                            .map(item => <MealCard key={item.id} meal={item} myFoods={myFoods}/>)
                            
    return (
        <div className='myFoods' id='pinned'>
            <div className='myFoods' id='buttonDiv'>
                <button className='createBtn' id='createMealBtn' onClick={onAddMeal}>CREATE NEW MEAL</button>
                <button className='createBtn' id='addItemBtn' onClick={() => console.log('penis')}>ADD FOOD ITEM</button>
            </div>
            <div className='myFoods' id='mealsDiv'>
                {renderedMeals}
            </div>
        </div>
    )
}

export default Meals