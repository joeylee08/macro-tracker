import { BrowserRouter, Routes, Route } from "react-router-dom";
import Today from './pages/today';
import Menu from './pages/menu';
import History from './pages/history';
import Friends from './pages/friends';
import Error from './pages/error';
import NavBar from "./components/navbar"

function App() {

  return (
    <BrowserRouter>
      <NavBar/>
      <Routes>
        <Route path='/' element={<Today />} />
        <Route path='/menu' element={<Menu />} />
        <Route path='/history' element={<History />} />
        <Route path='/friends' element={<Friends />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
