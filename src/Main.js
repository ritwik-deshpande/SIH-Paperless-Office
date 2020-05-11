import React, { Component } from 'react'
import Dashboard from './Dashboard'
import SignIn from './SignIn'

import {Provider} from 'react-redux'
import store from './reducers/ReduxStore'
import api from './utils/api'
import axios from 'axios';



export default class Main extends Component {

    SignInFunction = (username,password) =>{

        console.log("The username"+username)
        console.log("The password"+password)

        axios.get(api.users("users").get(username)).then(
            res =>{
                console.log("The user",res.data[0])

                if(res.data.length== 0){
                    alert("Invalid Username");
                }
                else if(password.localeCompare(res.data[0].password)==0){

                    api.setUser(res.data[0])
                    api.setSession(true)
                    this.setState({
                        loggedIn:true
                    })
                    
                }
                else{
                    alert("Invalid Password");
                }
            
            })

        


    }

    state = {
        loggedIn:api.getSession()
    }
    render() {
        return (
            <div>
            {this.state.loggedIn ? <Provider store = {store}> <Dashboard /> </Provider> : <SignIn signin = {this.SignInFunction}/>}
                
            </div>
        )
    }
}
