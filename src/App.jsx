import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/home';
import Today from './pages/today';
import Menu from './pages/menu';
import History from './pages/history';
import Error from './pages/error';

function App() {

  const routes = (
    <>
      <Route path='/' element={<Home />} />
      <Route path='/today' element={<Today />} />
      <Route path='/menu' element={<Menu />} />
      <Route path='/history' element={<History />} />
      <Route path='/friends' element={<Friends />} />
    </>
  )

  return (
    <>
      <Routes>
        {routes}
        <Route path="/:error" element={<Error />} />
      </Routes>
    </>
  )
}

export default App;
