import { useEffect, useState } from "react";
import useUser from "../Utils/useUser";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../Utils/api";
import { titleCase } from "../Utils/commons";

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
        </div>
    </>
}

const Watch = ()=>{
    let [searchParams, setSearchParams] = useSearchParams();
    const [show, setShow] = useState(null)
    const { user } = useUser()
    const navigate = useNavigate()

    //navigate to home if there is no user logged in
    useEffect(() => {
        if (!user) {
            navigate("/")
        }
    }, [user])


    useEffect(() => {
        if (searchParams.get('id')) {
            (async () => {
                let res = await api.getShow(searchParams.get('id'))
                if (res) {
                    setShow(res.data)
                } else {
                    console.log("Error fetching show")
                }
            })()
        }

    }, [])
    if (!show || !user) {
        return null
    }
    return <div className="h-[calc(100vh-172px)]">
        <video className="h-full w-full" controls src={show.video_url}/>
        <div className="p-5 border-b border-white/30">
            <ShowDetail show={show}/>
        </div>
    </div>
}

export default Watch