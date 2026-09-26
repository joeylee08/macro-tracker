import Meals from "../components/meals"
import Foods from "../components/foods"
import CreateFoodForm from "../components/createfoodform"
import CreateMealForm from "../components/createmealform"
import CascadeDeleteForm from "../components/cascadedeleteform"
import { useState } from "react";
import { useContext } from 'react'
import { UserContext } from '../context/usercontext'
import { MoveDiagonal2 } from "lucide-react"


const Menu = ({ myFoods, myMeals, setMyFoods, setMyMeals }) => {  
    const { currentUser } = useContext(UserContext)

    const handleSetMyFoods = (chosenFood, fromCascade) => {
        // if (isEditing) {
        //     //replace old food with new version of that food
        //     const editedFoods = myFoods.map(item => item.id === newFood.id ? newFood : item)
        //     setMyFoods(editedFoods)
        //     setIsEditing(false)
        //     handleToggleForm('food')
        //     setSelectedItem(null)
        //     return
        // }
        //cascadeDelete will pass a food to delete, not a food to add
        if (fromCascade) {
            setMyFoods(previous => (
                previous.filter(food => food.id !== chosenFood.id)
            ))
            return
        }
        setMyFoods([...myFoods, chosenFood])
        handleToggleForm('food')
    }
   
    const handleSetMyMeals = (mealOrArray, fromCascade) => {
        // if (isEditing) {
        //     //replace old meal with new version of that meal
        //     //PATCH
        //     const editedMeals = myMeals.map(item => item.id === newMeal.id ? newMeal : item)
        //     setMyMeals(editedMeals)
        //     setIsEditing(false)
        //     handleToggleForm('meal')
        //     setSelectedItem(null)
        //     return
        // }
        if (fromCascade) {
            //cascadeDelete will pass a meal to remove, not a meal to add
            setMyMeals(previous =>
                Array.isArray(mealOrArray)
                    ? previous.filter(meal => !mealOrArray.includes(meal.id))
                    : previous.filter(meal => meal.id !== mealOrArray)
            )
            return
        }
        setMyMeals([...myMeals, mealOrArray])
        handleToggleForm('meal')
    }

    // Updates React State with cascade-modified meals
    const handleMealUpdate = (modifiedMeals) => {
        const mealIds = modifiedMeals.map(meal => meal.id)
        
        setMyMeals(previous => (
            previous.map(meal => (
                mealIds.includes(meal.id)
                    ? modifiedMeals.find(item => item.id === meal.id) 
                    : meal
            ))
        ))
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
            const response = fetch(`http://localhost:5000/api/foods/${itemId}/meals`)
                                .then(res => {
                                    if (!res.ok) {
                                        return res.json()
                                                    .then(json => {throw new Error(json.error)})
                                    }
                                    return res.json()
                                })
                                .then(json => {
                                    const linkedToFood = json
                                    if (linkedToFood.length === 0) {
                                        return fetch(`http://localhost:5000/api/foods/${itemId}`, {
                                            method: 'DELETE',
                                            headers: {
                                                'Content-Type': 'application/json'
                                            }
                                        })
                                        .then(res => {
                                            if (!res.ok) {
                                                return res.json()
                                                            .then(json => {throw new Error(json.error)})
                                            }
                                            else return res.json()
                                        }) 
                                        .then(json => console.log(json.message))
                                        .then(() => setMyFoods(previous => previous.filter(item => item.id !== itemId)))
                                    } else {
                                        setLinkedFoodId(itemId)
                                        setLinkedMeals(linkedToFood) 
                                        handleToggleForm('cascadeDelete')                    
                                    }
                                })
                                .catch(error => console.error(error.message))
        } else if (itemType === 'meal') {
            fetch(`http://localhost:5000/api/meals/${itemId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => {
                if (!res.ok) {
                    return res.json()
                                .then(json => {throw new Error(json.error)})
                }
                else return res.json()
            }) 
            .then(json => console.log(json.message))
            .then(() => setMyMeals(previous => previous.filter(item => item.id !== itemId)))
            .catch(error => console.error(error.message))
        }
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
            {toggleCascadeDelete && <CascadeDeleteForm myMeals={myMeals} myFoods={myFoods} handleToggleForm={handleToggleForm} linkedFoodId={linkedFoodId} linkedMeals={linkedMeals} handleSetMyFoods={handleSetMyFoods} handleSetMyMeals={handleSetMyMeals} handleMealUpdate={handleMealUpdate}/>}
        </div>
    )
}

export default Menu