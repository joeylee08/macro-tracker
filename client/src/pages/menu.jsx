import Meals from "../components/meals"
import Foods from "../components/foods"
import CreateFoodForm from "../components/createfoodform"
import CreateMealForm from "../components/createmealform"
import CascadeDeleteForm from "../components/cascadedeleteform"
import { useState } from "react";
import { useContext } from 'react'
import { UserContext } from '../context/usercontext'


const Menu = ({ myFoods, myMeals, setMyFoods, setMyMeals }) => {  
    const { currentUser } = useContext(UserContext)

    const handleSetMyFoods = (newFood) => {
        if (isEditing) {
            const editedFoods = myFoods.map(item => item.id === newFood.id ? newFood : item)
            setMyFoods(editedFoods)
            setIsEditing(false)
            handleToggleForm('food')
            setSelectedItem(null)
            return
        }
        setMyFoods([...myFoods, newFood])
        handleToggleForm('food')
    }
   
    const handleSetMyMeals = (newMeal, fromCascade) => {
        if (isEditing) {
            const editedMeals = myMeals.map(item => item.id === newMeal.id ? newMeal : item)
            setMyMeals(editedMeals)
            setIsEditing(false)
            handleToggleForm('meal')
            setSelectedItem(null)
            return
        }
        if (fromCascade) {
            setMyMeals(newMeal)
        } else {
            setMyMeals([...myMeals, newMeal])
            handleToggleForm('meal')
        }
    }

    const [toggleFoodForm, setToggleFoodForm] = useState(false)
    const [toggleMealForm, setToggleMealForm] = useState(false)
    const [toggleCascadeDelete, setToggleCascadeDelete] = useState(false)

    const handleToggleForm = (formType) => {
        if (isEditing) setIsEditing(false)

        if (formType === 'food') setToggleFoodForm(bool => !bool)
        else if (formType === 'meal') setToggleMealForm(bool => !bool)
        else if (formType === 'cascadeDelete') setToggleCascadeDelete(bool => !bool)
    }

    const [selectedItem, setSelectedItem] = useState(null)

    const [isEditing, setIsEditing] = useState(false)
    const handleIsEditing = (formType, editState, itemId) => {
        handleToggleForm(formType)
        setIsEditing(editState)

        const itemToEdit = formType === 'food' ? myFoods.find(item => item.id === itemId) : myMeals.find(item => item.id === itemId)
        setSelectedItem(itemToEdit)
    }

    const [linkedMeals, setLinkedMeals] = useState([])
    const [linkedFoodId, setLinkedFoodId] = useState(0)

    const handleDelete = (itemType, itemId) => {
        if (itemType === 'food') {
            const linkedToFood = myMeals.filter(meal => meal.ingredients.find(item => item.foodId === itemId))

            if (linkedToFood.length === 0) {
                const modified = myFoods.filter(item => item.id !== itemId)
                setMyFoods(modified)
            } else {
                setLinkedFoodId(itemId)
                setLinkedMeals(linkedToFood) 
                handleToggleForm('cascadeDelete')                    
            }  
        } else if (itemType === 'meal') {
            const modified = myMeals.filter(item => item.id !== itemId)
            setMyMeals(modified)
        }
    }

    const postCascadeFoodDelete = (foodId) => {
        const updatedFoods = myFoods.filter(item => item.id !== foodId)
        setMyFoods(updatedFoods)
    }

    return (
        <div className='mainPage'>
            {(toggleFoodForm || toggleMealForm || toggleCascadeDelete) && <div className='screenBlock'></div>}
            <div className='headerBox'>
                <h1>Your Personalized Menu</h1>
            </div>
            <div className='buttonDivMenu'>
                <button className='formBtn formBtnMenu' onClick={() => handleToggleForm('meal')}>Create New Meal</button>
                <button className='formBtn formBtnMenu' onClick={() => handleToggleForm('food')}>Add Ingredient</button>
            </div>
            <Meals myMeals={myMeals} myFoods={myFoods} handleIsEditing={handleIsEditing} handleDelete={handleDelete}/>
            <Foods myFoods={myFoods} handleIsEditing={handleIsEditing} handleDelete={handleDelete}/>
            {toggleFoodForm && <CreateFoodForm onAddFood={handleSetMyFoods} handleToggleForm={handleToggleForm} currentUser={currentUser} isEditing={isEditing} selectedItem={selectedItem}/>}
            {toggleMealForm && <CreateMealForm onAddMeal={handleSetMyMeals} handleToggleForm={handleToggleForm} currentUser={currentUser} isEditing={isEditing} selectedItem={selectedItem} myFoods={myFoods}/>}
            {toggleCascadeDelete && <CascadeDeleteForm myMeals={myMeals} myFoods={myFoods} handleToggleForm={handleToggleForm} linkedFoodId={linkedFoodId} linkedMeals={linkedMeals} handleSetMyMeals={handleSetMyMeals} postCascadeFoodDelete={postCascadeFoodDelete}/>}
        </div>
    )
}

export default Menu