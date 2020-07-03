import React from 'react';
import CreateESign from './CreateESign'
import {connect } from 'react-redux'
import {saveSign} from  '../Actions/UserAction'

class ESignComponent extends React.Component{


	constructor(props){
      super(props);
      this.state = {
        userObj: this.props.userObj
      };
      console.log(this.state);
  	}


    updateUser= (userObj) =>{
    
        this.setState({
			userObj : userObj
		})
    
    	
    	this.props.saveSign(userObj)
    	alert("Updated User Successfully")
    
    }


    render(){
        return(
            <div>{ this.state.userObj ? <CreateESign saveUser={this.updateUser} userObj={this.state.userObj}/> : <div>
              <h5>Initializing UserObject</h5>
            </div>}</div>
            
        )
    }
}

const mapDispatchtoProps = (dispatch) =>{
    return{
      saveSign : (userObj) => dispatch(saveSign(userObj))
      }
}


export default connect(null,mapDispatchtoProps)(ESignComponent)
