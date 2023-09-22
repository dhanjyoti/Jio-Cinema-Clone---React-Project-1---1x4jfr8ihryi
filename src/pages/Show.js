import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../Utils/api";

const Show = () => {
    let [searchParams, setSearchParams] = useSearchParams();

    const [show, setShow] = useState(null)

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
    if(!show){
        return null
    }
    return <img src={show.thumbnail}/>
}

export default Show