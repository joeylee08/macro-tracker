import { useContext, useState } from 'react'
import { UserContext } from '../context/usercontext'
import { Settings as SettingsIcon } from 'lucide-react'

const Settings = () => {
    const { currentUser } = useContext(UserContext)

    return (
        <div className='mainPage'>
            <div className='headerBox'>
                <h1>Your Macro Tracker Account</h1>
            </div>
            <div className='mySettings'>
                <button className='settingsBtn'>
                    <SettingsIcon size={30}/>
                </button>
                <div className='settingsField'>
                    <h2 id='fullName'>{currentUser.firstName} {currentUser.lastName}</h2>
                    <h2 id='username'>{currentUser.username}</h2>
                </div>
            </div>
        </div>
    )
}

export default Settings