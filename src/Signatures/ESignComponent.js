import React from 'react';
import CreateESign from './CreateESign'
import {connect } from 'react-redux'
import {saveSign} from  '../Actions/UserAction'

class ESignComponent extends React.Component{

    render(){
        return(
            <CreateESign saveSign={this.props.saveSign} userObj={this.props.userObj}/>
        )
    }
}

const mapDispatchtoProps = (dispatch) =>{
    return{
      saveSign : (userObj) => dispatch(saveSign(userObj))
      }
}


export default connect(null,mapDispatchtoProps)(ESignComponent)