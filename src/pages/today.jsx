import { useState } from "react";
import { mealEntries } from "../data/dummy";
import MacroChart from "../components/macrochart";
import MealSelect from "../components/mealselect";
import DailyMealCard from "../components/dailymealcard";

const Today = ({ currentUser, myFoods, myMeals }) => {
    const [myMealEntries, setMealEntries] = useState(mealEntries.filter(entry => entry.userId === currentUser.id))
    const handleMealEntries = (meal, action) => {

    }

    const dailyMealCards = myMealEntries.map(entry => {
        const selectedMeal = myMeals.find(meal => meal.id === entry.mealId)
        return <DailyMealCard meal={selectedMeal} myFoods={myFoods} handleMealEntries={handleMealEntries}/>
    })

    return (
        <div className='mainPage'>
            <div className='headerBox'>
                <h1>Your Daily Totals</h1>
            </div>
            <div className='myGoals'>
                <MacroChart currentUser={currentUser} myFoods={myFoods} myMeals={myMeals} myMealEntries={myMealEntries}/>
            </div>
            <div className='headerBox'>
                <h1>Your Daily Dashboard</h1>
            </div>
            <div className='myGoals2' id='mealsDash'>
                <MealSelect myMeals={myMeals} myMealEntries={myMealEntries} />
            </div>
            <div className='myGoals3'>
                {dailyMealCards}
            </div>
        </div>
    )
}

export default Today