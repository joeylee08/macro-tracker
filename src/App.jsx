import { BrowserRouter, Routes, Route } from "react-router-dom";
import { foods, meals, users, mealEntries } from './data/dummy';
import { useState, useContext } from 'react'
import { Navigate } from "react-router-dom";
import { UserContext } from './context/usercontext'
import Login from './pages/login'
import Today from './pages/today';
import Menu from './pages/menu';
import History from './pages/history';
import Friends from './pages/friends';
import Error from './pages/error';
import NavBar from './components/navbar';
import Footer from './components/footer';

function App() {
  const { currentUser, setCurrentUser } = useContext(UserContext)

  const [myFoods, setMyFoods] = useState(foods.filter(item => item.userId === currentUser.id))
  const [myMeals, setMyMeals] = useState(meals.filter(item => item.userId === currentUser.id))
  const [myMealEntries, setMealEntries] = useState(mealEntries.filter(entry => entry.userId === currentUser.id))

  return (
    <BrowserRouter>
      {currentUser && <NavBar/>}
        <Routes>
          {currentUser 
            ? (<>
                <Route path='/' element={<Today currentUser={currentUser} myFoods={myFoods} myMeals={myMeals} myMealEntries={myMealEntries} setMealEntries={setMealEntries}/>} />
                <Route path='/menu' element={<Menu currentUser={currentUser} myFoods={myFoods} myMeals={myMeals} setMyFoods={setMyFoods} setMyMeals={setMyMeals}/>} />
                <Route path='/history' element={<History currentUser={currentUser} myFoods={myFoods} myMeals={myMeals} myMealEntries={myMealEntries}/>} />
                <Route path='/friends' element={<Friends currentUser={currentUser}/>} />
                <Route path="*" element={<Error />} />
              </>)
            : (<>
                <Route path='/login' element={<Login/>} />
                <Route path="*" element={<Navigate to='/login' replace />} />
              </>
            )}
        </Routes>
      {currentUser && <Footer/>}
    </BrowserRouter>
  )
}

export default App;
