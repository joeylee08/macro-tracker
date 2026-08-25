import { foods, meals } from "../data/dummy";
import Meals from "../components/meals"
import MyCollection from "../components/mycollection"
import CreateFoodForm from "../components/createfoodform"
import CreateMealForm from "../components/createmealform"
import { useState } from "react";


const currentUserId = 1

const Menu = () => {
    const [myFoods, setMyFoods] = useState(foods.filter(item => item.userId === currentUserId))
    const handleSetMyFoods = (newFood) => {
        setMyFoods([...myFoods, newFood])
    }

    const [myMeals, setMyMeals] = useState(meals.filter(item => item.userId === currentUserId))
    const handleSetMyMeals = (newMeal) => {
        setMyMeals([...myMeals, newMeal])
    }

    return (
        <div id='menuPage'>
            <h1>Your Personalized Menu</h1>
            <Meals currentUserId={currentUserId} myMeals={myMeals} myFoods={myFoods} onAddMeal={handleSetMyMeals}/>
            <MyCollection myFoods={myFoods} />
            <CreateFoodForm onAddFood={handleSetMyFoods} currentUserId={currentUserId}/>
            <CreateMealForm onAddMeal={handleSetMyFoods} currentUserId={currentUserId}/>
        </div>
    )
}

export default Menu