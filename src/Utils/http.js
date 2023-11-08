import AxiosDefault from "axios"

const http = AxiosDefault.create({
    baseURL: 'https://academics.newtonschool.co/api/v1/',
    headers: {
        projectId: "1x4jfr8ihryi",
    }
  });

  http.interceptors.request.use((config)=>{
    config.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('user'))?.token}`
    return config
  }, (error)=> Promise.reject(error))

  export default http;

