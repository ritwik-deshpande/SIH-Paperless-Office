import React from 'react';
import CreateESign from './CreateESign'
import {connect } from 'react-redux'
import {saveSign} from  '../Actions/UserAction'
import SearchBar from 'material-ui-search-bar'
import api from '../utils/api'
import Button from '@material-ui/core/Button';
import Profile from './Profile'
import Calendar from '../Calendar/Calendar'
import Header from '../Header'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import style from '../StyleSheet'
import { withStyles, Tooltip } from '@material-ui/core';

class ESignComponent extends React.Component{


	constructor(props){
      super(props);
      this.state = {
        userObj: this.props.userObj,
        updateProfile : false,
        viewProfile: JSON.parse(JSON.stringify(this.props.userObj)),
		value : "",
		cannotUpdate : false
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
 
    

  
    handleSearch = () =>{
        console.log("The userid to search",this.state.value)
        let id = this.state.value
        console.log("The user",this.state.userObj)
        
             
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
			<Header title="User Profile"/>
		 
			 <Paper className={classes.headerSearchBox} elevation={0} square>
			 <Grid container spacing={3} direction="row" justify="flex-start" alignItems="flex-start">
				 <Grid item xs={7} sm={8} md={10}>
					<Tooltip title="Search a User by ID" arrow placement="top-start">
						<SearchBar
						placeholder = "Search a User by ID"
						value = {this.state.value}
						onChange={(newValue) => this.handleChange(newValue)}
						onRequestSearch={() => this.handleSearch(this.state.value)}
						fullWidth
						/>
					</Tooltip>
				</Grid>
			  	<Grid item xs={5} sm={4} md={2}>
					<Button variant="contained" color="secondary" onClick = { this.handleSearch } fullWidth>
					GET PROFILE 
					</Button>
				</Grid>
			</Grid>
			</Paper>
		
	

		
               { this.state.userObj ?

		( this.state.updateProfile ?

		<CreateESign saveUser={this.updateUser} userObj={this.state.userObj}/> : 
		
		<div>
			{ !this.state.cannotUpdate ?	
			<Button variant="contained" color="primary" onClick = { this.onUpdateClick } style={{margin: "16px 26px"}}>
			UPDATE YOUR PROFILE 
			</Button> : null }
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
