import React, { createContext, useContext, useState } from 'react'


const userData = JSON.parse(localStorage.getItem('user')) || {};
const isAuthenticated = localStorage.getItem('isAuth') === 'true';
const hasToken = localStorage.getItem('token') || '';


export const UserStateContext = createContext({
    user: {},
    setUser: () => { },
    isAuth: false,
    setIsAuth: () => { },
    token: '',
    setToken: () => { }
})


export default function UserContext({ children }) {

    const [user, setUser] = useState(userData)
    const [isAuth, setIsAuth] = useState(isAuthenticated)
    const [token, setToken] = useState(hasToken)

    //console.log(user,isAuth,token)
    return (
        <UserStateContext.Provider value={{
            user,
            setUser,
            isAuth,
            setIsAuth,
            token,
            setToken
        }}>
            {children}

        </UserStateContext.Provider>
    )


}

export const useUserContext = () => useContext(UserStateContext)
