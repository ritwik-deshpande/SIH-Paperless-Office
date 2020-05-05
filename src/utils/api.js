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
    },
    flowChart(url){
      return{

        get : (title) => {return `${Endpoint}/${url}?title=${title}`}
      }
    },
    menu(url){
      return `${Endpoint}/${url}`
      
    },

    saveMenu(url,id){
      return {
        put :(payload) => axios.put(`${Endpoint}/${url}/${id}`,payload)
      }
    },
    saveCustomFlowChart(url){
      return {
        post :(payload) => axios.post(`${Endpoint}/${url}`,payload)
      }
    },

    saveCustomForm(url){
      return {
        post :(payload) => axios.post(`${Endpoint}/${url}`,payload)
      }
    },
    workflow(url){
      return{

        post : (payload) => axios.post(`${Endpoint}/${url}`,payload)

      }
    }
    }