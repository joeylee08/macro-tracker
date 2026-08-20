import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/home';
import Today from './pages/today';
import Menu from './pages/menu';
import History from './pages/history';
import Friends from './pages/friends';
import Error from './pages/error';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/today' element={<Today />} />
        <Route path='/menu' element={<Menu />} />
        <Route path='/history' element={<History />} />
        <Route path='/friends' element={<Friends />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
