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
    todo_list(){
      return {
        get : (id) => axios.get(`${Endpoint}/todo_list/${id}`),
	update :(id, payload) => axios.put(`${Endpoint}/todo_list/${id}`,payload)
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
    workFlow(){
      return {
        get :(username,title) =>{ return `${Endpoint}/workflow?User=${username}&Title=${title}`},
        getByid : (id) => axios.get(`${Endpoint}/workflow/${id}`),
        post : (payload) => axios.post(`${Endpoint}/workflow`,payload),
        put : (id,payload) => axios.put(`${Endpoint}/workflow/${id}`,payload)
      }
    },
    
    saveMenu(url,id){
      return {
        put :(payload) => axios.put(`${Endpoint}/${url}/${id}`,payload)
      }
    },

    notification(){
      return {
        get : (id) => axios.get(`${Endpoint}/notifications/${id}`)
    }
    }
          
}
