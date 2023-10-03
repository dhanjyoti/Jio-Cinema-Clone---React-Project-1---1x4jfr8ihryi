import { useEffect, useState } from "react"
import useUser from "../Utils/useUser"
import Input from "../components/Input"
import { useNavigate } from "react-router-dom"
import Avatar from "../components/Avatar"
import Button from "../components/Button"
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
    const [profile, setProfile] = useState(null)

    const [newPassword, setNewPassword]=useState('')
    const [currentPassword, setCurrentPassword]=useState('')
    const [confirmPassword, setConfirmPassword]=useState('')
    const [showPasswordChange, setShowPasswordChange]=useState(false)

    const [edited, setEdited] = useState(false)

    const [loading, setLoading] = useState(false)
    const [passwordLoading, setPasswordLoading] = useState(false)

    const uploadProfile = async (formData) => {

        try {
            const res = await api.updateProfileImage({ data: formData })
            console.log(res.data.user.profileImage);
            let tempUser = { ...user }
            tempUser.data.profileImage = res.data.user.profileImage
            setUser(tempUser)
        } catch (e) {
            console.log(e)
        }
    }

    const updateMe = async (formData) => {

        try {
            const res = await api.updateMe({ data: formData })
            setUser({ ...user, data: res.data.user })
        } catch (e) {
            alert("Unable to update profile.")
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        // double ! means, it converts object to boolean
        if (!!name) {
            setLoading(true)
            await updateMe({ name: name })
            // location.href="profile"
            navigate(0)
        }
    }

    //to check if data is edited or not and show save button base on it.
    useEffect(() => {
        //user.data.name is original data
        if (name !== user.data.name || email !== user.data.email) {
            setEdited(true)
        } else {
            setEdited(false)
        }
    }, [name, email])


    const handlePasswordUpdate = async (e) => {
        e.preventDefault()
        
        // double ! means, it converts object to boolean
        if (newPassword === confirmPassword) {
            setPasswordLoading(true)
           try{
            await api.updatePassword({data:{appType:"ott", name:user.data.name, email:user.data.email,passwordCurrent:currentPassword, password:newPassword}})
           }catch{
            alert("Password doesnot matches")
           }finally{
            setPasswordLoading(false)
           }
            navigate(0)
        }else{
            alert("Password doesnot matches")
        }
    }

    return <div className="text-white px-5 py-8 flex flex-col gap-4 items-center">
        <div>
            <a className="text-white text-xl" href="/">{'Profile'}</a>
        </div>
        <div className="relative flex flex-col gap-2 items-center">
            <Avatar logo={user.data.profileImage ? user.data.profileImage : null} />
            <label className="block text-sky-600 cursor-pointer">
                <span>Choose profile photo</span>
                <input value={profile} type="file" class="hidden" onChange={async (e) => {
                    let formData = new FormData()
                    formData.append("profileImage", e.target.files[0], e.target.files[0].name)
                    await uploadProfile(formData)
                }} />
            </label>
        </div>
        <form className="flex flex-col gap-5 w-1/2" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1">
                <span className="font-bold">Name</span>
                <Input name={"name"} value={name} onChange={({ target }) => { setName(target.value) }} />
            </div>
            <div className="flex flex-col gap-1">
                <span className="font-bold">Email</span>
                <Input disabled={true} name={"email"} value={email} onChange={({ target }) => { setEmail(target.value) }} />
            </div>
            <div className="flex flex-col gap-1">
                <span className="font-bold">Date of registration</span>
                <Input disabled={true} value={new Date(registerDate).toDateString()} />
            </div>
            {edited && <div className="flex flex-col gap-1 w-1/2 self-center">
                <Button content={"Save"} type={"submit"} loading={loading} />
            </div>}

        </form>

        <div className="mt-5 text-sky-600 cursor-pointer" onClick={()=>setShowPasswordChange((prev)=>!prev)}>{showPasswordChange?"Cancel password change":"Change password"}</div>
       {showPasswordChange && <form className="mt-5 flex flex-col gap-5 w-1/2" onSubmit={handlePasswordUpdate}>
       <div className="flex flex-col gap-1">
                <span className="font-bold">Current password</span>
                <Input type={'password'} name={"Current Password"} value={currentPassword} onChange={({ target }) => { setCurrentPassword(target.value) }} />
            </div>
            <div className="flex flex-col gap-1">
                <span className="font-bold">New password</span>
                <Input type={'password'} name={"New Password"} value={newPassword} onChange={({ target }) => { setNewPassword(target.value) }} />
            </div>
            <div className="flex flex-col gap-1">
                <span className="font-bold">Confirm password</span>
                <Input type={'password'} name={"Confirm Password"} value={confirmPassword} onChange={({ target }) => { setConfirmPassword(target.value) }} />
            </div>
            <div className="flex flex-col gap-1 w-1/2 self-center">
                <Button content={"Update password"} type={"submit"} loading={passwordLoading} />
            </div>
        </form>}
    </div>
}

export default Profile