// This is a custom hook, made by own

import { useNavigate } from "react-router-dom"

const   useSearch = ()=>{
    const navigate = useNavigate()

    const search = (text)=>{

        let params = ''
        if(text){
            params = '&search='+encodeURIComponent(text)    // encode is used since we cannot use reserved character in search parameter Eg-> &, $ -> inside the url -> should be encoded
        }

        console.log(params, "...params");

        //this changes the url of current page /(append search data to current url.)

     navigate('/search/?'+params)
    }
    
    return {search}
}

export default useSearch