import { useEffect, useState } from "react"
import Input from "../components/Input"
import Button from "../components/Button"
import api from "../Utils/api"
import { useNavigate } from "react-router-dom"
import useUser from "../Utils/useUser"

const Login = ({})=>{
    const [email, setEmail]=useState('')
    const [password, setPassword]=useState('')

    const {user, setUser}=useUser()
    
    useEffect(()=>{
        if(user){
            navigate("/")
        }
    },[user])

    const navigate = useNavigate()
    const handleSubmit = (e)=>{
        e.preventDefault()
        console.log("submitted");
        (async()=>{
           try {
            let res = await api.login({data:{email, password, appType:"ott"}})
            setUser(res)
           } catch (error) {
            alert('error')
            console.log(error)
           }
            
        })()
    }


    if(user){
        return null
    }

    return <div className="pt-32 flex items-center justify-center flex-col gap-3">
        <div className="text-2xl text-white">Register</div>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <Input placeholder={"Email"} type={'email'} required value={email} onChange={({target})=>{
                setEmail(target.value)
            }}/>
            <Input placeholder={"Password"} type={'password'} required value={password} onChange={({target})=>{
                setPassword(target.value)
            }}/>
            <div className="mt-4 w-full">
            <Button content={'Login'} type={"submit"}/>
            </div>
        </form>
    </div>
}

export default Login