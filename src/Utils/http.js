import AxiosDefault from "axios"
const http = AxiosDefault.create({
    baseURL: 'https://academics.newtonschool.co/api/v1/',
    headers: {
        projectId: "f104bi07c490"
    }
  });

  export default http

