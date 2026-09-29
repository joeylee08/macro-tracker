import Meals from "../components/meals"
import Foods from "../components/foods"
import CreateFoodForm from "../components/createfoodform"
import CreateMealForm from "../components/createmealform"
import CascadeDeleteForm from "../components/cascadedeleteform"
import { useState, useContext } from "react";
import { UserContext } from '../context/usercontext'

const Menu = ({ myFoods, myMeals, setMyFoods, setMyMeals }) => {  
    const { authFetch } = useContext(UserContext)

    // React state cleanup only
    const handleSetMyFoods = (chosenFood, fromCascade) => {
        if (isEditing) {
            //replace old food with new version of that food
            setMyFoods(previous => 
                previous.map(food => food.id === chosenFood.id ? chosenFood : food)
            )
            setIsEditing(false)
            handleToggleForm('food')
            setSelectedItem(null)
            return
        }
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
   
    // React state cleanup only
    const handleSetMyMeals = (mealOrArray, fromCascade) => {
        if (isEditing) {
            //replace old meal with new version of that meal
            setMyMeals(previous => 
                previous.map(meal => meal.id === mealOrArray.id ? mealOrArray : meal)
            )
            setIsEditing(false)
            handleToggleForm('meal')
            setSelectedItem(null)
            return
        }
        if (fromCascade) {
            //cascadeDelete will pass a meal to remove rather than a meal to add
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

    // if 'editing' mode [user clicks card], the form populates with existing meal / food data
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
            const response = authFetch(`http://localhost:5000/api/foods/${itemId}/meals`)
                                .then(res => {
                                    if (!res.ok) {
                                        return res.json()
                                                    .then(json => {throw new Error(json.error)})
                                    }
                                    return res.json()
                                })
                                .then(json => {
                                    //backend checks for linked meals. If none exist, continue with delete
                                    //if linked meals do exist, open cascade delete form
                                    const linkedToFood = json
                                    if (linkedToFood.length === 0) {
                                        return authFetch(`http://localhost:5000/api/foods/${itemId}`, {
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
                                        .then(() => setMyFoods(previous => previous.filter(item => item.id !== itemId)))
                                    } else {
                                        setLinkedFoodId(itemId)
                                        setLinkedMeals(linkedToFood) 
                                        handleToggleForm('cascadeDelete')                    
                                    }
                                })
                                .catch(error => console.error(error.message))
        } else if (itemType === 'meal') {
            authFetch(`http://localhost:5000/api/meals/${itemId}`, {
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
            {toggleFoodForm && <CreateFoodForm onAddFood={handleSetMyFoods} handleToggleForm={handleToggleForm} isEditing={isEditing} selectedItem={selectedItem}/>}
            {toggleMealForm && <CreateMealForm onAddMeal={handleSetMyMeals} handleToggleForm={handleToggleForm} isEditing={isEditing} selectedItem={selectedItem} myFoods={myFoods} handleDelete={handleDelete}/>}
            {toggleCascadeDelete && <CascadeDeleteForm myMeals={myMeals} myFoods={myFoods} handleToggleForm={handleToggleForm} linkedFoodId={linkedFoodId} linkedMeals={linkedMeals} handleSetMyFoods={handleSetMyFoods} handleSetMyMeals={handleSetMyMeals} handleMealUpdate={handleMealUpdate}/>}
        </div>
    )
}

export default Menu