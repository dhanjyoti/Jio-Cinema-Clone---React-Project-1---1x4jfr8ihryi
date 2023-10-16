import { useEffect, useState } from "react"
import Input from "../components/Input"
import Button from "../components/Button"
import api from "../Utils/api"
import { useNavigate } from "react-router-dom"
import useUser from "../Utils/useUser"

const Register = ({ }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const navigate = useNavigate()

    const { user, setUser } = useUser()

    useEffect(() => {
        if (user) {
            navigate("/")
        }
    }, [user])


    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("submitted");
        if (password === confirmPassword) {
            (async () => {
                try {
                    let res = await api.register({ data: { name, email, password, appType: "ott" } })
                    console.log(res);
                    navigate("/login")
                } catch(e) {
                    console.log("error", e);
                    alert(e.response?.data?.message?e.response?.data?.message:"Something went wrong")
                }
            })()
        } else {
            alert('Invalid password match')
        }
    }

    if (user) {
        return null
    }

    return <div className="pt-32 flex items-center justify-center flex-col gap-3">
        <div className="text-2xl text-white">Register</div>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <Input placeholder={"Full name"} required value={name} onChange={({ target }) => {
                setName(target.value)
            }} />
            <Input placeholder={"Email"} type={'email'} required value={email} onChange={({ target }) => {
                setEmail(target.value)
            }} />
            <Input placeholder={"Password"} type={'password'} required value={password} onChange={({ target }) => {
                setPassword(target.value)
            }} />
            <Input placeholder={"Confirm password"} type={'password'} required value={confirmPassword} onChange={({ target }) => {
                setConfirmPassword(target.value)
            }} />
            <div className="mt-4 w-full">
                <Button content={'Register'} type={"submit"} />
            </div>
        </form>
    </div>
}

export default Register