import { BrowserRouter, Routes, Route } from "react-router-dom";
import { foods, meals, mealEntries } from './data/dummy';
import { useState, useContext, useEffect } from 'react'
import { Navigate } from "react-router-dom";
import { UserContext } from './context/usercontext'
import Login from './pages/login'
import Today from './pages/today';
import Menu from './pages/menu';
import History from './pages/history';
import Settings from './pages/settings';
import Error from './pages/error';
import NavBar from './components/navbar';
import Footer from './components/footer';

function App() {
  const { currentUser } = useContext(UserContext)

  const [myFoods, setMyFoods] = useState([])
  const [myMeals, setMyMeals] = useState([])
  const [myMealEntries, setMealEntries] = useState([])
  
  useEffect(() => {
    if (currentUser) {
      setMyFoods(foods.filter(item => item.userId === currentUser.id))
      setMyMeals(meals.filter(item => item.userId === currentUser.id))
      setMealEntries(mealEntries.filter(entry => entry.userId === currentUser.id))
    } else {
      setMyFoods([])
      setMyMeals([])
      setMealEntries([])
    }
  }, [currentUser])

  return (
    <BrowserRouter>
      <div id='app'>
        {currentUser && <NavBar/>}
          <Routes>
            {currentUser 
              ? (<>
                  <Route path='/' element={<Today myFoods={myFoods} myMeals={myMeals} myMealEntries={myMealEntries} setMealEntries={setMealEntries}/>} />
                  <Route path='/menu' element={<Menu myFoods={myFoods} myMeals={myMeals} setMyFoods={setMyFoods} setMyMeals={setMyMeals}/>} />
                  <Route path='/history' element={<History myFoods={myFoods} myMealEntries={myMealEntries}/>} />
                  <Route path='/settings' element={<Settings/>} />
                  <Route path="/login" element={<Navigate to='/' replace />} />
                  <Route path="*" element={<Error />} />
                </>)
              : (<>
                  <Route path='/login' element={<Login/>} />
                  <Route path="*" element={<Navigate to='/login' replace />} />
                </>
              )}
          </Routes>
        {currentUser && <Footer/>}
      </div>
    </BrowserRouter>
  )
}

export default App;
