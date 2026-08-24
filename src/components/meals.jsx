import MealCard from "./mealcard"

const Meals = ({ myMeals, myFoods, onAddMeal, currentUserId }) => {
    const renderedMeals = myMeals
                            .filter(item => item.userId === currentUserId)
                            .sort((a, b) => a.name.localeCompare(b.name))
                            .map(item => <MealCard key={item.id} meal={item} myFoods={myFoods}/>)
                            
    return (
        <div className='myFoods' id='pinned'>
                <button className='createMealBtn' onClick={onAddMeal}>Create New Meal</button>
                {renderedMeals}
        </div>
    )
}

export default Meals