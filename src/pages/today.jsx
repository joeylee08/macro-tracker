import { useState } from "react";
import { foods, meals, mealEntries } from "../data/dummy";
import Meals from "../components/meals"
import Foods from "../components/foods"
import MacroChart from "../components/macrochart";

const currentUserId = 1

const Today = ({ currentUserId }) => {
    const [myMeals, setMyMeals] = useState(meals.filter(item => item.userId === currentUserId))
    const [myMealEntries, setMealEntries] = useState(mealEntries.filter(item => item.userId === currentUserId))

    return (
        <div className='mainPage'>
            <div className='headerBox'>
                <h1>Your Daily Totals</h1>
            </div>
            <MacroChart myMealEntries={myMealEntries}/>
        </div>
    )
}

export default Today