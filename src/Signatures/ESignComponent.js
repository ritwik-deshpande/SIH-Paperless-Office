import React from 'react';
import CreateESign from './CreateESign'
import {connect } from 'react-redux'
import {saveSign} from  '../Actions/UserAction'
import SearchBar from 'material-ui-search-bar'
import api from '../utils/api'
import Button from '@material-ui/core/Button';
import Profile from './Profile'
import Calendar from '../Calendar/Calendar'
import MyProfileHeader from '../Headers/MyProfileHeader'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import style from '../StyleSheet'
import Switch from '@material-ui/core/Switch';

import { withStyles, Tooltip } from '@material-ui/core';
import {
	AppBar,
	Toolbar,
	ButtonGroup,
	Box,
	TextField
} from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import TimeStamp from '../utils/TimeStamp';

class ESignComponent extends React.Component{


	constructor(props){
      super(props);
      this.state = {
        userObj: this.props.userObj,
        updateProfile : false,
        viewProfile: JSON.parse(JSON.stringify(this.props.userObj)),
		value : "",
		cannotUpdate : false,
		checkedA : false
      };
      console.log(this.state);
  	}


    updateUser= (userObj) =>{
    
    	console.log("New Object", userObj)
    	
        this.props.saveSign(userObj)
        
    }
    onUpdateClick = () => {

		this.setState({
			updateProfile : true
		})
    }
 
    handleLeave = (e) => {
		const payload = {onleave: e.target.checked,
			nominators : [this.state.userObj.id],
			nominee : "AP003",
			datefrom: new Date().getTime().toString(),
			dateto : new Date().getTime().toString()}
		var bool = e.target.checked
		console.log(payload)
			api.leave().post(this.state.userObj.id,payload ).then((res)=>{

				if(res && res.data.allowed)
				{
					this.setState({
						checkedA: bool
					})
				}
				else
				{
					this.setState({
						checkedA: !bool
					})
				}
			})
		
	}
	
	handleBackButton = () => {
	
		this.setState({
			updateProfile : false
		})
	
	}
  
    handleSearch = () =>{
        console.log("The userid to search",this.state.value)
        let id = this.state.value
        console.log("The user",this.state.userObj)
        if(id === "")
		{
			alert("User Not Found")
		}
		else{
			 api.users().getByid(id).then( res => {
		    	if (res && res.data){
		    	
		    		console.log(res.data)
		    		this.setState({
		    			viewProfile : res.data
		    		})
		    		
		    		if(id === this.state.userObj.id){
						this.setState({
								cannotUpdate : false,
								userObj : res.data
				
							})
			
						}else{
							this.setState({
								cannotUpdate : true
				
							})
						}  		    	
		    	}
		    
		    })
		    .catch( err =>{
		    	alert("User Not Found")
		    });

		}
	}
	

    handleChange =(newValue) => {

		console.log("The value is", newValue)
		this.setState({
			value : newValue
		})		
  	
	}

    render(){
		const { classes } = this.props 
        return(
            <div>
			<MyProfileHeader title="User Profile"/>		
               
			{ this.state.userObj ?

		( this.state.updateProfile ?

		(<><AppBar className={classes.appBar}>
			<Toolbar >
				<Box display="flex" flexGrow={1}>
					<Button
						edge="start"
						autoFocus
						color="inherit"
						onClick={this.handleBackButton}
						startIcon={<ArrowBackIosIcon />}>
						Back
					</Button>
				</Box>
			</Toolbar>
		</AppBar>

		<CreateESign saveUser={this.updateUser} userObj={this.state.userObj}/> </>): 
		
		<div>
			{ !this.state.cannotUpdate ?
			<>	
			<Button variant="contained" color="primary" onClick = { this.onUpdateClick } style={{margin: "16px 26px"}}>
			UPDATE YOUR PROFILE 
			</Button>
			<Switch
			checked={this.state.checkedA}
			onChange={this.handleLeave}
			name="checkedA"
			inputProps={{ 'aria-label': 'secondary checkbox' }}
		  />
		  </>
			:
			null }
			<Profile userObj = {this.state.viewProfile} />
		{/* <Calendar userObj = {this.state.viewProfile}  /> */}
		

		</div>
		) : 

		<div>
              	<h5>Initializing UserObject</h5>
            	</div>}

	  </div>
            
        )
    }
}

const mapDispatchtoProps = (dispatch) =>{
    return{
      saveSign : (userObj) => dispatch(saveSign(userObj))
      }
}


export default connect(null,mapDispatchtoProps)(withStyles(style,{ withTheme: true})(ESignComponent))
