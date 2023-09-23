import { useNavigate } from "react-router-dom"
import useUser from "../Utils/useUser"
import { useEffect, useState } from "react"
import api from "../Utils/api"
import Card from "../components/Card"

const Wishlist = ()=>{
    const [showCollection, setShowCollection] = useState([])

    const {user}=useUser()
    const navigate = useNavigate()
    useEffect(()=>{
        if(!user){
            navigate("/")
        }
    },[user])

    if(!user){
        return null
    }

    useEffect(() => {
        (async () => {
            try{
                let res = await api.getWishlist()
                setShowCollection(res.data.shows)
            console.log(res.data.shows);
            }catch{
                console.log("Error fetching wishlists")
            }
        })()

    }, [])
    return (
        <div className="flex flex-col gap-2 w-full">
            {showCollection && showCollection.map((show)=>{
                return <div className="flex flex-row items-center gap-3 px-5 flex-wrap relative">
                <div className="relative group/card">
                <Card onClick={()=>{
                    navigate("/show?id="+show._id)
                    }} thumbnail={show.thumbnail} key={show._id}/>
                    <button className="invisible group-hover/card:visible w-6 h-6 bg-gray-500 shadow-2xl flex items-center justify-center rounded-full absolute right-0 top-0 text-white -mt-2 -mr-2">×</button>
                </div>
                </div>
            })}
        </div>
    )
}

export default Wishlist