import MacroChart from "../components/macrochart";
import MealSelect from "../components/mealselect";
import DailyMealCard from "../components/dailymealcard";
import QuickAddForm from "../components/quickaddform";
import { getFormattedDate } from "../util/helpers";
import { useContext, useState } from 'react'
import { UserContext } from '../context/usercontext'
import { calculateMacros, validateData } from "../util/helpers";

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
            
            const meal = myMeals.find(meal => meal.id === mealOrEntryId)
            const macros = calculateMacros(myFoods, meal)

            const toNumbers = {
                userId: +currentUser.id,
                name: meal.name,
                cal: +macros.cal,
                protein: +macros.protein,
                carb: +macros.carb,
                fat: +macros.fat,
                sodium: +macros.sodium
            }

            if (!validateData(toNumbers, 'mealEntry')) return
            
            fetch('http://localhost:5000/api/mealEntries', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(toNumbers)
            })
            .then(res => res.json())
            .then(json => setMealEntries(previous => [
                ...previous,
                json
            ]))
        } else if (action === 'delete') {
            fetch(`http://localhost:5000/api/mealEntries/${mealOrEntryId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(json => console.log(json.message))
            .then(() => setMealEntries(previous => previous.filter(item => item.id !== mealOrEntryId)))
        }
    }

    const todaysMealEntries = myMealEntries.filter(entry => getFormattedDate(entry.dateAndTime) === todaysDate)

    const dailyMealCards = todaysMealEntries.map(mealEntry => {
        if (!mealEntry) return null

        return <DailyMealCard key={mealEntry.id} entryId={mealEntry.id} mealEntry={mealEntry} handleMealEntries={handleMealEntries} readOnly={false}/>
    })

    return (
        <div className='mainPage'>
            {quickAddOpen && <QuickAddForm currentUser={currentUser} setMealEntries={setMealEntries} toggleQuickAdd={toggleQuickAdd} />}
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