import React, {Component} from 'react'
import ReactLoading from 'react-loading'
import {withRouter} from 'react-router-dom'

let initState = {
    userObj: null,
    loggedIn : false
}

if(sessionStorage.getItem("user"))
{
    initState = {
    userObj: JSON.parse(sessionStorage.getItem("user")),
    loggedIn : true
    }
    console.log(initState)
}



const authReducer = (state = initState, action) =>{

    switch (action.type){
        case 'USER_VERIFIED':
            console.log("user verified :" + action.payload)
            sessionStorage.setItem("user",JSON. stringify(action.payload))
            return{
                ...state,
                userObj : action.payload,
                loggedIn : true,
            }
        case 'INVALID_PASSWORD' :
            console.log("invalid password :" + action.payload)
            return{
                ...state,
                userObj : action.payload,
                loggedIn : false,
            }
        case 'SAVE_SIGN':
            return{
                ...state,
                userObj: action.payload,
            }
        default :
            return state
    }
}

export default authReducer;
