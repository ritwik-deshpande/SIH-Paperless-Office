import React, { Component } from 'react'
import Dashboard from './Dashboard'
import SignIn from './SignIn'
import { connect } from 'react-redux'
import {GetUser, logout} from './Actions/UserAction'

class Main extends Component {

  SignInFunction = (username,password) =>{


    console.log("The username"+username)
    console.log("The password"+password)
    this.props.getUser(username,password);
  }

  SignOutFunction = () =>{

    this.props.logout(this.props.userObj);
  }

  render() {
    console.log(this.props)
      return (
        <div>
        {this.props.loggedIn ?  
        <Dashboard userObj={this.props.userObj} logout= {this.SignOutFunction} />  
        : 
        <SignIn signin = {this.SignInFunction}/>}
        </div>
      )
  }
}

const mapDispatchtoProps = (dispatch) =>{
  return{
    getUser : (username, password) => dispatch(GetUser(username,password)),
    logout : (userObj) => dispatch(logout(userObj))
    }
}

const mapStatetoProps = (state) =>{

  return{
    userObj: state.auth.userObj,
    loggedIn : state.auth.loggedIn
  }
}
export default connect(mapStatetoProps, mapDispatchtoProps)(Main);
