import { BrowserRouter, Routes, Route } from "react-router-dom";
import { foods, meals, users } from './data/dummy';
import { useState } from 'react'
import Today from './pages/today';
import Menu from './pages/menu';
import History from './pages/history';
import Friends from './pages/friends';
import Error from './pages/error';
import NavBar from './components/navbar';
import Footer from './components/footer';

const currentUser = users[0]

function App() {
  const [myFoods, setMyFoods] = useState(foods.filter(item => item.userId === currentUser.id))
  const [myMeals, setMyMeals] = useState(meals.filter(item => item.userId === currentUser.id))

  return (
    <BrowserRouter>
      <NavBar/>
      <Routes>
        <Route path='/' element={<Today currentUser={currentUser} myFoods={myFoods} myMeals={myMeals}/>} />
        <Route path='/menu' element={<Menu currentUser={currentUser} myFoods={myFoods} myMeals={myMeals} setMyFoods={setMyFoods} setMyMeals={setMyMeals}/>} />
        <Route path='/history' element={<History currentUser={currentUser}/>} />
        <Route path='/friends' element={<Friends currentUser={currentUser}/>} />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App;
