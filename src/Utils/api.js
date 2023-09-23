import http from "./http"

const getShows = async () => {
   return (await http.get("ott/show?limit=100")).data
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

const api = {
    getShows,
    getShow,
    getWishlist,
    addToWishlist,
    register,
    login
}

export default api;