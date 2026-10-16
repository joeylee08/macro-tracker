import Meals from "../components/meals";
import Foods from "../components/foods";
import CreateFoodForm from "../components/createfoodform";
import CreateMealForm from "../components/createmealform";
import CascadeDeleteForm from "../components/cascadedeleteform";
import { useState, useContext } from "react";
import { UserContext } from '../context/usercontext';
import { API_URL } from '../util/helpers';

const Menu = ({ myFoods, myMeals, setMyFoods, setMyMeals }) => {  
    const { authFetch } = useContext(UserContext)
    const [formTop, setFormTop] = useState(0)

    const handleSetMyFoods = (chosenFood, fromCascade) => {
        if (isEditing) {
            setMyFoods(previous => 
                previous.map(food => food.id === chosenFood.id ? chosenFood : food)
            )
            setIsEditing(false)
            handleToggleForm('food')
            setSelectedItem(null)
            return
        }
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
        if (isEditing) {
            setMyMeals(previous => 
                previous.map(meal => meal.id === mealOrArray.id ? mealOrArray : meal)
            )
            setIsEditing(false)
            handleToggleForm('meal')
            setSelectedItem(null)
            return
        }
        if (fromCascade) {
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

        if (formType === 'food') {
            if (!toggleFoodForm) setFormTop(window.scrollY)
            setToggleFoodForm(bool => !bool)
        }
        else if (formType === 'meal') {
            if (!toggleMealForm) setFormTop(window.scrollY)
            setToggleMealForm(bool => !bool)
        }
        else if (formType === 'cascadeDelete') {
            if (!toggleCascadeDelete) setFormTop(window.scrollY)
            setToggleCascadeDelete(bool => !bool)
        }
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
            const response = authFetch(`${API_URL}/api/foods/${itemId}/meals`)
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
                                        return authFetch(`${API_URL}/api/foods/${itemId}`, {
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
            authFetch(`${API_URL}/api/meals/${itemId}`, {
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
        <div className='mainPage mainPageMenu'>
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
            {toggleFoodForm && <CreateFoodForm onAddFood={handleSetMyFoods} handleToggleForm={handleToggleForm} formTop={formTop} isEditing={isEditing} selectedItem={selectedItem} />}
            {toggleMealForm && <CreateMealForm onAddMeal={handleSetMyMeals} handleToggleForm={handleToggleForm} formTop={formTop} isEditing={isEditing} selectedItem={selectedItem} myFoods={myFoods} handleDelete={handleDelete} />}
            {toggleCascadeDelete && <CascadeDeleteForm myMeals={myMeals} myFoods={myFoods} handleToggleForm={handleToggleForm} formTop={formTop} linkedFoodId={linkedFoodId} linkedMeals={linkedMeals} handleSetMyFoods={handleSetMyFoods} handleSetMyMeals={handleSetMyMeals} handleMealUpdate={handleMealUpdate} />}
        </div>
    )
}

export default Menu