import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import Loading from './pages/loading';

function App() {
  const { currentUser, authLoading } = useContext(UserContext)

  const [myFoods, setMyFoods] = useState([])
  const [myMeals, setMyMeals] = useState([])
  const [myMealEntries, setMealEntries] = useState([])
  
  useEffect(() => {
    const getFoods = () => {
      fetch(`http://localhost:5000/api/users/${currentUser.id}/foods`)
        .then(res => {
                if (!res.ok) {
                    return res.json()
                                .then(json => {throw new Error(json.error)})
                }
                return res.json()
            }) 
        .then(json => setMyFoods(json))
        .catch(error => console.error(error.message))
    }
    const getMeals = () => {
      fetch(`http://localhost:5000/api/users/${currentUser.id}/meals`)
        .then(res => {
                if (!res.ok) {
                    return res.json()
                                .then(json => {throw new Error(json.error)})
                }
                return res.json()
            }) 
        .then(json => setMyMeals(json))
        .catch(error => console.error(error.message))
    }
    const getMealEntries = () => {
      fetch(`http://localhost:5000/api/users/${currentUser.id}/mealEntries`)
        .then(res => {
                if (!res.ok) {
                    return res.json()
                                .then(json => {throw new Error(json.error)})
                }
                return res.json()
            }) 
        .then(json => setMealEntries(json))
        .catch(error => console.error(error.message))
    }
    if (currentUser) {
      getFoods()
      getMeals()
      getMealEntries()
    } else {
      setMyFoods([])
      setMyMeals([])
      setMealEntries([])
    }
  }, [currentUser])

  const loggedOutRoutes = [
    (<>
        <Route path='/login' element={<Login/>} />
        <Route path="*" element={<Navigate to='/login' replace />} />
    </>)
  ]

  const authenticatedRoutes = [
    (<>
        <Route path='/' element={<Today myFoods={myFoods} myMeals={myMeals} myMealEntries={myMealEntries} setMealEntries={setMealEntries}/>} />
        <Route path='/menu' element={<Menu myFoods={myFoods} myMeals={myMeals} setMyFoods={setMyFoods} setMyMeals={setMyMeals}/>} />
        <Route path='/history' element={<History myFoods={myFoods} myMealEntries={myMealEntries}/>} />
        <Route path='/settings' element={<Settings/>} />
        <Route path="/login" element={<Navigate to='/' replace />} />
        <Route path="*" element={<Error />} />
    </>)
  ]

  if (authLoading) return <Loading/>

  return (
    <BrowserRouter>
      <div id='app'>
        {currentUser && <NavBar/>}
          <Routes>
            {currentUser ? authenticatedRoutes : loggedOutRoutes}
          </Routes>
        {currentUser && <Footer/>}
      </div>
    </BrowserRouter>
  )
}

export default App;
