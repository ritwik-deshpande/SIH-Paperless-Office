import React, { Component } from 'react'
import Dashboard from './Dashboard'
import SignIn from './SignIn'
import { connect } from 'react-redux'
import {GetUser} from './Actions/UserAction'

class Main extends Component {

  SignInFunction = (username,password) =>{


    console.log("The username"+username)
    console.log("The password"+password)
    this.props.getUser(username,password);
  }

  render() {
    console.log(this.props)
      return (
        <div>
        {this.props.loggedIn ?  
        <Dashboard userObj={this.props.userObj}/>  
        : 
        <SignIn signin = {this.SignInFunction}/>}
        </div>
      )
  }
}

const mapDispatchtoProps = (dispatch) =>{
  return{
    getUser : (username, password) => dispatch(GetUser(username,password))




//         console.log("The username"+username)
//         console.log("The password"+password)

//         axios.get(api.users("users").get(username)).then(
//             res =>{
//                 console.log("The user",res.data[0])

//                 if(res.data.length== 0){
//                     alert("Invalid Username");
//                 }
//                 else if(password.localeCompare(res.data[0].password)==0){

//                     api.setUser(res.data[0])
//                     api.setSession(true)
//                     this.setState({
//                         loggedIn:true
//                     })
//                     console.log("user obj = " + api.getUser())
//                 }
//                 else{
//                     alert("Invalid Password");
//                 }
            
//             })

        


    }

    state = {
      //loggedIn : api.getSession
      // For developement purpose skipped the logIn and used dummy user obejct
      // in api.js called using separate method api.getDummyUser()
        loggedIn:true

    }
}
const mapStatetoProps = (state) =>{

  return{
    userObj: state.auth.userObj,
    loggedIn : state.auth.loggedIn
  }
}
export default connect(mapStatetoProps, mapDispatchtoProps)(Main);
