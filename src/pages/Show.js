import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../Utils/api";
import Button from "../components/Button"
import { titleCase } from "../Utils/commons";

const Show = () => {
    let [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate()
    const [show, setShow] = useState(null)
    const [wishListLoading, setWishListLoading]=useState(false)

    // api called for getting shows

    useEffect(() => {
        if (searchParams.get('id')) {
            (async () => {
                let res = await api.getShow(searchParams.get('id'))
                if (res) {
                    setShow(res.data)
                    console.log(res.data)
                } else {
                    console.log("Error fetching show")
                }
            })()
        }

    }, [])
    console.log(searchParams.get('id'));
    if (!show) {
        return null
    }



    return <div className="pt-[30%] relative">
        <div className="absolute inset-0 bg-red-300">
            <img src={show.thumbnail} className="w-full h-full object-cover" />
        </div>
        <div style={{
            background: "linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.2) 100%)"
        }} className="pl-5 pr-20 py-7 gap-10 flex flex-row items-start relative z-10 text-white">
            <div className="w-[180px]">
                <Button loading={wishListLoading} content={"Add to wishlist"} onClick={()=>{
                    (async()=>{
                        try {
                            setWishListLoading(true)
                           await api.addToWishlist(searchParams.get('id'))
                           navigate("/wishlist")
                        } catch (error) {
                            
                        }finally{
                            setWishListLoading(false)
                        }
                    })()
                }}/>
            </div>
            <div className="flex flex-col flex-1">
                <div className="text-2xl font-bold">{show.title}</div>
                <div className="flex flex-row gap-3 items-center text-xs pt-3">
                    {show.keywords.map((key, index) => {
                        if (index > 0 && index < show.keywords.length) {
                            return <>
                                <div className="w-1 h-1 rounded-full bg-white"></div>
                                <div>{titleCase(key)}</div>
                            </>
                        }
                        return <div>{titleCase(key)}</div>
                    })}
                </div>
                <div className="pt-2">{show.description}</div>
            </div>
            <div className="flex flex-col text-sm">
                <div>Cast</div>
                <div>{show.cast.join(', ')}</div>
            </div>
        </div>
    </div>
}

export default Show