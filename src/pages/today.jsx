import { useState } from "react";
import { mealEntries } from "../data/dummy";
import MacroChart from "../components/macrochart";

const Today = ({ currentUser, myFoods, myMeals }) => {
    const [myMealEntries, setMealEntries] = useState(mealEntries.filter(item => item.userId === currentUser.id))

    return (
        <div className='mainPage'>
            <div className='headerBox'>
                <h1>Your Daily Totals</h1>
            </div>
            <div className='myGoals'>
                <MacroChart currentUser={currentUser} myFoods={myFoods} myMeals={myMeals} myMealEntries={myMealEntries}/>
                <div className='myGoalsChild'>

                </div>
            </div>
        </div>
    )
}

export default Today