import MealCard from "./mealcard"

const Meals = ({ myMeals, myFoods, currentUserId, handleIsEditing, handleDelete }) => {
    const renderedMeals = myMeals
                            .filter(item => item.userId === currentUserId)
                            .sort((a, b) => a.name.localeCompare(b.name))
                            .map(item => <MealCard key={item.id} meal={item} myFoods={myFoods} handleIsEditing={handleIsEditing} handleDelete={handleDelete}/>)
                            
    return (
        <div className='myFoods'>
            <div className='myFoodsChild'>
                {renderedMeals}
            </div>
            <hr className='dividerLine'></hr>
        </div>
    )
}

export default Meals