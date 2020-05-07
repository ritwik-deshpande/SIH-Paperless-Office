import React from 'react'
import AlignItemsList from '../Approvals/AlignItemsList'
import CreatePDF from './CreatePDF'

class ApproveComponent extends React.Component{

    constructor(props){
        super(props);
      this.state = {
        showPDF: false,
        item :null

      };
      console.log(this.state);
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
            {this.state.showPDF ? 
            
            (<CreatePDF item={this.state.item} Doc = {null}/>) 

            : 
            
            (<AlignItemsList Click={this.handleClick}/>)
            }
            
            
            </div>
        )
    }
}
export default ApproveComponent;