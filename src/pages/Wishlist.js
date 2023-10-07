import { useNavigate } from "react-router-dom"
import useUser from "../Utils/useUser"
import { useEffect, useState } from "react"
import api from "../Utils/api"
import Card from "../components/Card"

const Wishlist = () => {
    const [showCollection, setShowCollection] = useState([])
    const [removing, setRemoving]= useState(null)
    const [fetch, setFetch]=useState(true)
    const { user } = useUser()
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

    // Fetched all wishlists from backend
    useEffect(() => {
        if(fetch){
            (async () => {
                try {
                    let res = await api.getWishlist()
                    setShowCollection(res.data.shows)
                    console.log(res.data.shows);
                } catch {
                    console.log("Error fetching wishlists")
                }finally{
                    setFetch(false)
                }
            })()
        }

    }, [fetch])

    
    return (
        <div className="flex flex-col gap-4 px-5 text-white">
            <a className="text-white text-xl " href="/">&lsaquo;{' Home'}</a>
            {/* show following message if wishlist is empty */}
            {showCollection.length === 0 && <div className="flex items-center justify-center">
                No shows in wishlist.
                </div>}

                {/* Display all wishlist if there are wishlists in api. */}
            <div className="flex flex-row items-center gap-3 flex-wrap w-full">
            {showCollection && showCollection.map((show) => {
                return <div key={show._id} className=" group/card  relative">
                    <Card loading={removing === show._id} onClick={() => {
                        navigate("/show?id=" + show._id)
                    }} thumbnail={show.thumbnail} key={show._id} />
                    <button onClick={async ()=>{
                        setRemoving(show._id)
                        await api.addToWishlist(show._id)
                        setRemoving(null)
                        setFetch(true)
                    }} className="invisible group-hover/card:visible w-6 h-6 bg-gray-500 shadow-2xl flex items-center justify-center rounded-full absolute right-0 top-0 text-white -mt-2 -mr-2">×</button>
                </div>
            })}
        </div>
        </div>
    )
}

export default Wishlist