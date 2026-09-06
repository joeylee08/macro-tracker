import { useState } from "react";
import { mealEntries } from "../data/dummy";
import MacroChart from "../components/macrochart";
import MealSelect from "../components/mealselect";
import DailyMealCard from "../components/dailymealcard";

const Today = ({ currentUser, myFoods, myMeals }) => {
    const [myMealEntries, setMealEntries] = useState(mealEntries.filter(entry => entry.userId === currentUser.id))
    
    const handleMealEntries = (mealId, action) => {
        if (action === 'add') {
            const nextEntryIndex = myMealEntries.length
                                    ? Math.max(...myMealEntries.map(entry => entry.id)) + 1
                                    : 1

            const newMealEntry = {
                    id: nextEntryIndex,
                    userId: currentUser.id,
                    mealId: mealId,
                    consumedAt: new Date().toISOString()
            }
            
            setMealEntries(previous => ([
                ...previous,
                newMealEntry
            ]))
        } else if (action === 'delete') {
            const updatedEntries = myMealEntries.filter(entry => entry.mealId !== mealId)
            setMealEntries(updatedEntries)
        }
    }

    const dailyMealCards = myMealEntries.map(entry => {
        const selectedMeal = myMeals.find(meal => meal.id === +entry.mealId)

        if (!selectedMeal) return null

        return <DailyMealCard key={entry.id} meal={selectedMeal} myFoods={myFoods} handleMealEntries={handleMealEntries}/>
    })

    return (
        <div className='mainPage'>
            <div className='headerBox'>
                <h1>Your Daily Totals</h1>
            </div>
            <div className='myGoals'>
                <MacroChart currentUser={currentUser} myFoods={myFoods} myMeals={myMeals} myMealEntries={myMealEntries}/>
            </div>
            <div className='headerBox'>
                <h1>Your Daily Dashboard</h1>
            </div>
            <div className='myGoals2' id='mealsDash'>
                <MealSelect myMeals={myMeals} handleMealEntries={handleMealEntries} />
            </div>
            <div className='myGoals3'>
                {dailyMealCards}
            </div>
        </div>
    )
}

export default Today