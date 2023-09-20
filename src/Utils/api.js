import http from "./http"

const getShows = async () => {
   return (await http.get("ott/show?limit=100")).data
}


const api = {
    getShows
}

export default api;