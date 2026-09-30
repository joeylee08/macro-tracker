import { createContext, useState, useEffect } from 'react'
import { API_URL } from '../util/helpers'

const UserContext = createContext()

const UserProvider = ({ children }) => {
    const [authLoading, setAuthLoading] = useState(true)
    const [currentUser, setCurrentUser] = useState(null)

    const checkAuth = () => {
        fetch(`${API_URL}/api/auth/me`, {
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
    }

    const authFetch = async (url, options = {}) => {
        const response = await fetch(url, {
            ...options,
            credentials: 'include'
        })
        if (response.status === 401) {
            setCurrentUser(null)
        }
        return response
    }

    useEffect(() => {
        checkAuth()
    }, [])

    useEffect(() => {
        const handleOnFocus = () => {
            if (currentUser) checkAuth()
        }
        window.addEventListener('focus', handleOnFocus)

        return () => {
            window.removeEventListener('focus', handleOnFocus)
        }
    }, [currentUser])

    return (
        <UserContext.Provider value={{ currentUser, setCurrentUser, authLoading, authFetch }}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider }