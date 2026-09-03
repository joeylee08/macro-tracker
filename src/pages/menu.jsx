import { foods, meals } from "../data/dummy";
import Meals from "../components/meals"
import Foods from "../components/foods"
import CreateFoodForm from "../components/createfoodform"
import CreateMealForm from "../components/createmealform"
import { useState } from "react";

const currentUserId = 1

const Menu = () => {
    const [myFoods, setMyFoods] = useState(foods.filter(item => item.userId === currentUserId))
    const handleSetMyFoods = (newFood) => {
        setMyFoods([...myFoods, newFood])
        handleToggleForm('food')
    }

    const [myMeals, setMyMeals] = useState(meals.filter(item => item.userId === currentUserId))
    const handleSetMyMeals = (newMeal) => {
        setMyMeals([...myMeals, newMeal])
        handleToggleForm('meal')
    }

    const [toggleFoodForm, setToggleFoodForm] = useState(false)
    const [toggleMealForm, setToggleMealForm] = useState(false)

    const handleToggleForm = (formType) => {
        if (formType === 'food') setToggleFoodForm(bool => !bool)
        else if (formType === 'meal') setToggleMealForm(bool => !bool)
    }

    //for manually assigning DB IDs to dummy data
    const nextFoodIndex = Math.max(...myFoods.map(food => food.id), 0) + 1
    const nextMealIndex = Math.max(...myMeals.map(meal => meal.id), 0) + 1

    return (
        <div id='menuPage'>
            <div className='headerBox'>
                <h1>Your Personalized Menu</h1>
            </div>
            <Meals currentUserId={currentUserId} myMeals={myMeals} myFoods={myFoods} handleToggleForm={handleToggleForm}/>
            <Foods myFoods={myFoods} />
            {toggleFoodForm && <CreateFoodForm onAddFood={handleSetMyFoods} handleToggleForm={handleToggleForm} currentUserId={currentUserId} nextFoodIndex={nextFoodIndex}/>}
            {toggleMealForm && <CreateMealForm onAddMeal={handleSetMyMeals} handleToggleForm={handleToggleForm} currentUserId={currentUserId} nextMealIndex={nextMealIndex} myFoods={myFoods}/>}
        </div>
    )
}

export default Menu