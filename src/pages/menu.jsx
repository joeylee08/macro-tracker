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
        handleToggleFoodForm()
    }

    const [myMeals, setMyMeals] = useState(meals.filter(item => item.userId === currentUserId))
    const handleSetMyMeals = (newMeal) => {
        setMyMeals([...myMeals, newMeal])
        handleToggleMealForm()
    }

    const [toggleFoodForm, setToggleFoodForm] = useState(false)
    const handleToggleFoodForm = () => {
        setToggleFoodForm(bool => !bool)
    }

    const [toggleMealForm, setToggleMealForm] = useState(false)
    const handleToggleMealForm = () => {
        setToggleMealForm(bool => !bool)
    }

    return (
        <div id='menuPage'>
            <h1>Your Personalized Menu</h1>
            <Meals currentUserId={currentUserId} myMeals={myMeals} myFoods={myFoods} handleToggleFoodForm={handleToggleFoodForm} handleToggleMealForm={handleToggleMealForm} onAddMeal={handleSetMyMeals}/>
            <MyCollection myFoods={myFoods} />
            {toggleFoodForm && <CreateFoodForm onAddFood={handleSetMyFoods} currentUserId={currentUserId} nextIndex={myFoods.length - 1}/>}
            {toggleMealForm && <CreateMealForm onAddMeal={handleSetMyMeals} currentUserId={currentUserId}/>}
        </div>
    )
}

export default Menu