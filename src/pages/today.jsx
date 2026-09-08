import { useState } from "react";
import MacroChart from "../components/macrochart";
import MealSelect from "../components/mealselect";
import DailyMealCard from "../components/dailymealcard";
import { getFormattedDate } from "../util/helpers";

const Today = ({ currentUser, myFoods, myMeals, myMealEntries, setMealEntries }) => {
    const todaysDate = getFormattedDate(new Date())
    
    const handleMealEntries = (mealOrEntryId, action) => {
        if (action === 'add') {
            if (mealOrEntryId === 0) return

            const nextEntryIndex = myMealEntries.length
                                    ? Math.max(...myMealEntries.map(entry => entry.id)) + 1
                                    : 1

            const newMealEntry = {
                    id: nextEntryIndex,
                    userId: currentUser.id,
                    mealId: mealOrEntryId,
                    dateAndTime: new Date().toISOString()
            }

            setMealEntries(previous => ([
                ...previous,
                newMealEntry
            ]))
        } else if (action === 'delete') {
            setMealEntries(previous => previous.filter(entry => entry.id !== mealOrEntryId))
        }
    }

    const todaysEntries = myMealEntries.filter(entry => getFormattedDate(entry.dateAndTime) === todaysDate)

    const dailyMealCards = todaysEntries.map(entry => {
        const selectedMeal = myMeals.find(meal => meal.id === +entry.mealId)

        if (!selectedMeal) return null

        return <DailyMealCard key={entry.id} entryId={entry.id} meal={selectedMeal} myFoods={myFoods} handleMealEntries={handleMealEntries}/>
    })

    return (
        <div className='mainPage'>
            <div id='dateAndTime'>
                <h1>{todaysDate}</h1>
            </div>
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
                {dailyMealCards.length === 0 ? <h1 id='dashboardPlaceholder'>Ready for a new day!</h1> : dailyMealCards}
            </div>
        </div>
    )
}

export default Today