import { NavLink } from 'react-router-dom'

const NavBar = () => {

  return (
    <nav className='navbar'>
      <ul className='linksList'>
        <li><NavLink to='/'>className={({isActive}) => isActive ? 'selected' : null}<span>Today</span></NavLink></li>
        <li><NavLink to='/menu'>className={({isActive}) => isActive  ? 'selected' : null}<span>Menu</span></NavLink></li>
        <li><NavLink to='/history'>className={({isActive}) => isActive  ? 'selected' : null}<span>History</span></NavLink></li>
        <li><NavLink to='/friends'>className={({isActive}) => isActive  ? 'selected' : null}<span>Friends</span></NavLink></li>
      </ul>
    </nav>
  )
}

export default NavBar;