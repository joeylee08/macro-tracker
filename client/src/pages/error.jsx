import { useNavigate } from 'react-router-dom'
import buddy from '../assets/buddy.jpg'

const Error = () => {
  const navigate = useNavigate()

  // setTimeout(() => navigate('/'), 800)
  
  return (
    <div className='mainPage'>
      <div className='errorBox'>
        <h1>Whoops... redirecting you back.</h1>
        <img className='buddyPhoto' src={buddy} alt='buddy'></img>
      </div>
    </div>
  )
}

export default Error