import { useState } from 'react'
import { useContext } from 'react'
import { UserContext } from '../context/usercontext'
import { users } from '../data/dummy'

const Login = () => {
  const { setCurrentUser } = useContext(UserContext)

  const [isLogin, setIsLogin] = useState(true)

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleSetFormData = (event) => {
    const { name, value } = event.target
    setFormData(previousData => ({
      ...previousData,
      [name]: value
    }))
  }

  const handleToggleForm = () => {
    setIsLogin(isLogin => !isLogin)
    setFormData({
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    })
  }

  const handleLogin = (event) => {
    event.preventDefault()

    const user = users.find(person => person.username === formData.username &&
                                      person.password === formData.password)
  
    if (user) {
      setCurrentUser(user)
    } else {
      alert('Invalid username and/or password, motherfucker.')
    }
  }

  const handleSignUp = (event) => {
    console.log('penis signed up.')
  }

  if (isLogin) {
    return (
      <div className='loginPage'>
        <form className='form loginForm' onSubmit={handleLogin}>
            <button className='formBtnLogin' type='button' onClick={() => handleToggleForm()}>{isLogin ? 'to Sign Up' : 'to Login'}</button>
            <h1>Macro Tracker Login</h1>
            <div className='loginFormField'>
                <label htmlFor='username'>Username:</label>
                <input name='username' className='loginInput' type='text' onChange={handleSetFormData} value={formData.username} placeholder="Enter Username"></input>
                <label htmlFor='password'>Password:</label>
                <input name='password' className='loginInput' type='password' onChange={handleSetFormData} value={formData.password} placeholder="Enter Password"></input>
            </div>
            <div id='loginButtons'>
                <button className='formBtnLogin' type='submit'>LOGIN</button>
            </div>
        </form>
      </div>
    )
  } else {
    return (
      <div className='loginPage'>
        <form className='form loginForm' onSubmit={handleSignUp}>
            <button className='formBtnLogin' type='button' onClick={() => handleToggleForm()}>{isLogin ? 'to Sign Up' : 'to Login'}</button>
            <h1>Macro Tracker Sign Up</h1>
            <div className='loginFormField'>
                <label htmlFor='username'>Username:</label>
                <input name='username' className='loginInput' type='text' onChange={handleSetFormData} value={formData.username} placeholder="Enter Username"></input>
                <label htmlFor='email'>Email:</label>
                <input name='email' className='loginInput' type='email' onChange={handleSetFormData} value={formData.email} placeholder="Enter Email"></input>
                <label htmlFor='password'>Password:</label>
                <input name='password' className='loginInput' type='password' onChange={handleSetFormData} value={formData.password} placeholder="Enter Password"></input>
                <label htmlFor='confirmPassword'>Confirm Password:</label>
                <input name='confirmPassword' className='loginInput' type='password' onChange={handleSetFormData} value={formData.confirmPassword} placeholder="Confirm Password"></input>
            </div>
            <div id='loginButtons'>
                <button className='formBtnLogin' type='submit'>SIGN UP</button>
            </div>
        </form>
      </div>
    )
  }
  
}

export default Login