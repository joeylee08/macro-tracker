import { BrowserRouter, Routes, Route } from "react-router-dom";
import Today from './pages/today';
import Menu from './pages/menu';
import History from './pages/history';
import Friends from './pages/friends';
import Error from './pages/error';
import NavBar from './components/navbar';
import Footer from './components/footer';

const currentUserId = 1

function App() {
  
  return (
    <BrowserRouter>
      <NavBar/>
      <Routes>
        <Route path='/' element={<Today currentUserId={currentUserId}/>} />
        <Route path='/menu' element={<Menu currentUserId={currentUserId}/>} />
        <Route path='/history' element={<History currentUserId={currentUserId}/>} />
        <Route path='/friends' element={<Friends currentUserId={currentUserId}/>} />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App;
