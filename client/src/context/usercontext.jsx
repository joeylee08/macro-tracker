import { createContext, useState } from 'react'
import { users } from '../data/dummy'

const UserContext = createContext()

const UserProvider = ({ children }) => {
    // SWITCH THIS BACK TO null 
    const [currentUser, setCurrentUser] = useState(users[0])

    return (
        <UserContext.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider }