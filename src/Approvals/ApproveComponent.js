import React from 'react'
import AlignItemsList from '../Approvals/AlignItemsList'
import CreatePDF from './CreatePDF'

class ApproveComponent extends React.Component{

    constructor(props){
        super(props);
      this.state = {
        showPDF: false
      };
      console.log(this.state);
    }
    handleClick = (item) => {
        
        console.log(item);
        this.setState({
            showPDF : true
        })
    }
    render(){
        return(
            <div>
                <h1>API TEST </h1>
            {this.state.showPDF ? (<CreatePDF />) : (<AlignItemsList Click={this.handleClick}/>)}
            
            
            </div>
        )
    }
}
export default ApproveComponent;