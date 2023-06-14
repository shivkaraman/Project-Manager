import {createContext, useEffect, useReducer } from "react";
import { projectAuth } from '../firebase/config'

export const AuthContext = createContext()

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, user : action.payload}
        case 'LOGOUT':
            return { ...state, user: null}
        case 'AuthIsReady':
            return { ...state, authIsReady: true, user: action.payload}
        default:
            return state;
    }
}   

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, { 
        user: null,
        authIsReady: false
    })

    useEffect(() => {
        const unsub = projectAuth.onAuthStateChanged(user => {
            dispatch({ type: 'AuthIsReady', payload: user })
            unsub()
        })
    }, [])
    
    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            { children }
        </AuthContext.Provider>
    )
}
