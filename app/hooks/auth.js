import React, { createContext, useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
    user: null
}

const AuthContext = createContext({
    user: null,
    login: (data) => { },
    logout: () => { }
})

function authReducer(state, action) {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                user: action.payload
            }
        case 'LOGOUT':
            return {
                ...state,
                user: null
            }
        default:
            return state;
    }
}

function AuthProvider(props) {
    const [state, dispatch] = useReducer(authReducer, initialState);

    async function login(data) {
        try {
            const jsonValue = JSON.stringify(data.token)
            await AsyncStorage.setItem('token', jsonValue)
          } catch(e) {
            console.log(e)
          }
        dispatch({
            type: 'LOGIN',
            payload: data
        })
    }

    async function logout() {
        await AsyncStorage.removeItem("token")
        dispatch({ type: 'LOGOUT' })
    }

    return (
        <AuthContext.Provider value={{ user: state.user, login, logout }} {...props} />
    )
}

export { AuthContext, AuthProvider }