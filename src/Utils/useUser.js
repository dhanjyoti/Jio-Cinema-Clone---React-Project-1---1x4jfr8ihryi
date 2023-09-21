import { createContext, useContext, useEffect, useMemo, useState } from "react"

const UserContext = createContext(null)

const getUser = ()=>{
    return localStorage.getItem('user')
}
export const UserProvider = ({children})=>{
    const [user, setUser]=useState(getUser())

    useEffect(()=>{
        if(user){
            localStorage.setItem('user', JSON.stringify(user))
        }
    },[user])

    return <UserContext.Provider value={useMemo(()=>({user, setUser}),[user, setUser])}>
        {children}
    </UserContext.Provider>
}

const useUser = ()=>{
    return useContext(UserContext)
}

export default useUser