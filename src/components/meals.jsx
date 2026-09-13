import MealCard from "./mealcard"
import { useContext } from 'react'
import { UserContext } from '../context/usercontext'

const Meals = ({ myMeals, myFoods, handleIsEditing, handleDelete }) => {
    const { currentUser } = useContext(UserContext)
    
    const renderedMeals = myMeals
                            .filter(item => item.userId === currentUser.id)
                            .sort((a, b) => a.name.localeCompare(b.name))
                            .map(item => <MealCard key={item.id} meal={item} myFoods={myFoods} handleIsEditing={handleIsEditing} handleDelete={handleDelete}/>)
                            
    return (
        <div className='myFoods'>
            <div className='myFoodsChild'>
                {renderedMeals.length === 0 ? <h1 id='dashboardPlaceholder'>Create your first meal.</h1> : renderedMeals}
            </div>
            <hr className='dividerLine1'></hr>
        </div>
    )
}

export default Meals