import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useReducer } from "react";
import { auth } from '../firebase/config';

export const AuthContext = createContext();

export const authReducer = (state, action) => {

    switch (action.type) {
        case 'LOGIN':
            return { ...state, user: action.payload }
        case 'LOGOUT':
            return { ...state, user: null }
        case 'AUTH_IS_READY':
            return { ...state, user: action.payload, authIsReady: true }

        default:
            return state
    }
}

const checkAdminStatus = async uid => {
    let isAdmin = false
    /* const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const requestOptions = {
        method: "GET",
        headers: headers,
    }

    await fetch(`${process.env.REACT_APP_BACKEND}/profiles/${uid}`, requestOptions)
        .then(res => res.json())
        .then(json => {
            isAdmin = json.is_admin}
            )
        .catch(err => console.log(err)) */

    return isAdmin
}

export const AuthContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        authIsReady: false
    })

    // The following code is needed to make sure that when refresh the user when we refres the page
    // When we refresh the page in fact we reset the user to null, but user might be actually logged in in firebase
    // so we load the user status before refreshing the component 
    useEffect(() => {
        const unsub = () => onAuthStateChanged(auth, async (user) => {
            if (user != null) {
                const res = await checkAdminStatus(user.uid)
                user.isAdmin = res
            }
            dispatch({ type: 'AUTH_IS_READY', payload: user })
        });
        unsub();
    }, [])

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}
