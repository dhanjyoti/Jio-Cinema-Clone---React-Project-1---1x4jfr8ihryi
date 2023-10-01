import { titleCase } from "./commons";
import http from "./http"

const getShows = async (type, search) => {
    let params = ''
    if(type || search){
        let title = search?{title:search}:{}
        let filter = JSON.stringify({...{type, ...title}})
        params = '&filter='+encodeURIComponent(filter)
    }


   return (await http.get(`/ott/show?limit=100`+params)).data
}

const getShow = async (id) => {
    return (await http.get("/ott/show/"+id)).data
 }

 const getWishlist = async ()=>{
    return (await http.get("/ott/watchlist/like")).data
 }

 const addToWishlist = async (id)=>{
    return (await http.patch("/ott/watchlist/like", {
        "showId" : id,
     })).data
 }
const register = async ({data})=>{
    return (await http.post("user/signup", data)).data
}

const login = async ({data})=>{
    return (await http.post("user/login", data)).data
}

const updateProfileImage = async ({data})=>{
    return (await http.patch("/user/updateProfileImage", data)).data
}

const updateMe = async ({data})=>{
    return (await http.patch("/user/updateMe", data)).data
}

const api = {
    getShows,
    getShow,
    getWishlist,
    addToWishlist,
    updateProfileImage,
    updateMe,
    register,
    login
}

export default api;