import React, { Component } from 'react'
import Dashboard from './Dashboard'
import SignIn from './SignIn'
import { connect } from 'react-redux'
import {GetUser, logout} from './Actions/UserAction'
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        DigiDocs
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
class Main extends Component {

  
  SignInFunction = (id,password) =>{

    console.log("The id"+id)
    console.log("The password"+password)
    this.props.getUser(id,password);
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

<Box mt={5}>
              <Copyright />
            </Box>
        </div>
      )
  }
}

const mapDispatchtoProps = (dispatch) =>{
  return{
    getUser : (id, password) => dispatch(GetUser(id,password)),
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
