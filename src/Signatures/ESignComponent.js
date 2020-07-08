import React from 'react';
import CreateESign from './CreateESign'
import {connect } from 'react-redux'
import {saveSign} from  '../Actions/UserAction'
import SearchBar from 'material-ui-search-bar'
import api from '../utils/api'
import Button from '@material-ui/core/Button';
import Profile from './Profile'

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
    
        this.setState({
			userObj : userObj,
			updateProfile : false,
			
		})
    
    	
    	this.props.saveSign(userObj)
    	alert("Updated User Successfully !")
    
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
        return(
            <div>

	 
		<br/>
		<br/>
		<br/>

		<br/>
	
		<br/>
		 <SearchBar
		    placeholder = "Search User Profile, Type in the ID"
		    value = {this.state.value}
		    onChange={(newValue) => this.handleChange(newValue)}
		    onRequestSearch={() => this.handleSearch(this.state.value)}
		    style={{
			margin: 20,
			width: 1000
		      }}
		  />
		<Button variant="contained" color="primary" onClick = { this.handleSearch } style={{ marginLeft: 50 }} >
		  GET PROFILE 
		</Button>

		
               { this.state.userObj ?

		( this.state.updateProfile ?

		<CreateESign saveUser={this.updateUser} userObj={this.state.userObj}/> : 
		<div>
		<Profile userObj = {this.state.viewProfile} />
		
		{ !this.state.cannotUpdate ?
		<Button variant="contained" color="primary" onClick = { this.onUpdateClick } style={{ margin: 20 }} >
		  UPDATE YOUR PROFILE 
		</Button> : null }

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


export default connect(null,mapDispatchtoProps)(ESignComponent)
