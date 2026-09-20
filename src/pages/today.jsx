import MacroChart from "../components/macrochart";
import MealSelect from "../components/mealselect";
import DailyMealCard from "../components/dailymealcard";
import QuickAddForm from "../components/quickaddform";
import { getFormattedDate } from "../util/helpers";
import { useContext, useState } from 'react'
import { UserContext } from '../context/usercontext'

const Today = ({ myFoods, myMeals, myMealEntries, setMealEntries }) => {
    const { currentUser } = useContext(UserContext)

    const todaysDate = getFormattedDate(new Date())

    const [quickAddOpen, setQuickAddOpen] = useState(false)
    const toggleQuickAdd = () => {
        setQuickAddOpen(bool => !bool)
    }
    
    const handleMealEntries = (mealOrEntryId, action) => {
        if (action === 'add') {
            if (mealOrEntryId === 0) return

            const nextEntryIndex = myMealEntries.length
                                    ? Math.max(...myMealEntries.map(entry => entry.id)) + 1
                                    : 1
            
            const meal = myMeals.find(meal => meal.id === mealOrEntryId)
            const ingredients = meal.ingredients.map(foodPointer => {
                                                        const food = myFoods.find(item => foodPointer.foodId === item.id)
                                                        return {
                                                                    name: food.name,
                                                                    servingSize: food.servingSize,
                                                                    servingUnit: food.servingUnit,
                                                                    units: foodPointer.units,
                                                                    cal: food.cal,
                                                                    protein: food.protein,
                                                                    carb: food.carb,
                                                                    fat: food.fat,
                                                                    sodium: food.sodium
                                                                }
                                                        })

            const newMealEntry = {
                    id: nextEntryIndex,
                    userId: currentUser.id,
                    name: meal.name,
                    dateAndTime: new Date().toISOString(),
                    ingredients: ingredients
            }
            
            setMealEntries(previous => ([
                ...previous,
                newMealEntry
            ]))
        } else if (action === 'delete') {
            setMealEntries(previous => previous.filter(entry => entry.id !== mealOrEntryId))
        }
    }

    const todaysMealEntries = myMealEntries.filter(entry => getFormattedDate(entry.dateAndTime) === todaysDate)

    const dailyMealCards = todaysMealEntries.map(mealEntry => {
        if (!mealEntry) return null

        return <DailyMealCard key={mealEntry.id} entryId={mealEntry.id} mealEntry={mealEntry} handleMealEntries={handleMealEntries} readOnly={false}/>
    })

    return (
        <div className='mainPage'>
            {quickAddOpen && <QuickAddForm currentUser={currentUser} myMealEntries={myMealEntries} setMealEntries={setMealEntries} toggleQuickAdd={toggleQuickAdd} />}
            {quickAddOpen && <div className='screenBlock'></div>}
            <div className='headerBox'>
                <h1>Your Daily Totals</h1>
            </div>
            <div className='dateHeader'>
                <h1>{todaysDate}</h1>
            </div>
            <div className='myGoals'>
                <MacroChart currentUser={currentUser} todaysMealEntries={todaysMealEntries}/>
            </div>
            <div className='headerBox'>
                <h1>Your Daily Dashboard</h1>
            </div>
            <div className='myGoals2'>
                <MealSelect myMeals={myMeals} handleMealEntries={handleMealEntries} toggleQuickAdd={toggleQuickAdd}/>
            </div>
            <div className='myGoals3'>
                {dailyMealCards.length === 0 ? <h1 className='dashboardPlaceholder todayP'>Ready for a new day!</h1> : dailyMealCards}
            </div>
        </div>
    )
}

export default Today