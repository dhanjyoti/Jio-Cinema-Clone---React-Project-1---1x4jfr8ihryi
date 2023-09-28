import { useEffect, useState } from "react"
import useUser from "../Utils/useUser"
import Input from "../components/Input"
import { useNavigate } from "react-router-dom"
import Avatar from "../components/Avatar"
import api from "../Utils/api"

const Profile = ({ }) => {
    const { user, setUser } = useUser()
    const navigate = useNavigate()

    //navigate to home if there is no user logged in
    useEffect(() => {
        if (!user) {
            navigate("/")
        }
    }, [user])

    if (!user) {
        return null
    }

    const [name, setName] = useState(user.data.name)
    const [email, setEmail] = useState(user.data.email)
    const [registerDate, setRegisterDate] = useState(user.data.createdAt)
    const [profile, setProfile]=useState(null)

    const uploadProfile = async (formData) => {

        try {
            const res = await api.updateProfile({ data: formData })
            console.log(res.data.user.profileImage);
            let tempUser = {...user}
            tempUser.data.profileImage = res.data.user.profileImage
            setUser(tempUser)
        } catch (e) {
            console.log(e)
        }
    }

    return <div className="text-white px-5 py-8 flex flex-col gap-4 items-center">
        <div>
            <a className="text-white text-xl" href="/">{'Profile'}</a>
        </div>
        <div className="relative flex flex-col gap-2 items-center">
            <Avatar logo={user.data.profileImage?user.data.profileImage:null}/>
            <label class="block text-sky-600 cursor-pointer">
                <span>Choose profile photo</span>
                <input value={profile} type="file" class="hidden" onChange={async (e) => {
                    let formData = new FormData()
                    formData.append("profileImage", e.target.files[0], e.target.files[0].name)
                    await uploadProfile(formData)
                }} />
            </label>
        </div>
        <form className="flex flex-col gap-5 w-1/2">
            <div className="flex flex-col gap-1">
                <span className="font-bold">Name</span>
                <Input value={name} onChange={({ target }) => { setName(target.value) }} />
            </div>
            <div className="flex flex-col gap-1">
                <span className="font-bold">Email</span>
                <Input value={email} onChange={({ target }) => { setEmail(target.value) }} />
            </div>
            <div className="flex flex-col gap-1">
                <span className="font-bold">Date of registration</span>
                <Input disabled={true} value={new Date(registerDate).toDateString()} />
            </div>

        </form>
    </div>
}

export default Profile