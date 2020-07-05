import React from 'react'
import AlignItemsList from '../Approvals/AlignItemsList'
import CreatePDF from './CreatePDF'
import api from '../utils/api'
import axios from 'axios'
class ApproveComponent extends React.Component{

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
        api.pending_request().get(this.props.userObj.id)
        .then(res => {
          console.log('The data received is',res.data[0])
          this.setState({
              json : res.data,
              
          })
        })

    }
    handleClick = (item) => {
        
        console.log(item);
        this.setState({
            item : item,
            showPDF : true
        })
    }
    render(){
        return(
            <div>
                <h1>API TEST </h1>
            {this.state.json.requests ?(this.state.showPDF? 
            
            (<CreatePDF item={this.state.item} />) 

            : 
            (<AlignItemsList Click={this.handleClick} userObj={this.props.userObj} json={this.state.json}/>)
            )
        : null}
            
            
            </div>
        )
    }
}
export default ApproveComponent;