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
    users(){
      return {
        getByid :(id) => axios.get(`${Endpoint}/users/${id}`),
        get :(username) => axios.get(`${Endpoint}/users?username=${username}`),
        update : (id,payload) => axios.put(`${Endpoint}/users/${id}`,payload)
      }
    },
    pending_request(){
      return {
        get : (id) => axios.get(`${Endpoint}/pending_requests/${id}`)
      }
    },
    myworkflows(){
      return {
        get : (username) => axios.get(`${Endpoint}/workflow/?User=${username}`)
      }
    },
    forms(){
      return {

        get : (title) => axios.get(`${Endpoint}/forms?title=${title}`),
        getByid : (id) => axios.get(`${Endpoint}/forms/${id}`),
        post :(payload) => axios.post(`${Endpoint}/forms`,payload)
        
      }
    },
    flowChart(){
      return{

        get : (title) => {return `${Endpoint}/flowchart?title=${title}`},
        getByid : (id) => axios.get(`${Endpoint}/flowchart/${id}`),
        post :(payload) => axios.post(`${Endpoint}/flowchart`,payload)
      }
    },
    menu(){
      return {
        get : () => axios.get(`${Endpoint}/menu`),
        put :(id,payload) => axios.put(`${Endpoint}/menu/${id}`,payload)
    }
  },
    getWorkFlow(){
      return {
        get :(username,title) =>{ return `${Endpoint}/workflow?User=${username}&Title=${title}`},
        getByid : (id) => axios.get(`${Endpoint}/workflow/${id}`)
      }
    },
    updateWorkFlow(url, id){
	return{
	 put : (payload) => axios.put(`${Endpoint}/${url}/${id}`,payload)
		
	}
	
    },

    saveMenu(url,id){
      return {
        put :(payload) => axios.put(`${Endpoint}/${url}/${id}`,payload)
      }
    },
    
    workflow(url){
      return{

        post : (payload) => axios.post(`${Endpoint}/${url}`,payload)

      }
    },        
}
