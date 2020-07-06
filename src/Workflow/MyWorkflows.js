import React from 'react';
import AlignItemsList from '../Approvals/AlignItemsList';
import api from '../utils/api'
import axios from 'axios'

class MyWorkflow extends React.Component{

    constructor(props){
        super(props);
      this.state = {
        showPDF: false,
        item :null,
        json : {requests: ['a']},
        dataloaded: false
      };
      
    }
    componentDidMount(){
        api.myworkflows().get(this.props.userObj.id)
        .then(res => {
          console.log('The data received is',res.data[0])
          this.setState({
              json : res.data,
              
          })
        })

    }
    handleClick = (item) => {
        
        console.log(item);
        this.props.handleSubmit(item.id)
        
    }
    render(){
        return(
            <div>
                
            {this.state.json.requests ? 
            
            (<AlignItemsList Click={this.handleClick} userObj={this.props.userObj} json={this.state.json}/>)
            
        : null}
            
            
            </div>
        )
    }
}
export default MyWorkflow;