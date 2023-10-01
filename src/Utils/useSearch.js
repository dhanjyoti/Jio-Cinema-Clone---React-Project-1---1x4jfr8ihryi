import { useNavigate } from "react-router-dom"

const useSearch = ()=>{
    const navigate = useNavigate()

    const search = (text)=>{

        let params = ''
        if(text){
            params = '&search='+encodeURIComponent(text)
        }

        console.log(params, "...params");

     navigate('/?'+params)
    }
    
    return {search}
}

export default useSearch