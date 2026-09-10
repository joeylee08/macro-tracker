import MealCard from "./mealcard"

const Meals = ({ myMeals, myFoods, currentUser, handleIsEditing, handleDelete }) => {
    const renderedMeals = myMeals
                            .filter(item => item.userId === currentUser.id)
                            .sort((a, b) => a.name.localeCompare(b.name))
                            .map(item => <MealCard key={item.id} meal={item} myFoods={myFoods} handleIsEditing={handleIsEditing} handleDelete={handleDelete}/>)
                            
    return (
        <div className='myFoods'>
            <div className='myFoodsChild'>
                {renderedMeals}
            </div>
            <hr className='dividerLine1'></hr>
        </div>
    )
}

export default Meals