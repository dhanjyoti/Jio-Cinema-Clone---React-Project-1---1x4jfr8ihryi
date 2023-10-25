import { createContext, useContext, useEffect, useMemo, useState } from "react";

const UserContext = createContext(null)

const getUser = ()=>{
    try {
        return JSON.parse(localStorage.getItem('user'))
    } catch (error) {
        return null;
    }
    
}
export const  UserProvider = ({children})=>{
    const [user, setUser]=useState(getUser())

    useEffect(()=>{
        localStorage.setItem('user', JSON.stringify(user))
    },[user])

    //to re-render the content only when dependencies changes.
    return <UserContext.Provider value={useMemo(()=>({user, setUser}),[user, setUser])}>
        {children}
    </UserContext.Provider>
}

const useUser = ()=>{
    return useContext(UserContext) 
}

export default useUser;