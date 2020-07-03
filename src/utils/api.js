import axios from "axios";
import { getQueriesForElement } from "@testing-library/react";

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
    pending_request(){
      return {
        get : (id) => {return `${Endpoint}/${"pending_requests"}?id=${id}`}
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

    users(url){
      return {
        get :(username) => {return `${Endpoint}/${url}?username=${username}`},
        update : (id) => {return `${Endpoint}/${url}/${id}`}
      }
    },
    getWorkFlow(url){
      return {
        get :(username,title) =>{ return `${Endpoint}/${url}?User=${username}&Title=${title}`},
        getByid : (id) => {return `${Endpoint}/${url}?wrkflwid=${id}`}
      }
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
    },        
}