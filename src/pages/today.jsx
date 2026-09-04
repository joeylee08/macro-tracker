import { useState } from "react";
import { mealEntries } from "../data/dummy";
import MacroChart from "../components/macrochart";

const currentUserId = 1

const Today = ({ currentUserId, myFoods, myMeals }) => {
    const [myMealEntries, setMealEntries] = useState(mealEntries.filter(item => item.userId === currentUserId))

    return (
        <div className='mainPage'>
            <div className='headerBox'>
                <h1>Your Daily Totals</h1>
            </div>
            <MacroChart myFoods={myFoods} myMeals={myMeals} myMealEntries={myMealEntries}/>
        </div>
    )
}

export default Today