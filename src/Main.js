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
    }
}
const mapStatetoProps = (state) =>{

  return{
    userObj: state.auth.userObj,
    loggedIn : state.auth.loggedIn
  }
}
export default connect(mapStatetoProps, mapDispatchtoProps)(Main);
