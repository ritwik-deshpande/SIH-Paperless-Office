import React from 'react';
import WorkflowTable from './MyWorkflowsTable';
import api from '../utils/api'
import axios from 'axios'

class MyWorkflow extends React.Component{

    constructor(props){
        super(props);
      this.state = {
        showPDF: false,
        item :null,
	myworkflows : null,
        tableData : [],
        tableCreated: false
      };
      
    }
    componentDidMount(){
        api.myworkflows().get(this.props.userObj.username)
        .then(res => {
          console.log('The data received is',res.data)
          this.setState({
              myworkflows : res.data,
              
          })
	  this.initTable(this.state.myworkflows)
        })

    }
    initTable(myworkflows){
	let tableData = [
	  { id: '3', wname: 'Tech Sec Application', status: 'Intermediate', lastappr: 'Dr. R.B. Keskar', time: 10},
	]
	let i = 0
	for(i = 0; i< myworkflows.length ; i++){
		this.state.tableData.push( {
		id : myworkflows[i].id,
		wname : myworkflows[i].Title,
		status :myworkflows[i].status,
		lastfeedback : myworkflows[i].Feedback,
		time: myworkflows[i].Feedback_ts,
		index_no : i})
	}
	console.log(this.state.tableData)
	this.setState({
		tableCreated : true
	})
    }
    handleClick = (index) => {
        
        console.log(index);
	console.log(this.state.myworkflows[index])
        this.props.handleSubmit(this.state.myworkflows[index])
        
    }
    render(){
        return(
            <div>
                
            {this.state.tableCreated ? 
            
            (<WorkflowTable Click={this.handleClick} userObj={this.props.userObj} myworkflowsTable={this.state.tableData}/>)
            
        : <div> Fetching My Workflows </div>}
            
            
            </div>
        )
    }
}
export default MyWorkflow;
