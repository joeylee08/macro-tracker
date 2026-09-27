import { useState } from 'react'
import { useContext } from 'react'
import { UserContext } from '../context/usercontext'


const Login = () => {
	const { setCurrentUser } = useContext(UserContext)

	const [isLogin, setIsLogin] = useState(true)

	const [formData, setFormData] = useState({
		username: '',
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
			password: '',
			confirmPassword: ''
		})
	}

  	const handleLogin = (event) => {
		event.preventDefault()

		const userData = {
			username: formData.username,
			password: formData.password
		}

		fetch(`http://localhost:5000/api/auth/login`, {
				method: 'POST',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(userData)
			})
			.then(res => {
				if (!res.ok) {
					return res.json()
							.then(json => {throw new Error(json.error)})
				}
				return res.json()
			})
			.then(json => {
				setCurrentUser(json)
			})
			.catch(error => alert(error.message))
	}

	const handleSignUp = (event) => {
		event.preventDefault()

		const userData = {
			username: formData.username,
			password: formData.password,
		}
		if (formData.password !== formData.confirmPassword) {
			alert('Passwords do not match.')
			return
		}
		fetch(`http://localhost:5000/api/users`, {
				method: 'POST',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(userData)
			})
			.then(res => {
				if (!res.ok) {
					return res.json()
							.then(json => {throw new Error(json.error)})
				}
				return res.json()
			})
			.then(json => {
				setCurrentUser(json)
			})
			.catch(error => alert(error.message))
	}

	if (isLogin) {
		return (
		<div className='loginPage'>
			<form className='form loginForm' onSubmit={handleLogin}>
				<button className='formBtn formBtnLogin' type='button' onClick={() => handleToggleForm()}>{isLogin ? 'to Sign Up' : 'to Login'}</button>
				<h1>Macro Tracker Login</h1>
				<div className='loginFormField'>
					<label htmlFor='username'>Username:</label>
					<input name='username' className='loginInput' type='text' onChange={handleSetFormData} value={formData.username} placeholder="Enter Username"></input>
					<label htmlFor='password'>Password:</label>
					<input name='password' className='loginInput' type='password' onChange={handleSetFormData} value={formData.password} placeholder="Enter Password"></input>
				</div>
				<div id='loginButtons'>
					<button className='formBtn formBtnLogin' type='submit'>LOGIN</button>
				</div>
			</form>
		</div>
		)
	} else {
		return (
		<div className='loginPage'>
			<form className='form loginForm' onSubmit={handleSignUp}>
				<button className='formBtn formBtnLogin' type='button' onClick={() => handleToggleForm()}>{isLogin ? 'to Sign Up' : 'to Login'}</button>
				<h1>Macro Tracker Sign Up</h1>
				<div className='loginFormField'>
					<label htmlFor='username'>Username:</label>
					<input name='username' className='loginInput' type='text' onChange={handleSetFormData} value={formData.username} placeholder="Enter Username"></input>
					<label htmlFor='password'>Password:</label>
					<input name='password' className='loginInput' type='password' onChange={handleSetFormData} value={formData.password} placeholder="Enter Password"></input>
					<label htmlFor='confirmPassword'>Confirm Password:</label>
					<input name='confirmPassword' className='loginInput' type='password' onChange={handleSetFormData} value={formData.confirmPassword} placeholder="Confirm Password"></input>
				</div>
				<div id='loginButtons'>
					<button className='formBtn formBtnLogin' type='submit'>SIGN UP</button>
				</div>
			</form>
		</div>
		)
	}
  
}

export default Login