import AxiosDefault from "axios"

const getToken = ()=> {
    try{
       return  JSON.parse(localStorage.getItem('user'))?.token
    }catch{
        return null
    }
}
const http = AxiosDefault.create({
    baseURL: 'https://academics.newtonschool.co/api/v1/',
    headers: {
        projectId: "f104bi07c490",
        Authorization: `Bearer ${getToken()}`,
    }
  });

  export default http

