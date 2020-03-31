import axios from "axios";

const Endpoint = "http://localhost:3030"
export default {
    posts(url) {
        return {
          getOne: ({ id }) => axios.get(`${url}/${id}`),
          getAll: () => {return `${Endpoint}/${url}`},
          update: (toUpdate) =>  axios.put(url,toUpdate),
          create: (toCreate) =>  axios.put(url,toCreate),
          delete: ({ id }) =>  axios.delete(`${url}/${id}`)
        }
      },
    forms(url){
      return {

        get : (title) => {return `${Endpoint}/${url}?title=${title}`}
      }
    }  
    }