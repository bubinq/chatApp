import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [authUser, setAuthUser] = useState()

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setAuthUser(user)
        })
        return unsubscribe
        // eslint-disable-next-line
    }, [])


    return (
        <AuthContext.Provider 
            value={{authUser}}
            >
            {children}
        </AuthContext.Provider>
    )
}