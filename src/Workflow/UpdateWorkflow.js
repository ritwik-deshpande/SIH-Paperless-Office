import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import NestedList from './WorkflowComponents/NestedList';
import { makeStyles } from '@material-ui/core/styles';
import FormComponent from '../Forms/FormComponent'
import DisplayWorkflow from './DisplayWorkflowComponent';
import axios from 'axios';
import api from '../utils/api';
import TextField from '@material-ui/core/TextField';
import CustomForm from '../Forms/CustomForms'
import Container from '@material-ui/core/Container';
import ReformatWorkFlow from '../utils/ReformatWorkflow'
import { connect } from 'react-redux'
import Timestamp from '../utils/TimeStamp'


class UpdateWorkflow extends Component
{

	constructor(props){
      super(props);
      this.state = {
        FormData : null,
        FlowChart : null,
        selectedTitle : "",
        selectedId : this.props.selectedId
      };
      console.log(this.state);
  }
	postRequest = () =>{
    //TODO: Create post request to db.json
    if(!this.state.FormData)
    {
      alert("Please Submit the Form First");
    }
    else if(!this.state.FlowChart)
    {
      alert("Please Save the FlowChart First");
    }
    else{
      
      let payload = this.props.wrkflw
      let old_object = JSON.parse(JSON.stringify(this.props.wrkflw))
      console.log("The old object" ,old_object)
      
      let old_version = payload.id
      payload.id  = old_version.split('v')[0] + 'v' + (parseInt(old_version.split('v')[1]) + 1)

       
      payload.FlowChart = this.state.FlowChart
      payload.FormData = this.state.FormData
      
      console.log("The Payload",payload);
      console.log(this.props)
      payload.state = "active"
      payload.start_timestamp = Timestamp.getTimestamp()
      
      
      
      
     api.workflow("workflow").post(payload).then(res =>{
        console.log(res);
        console.log("Older version",old_object)
		alert("Workflow Updated Successfully.\n Your new Workflow id is"+payload.id)

        this.props.onUpdate(old_version, old_object)
      })

    }
    
    
  }

	  saveFormData = (FormData) =>
	  {
		console.log("Saving Form")
		console.log(FormData);
		alert("Saved Form Response")
		this.setState({
		  FormData : FormData
		})
	  }
	  


	  saveFlowChartData = (chart) =>
	  {
		console.log("Saving FlowChart")
		console.log(chart)
		alert("Saved Flowchart Response")
		chart = ReformatWorkFlow.reformat(chart)
		this.setState({
		  FlowChart : chart
		})
	  }
	
	render(){

		return(
		<div>
			<Container maxWidth="lg">
			
			
			<div>
            
            <FormComponent title={this.state.selectedTitle} id={this.state.selectedId} save={this.saveFormData} />

            <br/>

            <DisplayWorkflow title={this.state.selectedTitle} id={this.state.selectedId} save={this.saveFlowChartData}/>
         <br/>
            <Button
              variant="contained"
              color="primary"
              onClick = {this.postRequest}>
            
              Update and Restart Workflow
            </Button>
          </div>

			  
			</Container>
		</div>)
	  }
	
	
}

const mapStatetoProps = (state) =>{

    return{
      userObj: state.auth.userObj,
      loggedIn : state.auth.loggedIn
    }
  }
  export default connect(mapStatetoProps, null)(UpdateWorkflow);

