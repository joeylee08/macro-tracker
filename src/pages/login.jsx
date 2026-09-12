import { useState } from 'react'


const Login = () => {
  const [isLogin, setIsLogin] = useState(true)

  const handleToggleForm = () => {
    setIsLogin(isLogin => !isLogin)
  }

  if (isLogin) {
    return (
      <div className='loginPage'>
        <form className='form loginForm' onSubmit={console.log('penis')}>
            <button className='formBtnLogin' type='button' onClick={() => handleToggleForm()}>{isLogin ? 'to Sign Up' : 'to Login'}</button>
            <h1>Macro Tracker Login</h1>
            <div className='loginFormField'>
                <label htmlFor='username'>Username:</label>
                <input id='username' className='loginInput' type='text' onChange={console.log('penis')} value={'poo'} placeholder="Enter Username"></input>
                <label htmlFor='password'>Password:</label>
                <input id='password' className='loginInput' type='password' onChange={console.log('penis')} value={'poo'} placeholder="Enter Password"></input>
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
        <form className='form loginForm' onSubmit={console.log('penis')}>
            <button className='formBtnLogin' type='button' onClick={() => handleToggleForm()}>{isLogin ? 'to Sign Up' : 'to Login'}</button>
            <h1>Macro Tracker Sign Up</h1>
            <div className='loginFormField'>
                <label htmlFor='username'>Username:</label>
                <input id='username' className='loginInput' type='text' onChange={console.log('penis')} value={'poo'} placeholder="Enter Username"></input>
                <label htmlFor='email'>Email:</label>
                <input id='email' className='loginInput' type='email' onChange={console.log('penis')} value={'poo'} placeholder="Enter Email"></input>
                <label htmlFor='password'>Password:</label>
                <input id='password' className='loginInput' type='password' onChange={console.log('penis')} value={'poo'} placeholder="Enter Password"></input>
                <label htmlFor='confirmPassword'>Confirm Password:</label>
                <input id='confirmPassword' className='loginInput' type='password' onChange={console.log('penis')} value={'poo'} placeholder="Confirm Password"></input>
            </div>
            <div id='loginButtons'>
                <button className='formBtnLogin' type='submit'>SIGNUP</button>
            </div>
        </form>
      </div>
    )
  }
  
}

export default Login