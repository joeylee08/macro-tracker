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
        if (isEditing) {
            const editedFoods = myFoods.map(item => item.id === newFood.id ? newFood : item)
            setMyFoods(editedFoods)
            setIsEditing(false)
            handleToggleForm('food')
            return
        }
        setMyFoods([...myFoods, newFood])
        handleToggleForm('food')
    }

    const [myMeals, setMyMeals] = useState(meals.filter(item => item.userId === currentUserId))
    const handleSetMyMeals = (newMeal) => {
        if (isEditing) {
            const editedMeals = myMeals.map(item => item.id === newMeal.id ? newMeal : item)
            setMyFoods(editedMeals)
            setIsEditing(false)
            handleToggleForm('meal')
            return
        }
        setMyMeals([...myMeals, newMeal])
        handleToggleForm('meal')
    }

    const [toggleFoodForm, setToggleFoodForm] = useState(false)
    const [toggleMealForm, setToggleMealForm] = useState(false)

    const handleToggleForm = (formType) => {
        if (formType === 'food') setToggleFoodForm(bool => !bool)
        else if (formType === 'meal') setToggleMealForm(bool => !bool)
    }

    const [selectedItem, setSelectedItem] = useState(null)

    const [isEditing, setIsEditing] = useState(false)
    const handleIsEditing = (formType, editState, itemId) => {
        handleToggleForm(formType)
        setIsEditing(editState)

        const itemToEdit = formType === 'food' ? myFoods.find(item => item.id === itemId) : myMeals.find(item => item.id === itemId)
        setSelectedItem(itemToEdit)
    }

    //for manually assigning DB IDs to dummy data
    const nextFoodIndex = Math.max(...myFoods.map(food => food.id), 0) + 1
    const nextMealIndex = Math.max(...myMeals.map(meal => meal.id), 0) + 1

    return (
        <div id='menuPage'>
            <div className='headerBox'>
                <h1>Your Personalized Menu</h1>
            </div>
            <div id='buttonDiv'>
                <button className='createBtn' id='createMealBtn' onClick={() => handleToggleForm('meal')}>Create New Meal</button>
                <button className='createBtn' id='addItemBtn' onClick={() => handleToggleForm('food')}>Add Ingredient</button>
            </div>
            <Meals currentUserId={currentUserId} myMeals={myMeals} myFoods={myFoods} handleIsEditing={handleIsEditing}/>
            <Foods myFoods={myFoods} handleIsEditing={handleIsEditing}/>
            {toggleFoodForm && <CreateFoodForm onAddFood={handleSetMyFoods} handleToggleForm={handleToggleForm} currentUserId={currentUserId} nextFoodIndex={nextFoodIndex} isEditing={isEditing} selectedItem={selectedItem}/>}
            {toggleMealForm && <CreateMealForm onAddMeal={handleSetMyMeals} handleToggleForm={handleToggleForm} currentUserId={currentUserId} nextMealIndex={nextMealIndex} isEditing={isEditing} selectedItem={selectedItem} myFoods={myFoods}/>}
        </div>
    )
}

export default Menu