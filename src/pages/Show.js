import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../Utils/api";
import Button from "../components/Button"
import { titleCase } from "../Utils/commons";
import useUser from "../Utils/useUser";

const ShowDetail = ({ show }) => {
    return <>
        <div className="flex flex-col flex-1">
            <div className="text-2xl font-bold">{show.title}</div>
            <div className="flex flex-row gap-3 items-center text-xs pt-3">
                {show.keywords.map((key, index) => {
                    if (index > 0 && index < show.keywords.length) {
                        return <div key={key} className="flex flex-row gap-3 items-center text-xs">
                            <div className="w-1 h-1 rounded-full bg-white"></div>
                            <div>{titleCase(key)}</div>
                        </div>
                    }
                    return <div key={key}>{titleCase(key)}</div>
                })}
            </div>
            <div className="pt-2">{show.description}</div>
        </div>
        <div className="flex flex-col text-sm">
            <div>Cast</div>
            <div>{show.cast.join(', ')}</div>
        </div>
    </>
}
const Show = () => {
    let [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate()
    const [show, setShow] = useState(null)
    const [wishListLoading, setWishListLoading] = useState(false)
    const [isInWishList, setIsInWishlist] = useState(true);
    const { user } = useUser()

    // api called for getting shows


    const checkWishlist = async () => {
        try {
            const res = await api.getWishlist()
            setIsInWishlist(!!res.data.shows.find((s) => s._id === searchParams.get('id')))
        } catch {

        }
    }

    useEffect(() => {
        if (searchParams.get('id')) {
            (async () => {
                let res = await api.getShow(searchParams.get('id'))
                if (res) {
                    setShow(res.data)
                } else {
                    console.log("Error fetching show")
                }

                if (!!user) {
                    await checkWishlist()
                }

            })()
        }

    }, [])
    if (!show) {
        return null
    }



    return <div className="md:pt-[30%] relative">
        <div className="relative md:absolute top-0 left-0 right-0  md:inset-0">
            <img src={show.thumbnail} className="max-h-[40vh] md:max-h-full aspect-video w-full h-full object-cover object-top" />
            {user && <div className="md:hidden relative w-fit -mt-5 mx-5 z-30">
                <Button loading={wishListLoading} content={isInWishList ? "Go to wishlist" : "Add to wishlist"} onClick={() => {
                    if (!isInWishList) {
                        (async () => {
                            try {
                                setWishListLoading(true)
                                await api.addToWishlist(searchParams.get('id'))
                                navigate("/wishlist")
                            } catch (error) {

                            } finally {
                                setWishListLoading(false)
                            }
                        })()
                    } else {
                        navigate("/wishlist")
                    }
                }} />
            </div>}
            <div className="md:hidden md:absolute p-5 py-10 flex flex-col gap-5 text-white">
            <ShowDetail show={show}/>
            </div>
        </div>
        <div style={{
            background: "linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.2) 100%)"
        }} className="hidden pl-5 pr-20 py-7 gap-10 md:flex flex-row items-start relative z-10 text-white">
            {user && <div className="w-[180px]">
                <Button loading={wishListLoading} content={isInWishList ? "Go to wishlist" : "Add to wishlist"} onClick={() => {
                    if (!isInWishList) {
                        (async () => {
                            try {
                                setWishListLoading(true)
                                await api.addToWishlist(searchParams.get('id'))
                                navigate("/wishlist")
                            } catch (error) {

                            } finally {
                                setWishListLoading(false)
                            }
                        })()
                    } else {
                        navigate("/wishlist")
                    }
                }} />
            </div>}
            <ShowDetail show={show}/>
        </div>
    </div>
}

export default Show