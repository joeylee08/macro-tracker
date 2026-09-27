import { useContext, useState } from 'react'
import { UserContext } from '../context/usercontext'
import { Settings as SettingsIcon } from 'lucide-react'
import MacroGoals from '../components/macrogoals'
import { getFormattedDate } from '../util/helpers'

const Settings = () => {
    const { currentUser, setCurrentUser } = useContext(UserContext)

    const [formOpen, setFormOpen] = useState(false)
    const handleToggleSettingsForm = () => {
        setFormOpen(bool => !bool)
    }

    const handleLogout = () => {
        fetch('http://localhost:5000/api/auth/logout', {
                method: 'POST',
                credentials: 'include'
            })
            .then(res => {
                if (!res.ok) {
                    return res.json()
                        .then(json => {
                            throw new Error(json.error)
                        })
                }

                return res.json()
            })
            .then(() => {
                setCurrentUser(null)
            })
            .catch(error => {
                console.error(error.message)
            })
    }

    return (
        <div className='mainPage'>
            {formOpen && <MacroGoals handleToggleSettingsForm={handleToggleSettingsForm} />}
            {formOpen && <div className='screenBlock'></div>}
            <div className='headerBox'>
                <h1>Your Account</h1>
            </div>
            <div className='mySettings'>
                <div className='settingsField'>
                    <h2 className='username'>{currentUser.username}</h2>
                    <h2 className='dateJoined'>Member Since: {getFormattedDate(currentUser.dateJoined)}</h2>
                </div>
            </div>
            <div className='headerBox'>
                <h1>Your Macro Goals</h1>
            </div>
            <div className='mySettings2'>
                <button className='settingsBtn' onClick={handleToggleSettingsForm}>
                    <SettingsIcon size={30}/>
                </button>
                <div className='settingsField'>
                    <h2 className='macroGoalLabel'>Calories: {currentUser.calGoal}</h2>
                    <h2 className='macroGoalLabel'>Protein: {currentUser.proteinGoal}g</h2>
                    <h2 className='macroGoalLabel'>Carbs: {currentUser.carbGoal}g</h2>
                    <h2 className='macroGoalLabel'>Fat: {currentUser.fatGoal}g</h2>
                    <h2 className='macroGoalLabel'>Sodium: {currentUser.sodiumGoal}mg</h2>
                </div>
            </div>
            <div className='mySettings3'>
                <button className='formBtn logoutBtn' onClick={handleLogout}>Log Out</button>
            </div>
        </div>
    )
}

export default Settings