import { useNavigate } from "react-router-dom"

const useSearch = ()=>{
    const navigate = useNavigate()

    const search = (text)=>{

        let params = ''
        if(text){
            params = '&filter='+encodeURIComponent(`{"title" : "${text?.toLowerCase()}"}`)
        }

     navigate('/?'+params)
    }
    return {search}
}

export default useSearch