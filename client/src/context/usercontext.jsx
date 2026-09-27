import { createContext, useState, useEffect } from 'react'

const UserContext = createContext()

const UserProvider = ({ children }) => {
    const [authLoading, setAuthLoading] = useState(true)
    const [currentUser, setCurrentUser] = useState(null)

    useEffect(() => {
        fetch(`http://localhost:5000/api/auth/me`, {
            method: 'GET',
            credentials: 'include'
        })
        .then(res => {
            if (res.status === 401) return null
            if (!res.ok) {
                return res.json()
							.then(json => {throw new Error(json.error)})
            }
            return res.json()
        })
        .then(user => setCurrentUser(user))
        .catch(error => console.error(error.message))
        .finally(() => setAuthLoading(false))
    }, [])

    return (
        <UserContext.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider }