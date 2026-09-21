import { useContext, useState } from 'react'
import { UserContext } from '../context/usercontext'
import { Settings as SettingsIcon } from 'lucide-react'
import MacroGoals from '../components/macrogoals'

const Settings = () => {
    const { currentUser, setCurrentUser } = useContext(UserContext)

    const [formOpen, setFormOpen] = useState(false)
    const handleToggleSettingsForm = () => {
        setFormOpen(bool => !bool)
    }

    const handleLogout = () => {
        setCurrentUser(null)
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
                    <h2>{currentUser.firstName} {currentUser.lastName}</h2>
                    <h2 className='username'>{currentUser.username}</h2>
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
                    <h2 className='macroGoalLabel'>Calories: {currentUser.macroGoals.cal}</h2>
                    <h2 className='macroGoalLabel'>Protein: {currentUser.macroGoals.protein}g</h2>
                    <h2 className='macroGoalLabel'>Carbs: {currentUser.macroGoals.carb}g</h2>
                    <h2 className='macroGoalLabel'>Fat: {currentUser.macroGoals.fat}g</h2>
                    <h2 className='macroGoalLabel'>Sodium: {currentUser.macroGoals.sodium}mg</h2>
                </div>
            </div>
            <div className='mySettings3'>
                <button className='formBtn logoutBtn' onClick={handleLogout}>Log Out</button>
            </div>
        </div>
    )
}

export default Settings