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
import WorkflowNode from '../utils/WorkflowNode'
import _ from 'lodash'
import useStyles from '../Style';
import {withStyles} from '@material-ui/core'

class UpdateWorkflow extends Component
{

	constructor(props){
      super(props);
      this.state = {
        FormData : this.props.FormData,
        FlowChart : null,
        selectedTitle : this.props.selectedTitle,
        formId : this.props.formId,
	flowchartId :this.props.flowchartId,
	    
      };
      console.log(this.state);
  }
	
    initPath(){

        let flowchart = this.state.FlowChart
        let Path = []
        let nodesList = []
        for(var node in flowchart){
	      if(flowchart[node].type.localeCompare("Start")===0){
	       Path = [...nodesList, node]
	       break;
	    }
            
       }
	// Plz write send request function
        //sendRequest(flowchart[Path[0].approvers])

	return Path

  }


	
	postRequest = () =>{
	let old_object = JSON.parse(JSON.stringify(this.props.wrkflw))
	let old_version =  old_object.id
	let payload = JSON.parse(JSON.stringify(this.props.wrkflw))
	let old_path = old_object.Path
	let alert_msg = ""
	if(!this.state.FormData)
    {
      alert("Please Submit the Form First");
    }
	else{
	
		if(!this.state.FlowChart){
			let current_node_key = payload.Path[payload.Path.length-1];
			payload["send_requests"] = []
			for(let approver in  payload.FlowChart[current_node_key].approvedBy){

				if(!payload.FlowChart[current_node_key].approvedBy[approver]){
					payload.FlowChart[current_node_key].timestamp[approver] = null;
				}
				payload["send_requests"] = [...payload['send_requests'], approver];

			}
			 payload.id = old_version.split('v')[0] + 'v' + (parseInt(old_version.split('v')[1]) + 1)
			 payload.FormData = this.state.FormData
			 
			 payload.Feedback =  "Resumed Workflow, Form Data Updated"
			 alert_msg = "Workflow Updated with same current Progress.\n Your new Workflow id is"+payload.id
		}
		else{	
		
			  payload = {

				"FormData" : this.state.FormData,
				"FlowChart" : this.state.FlowChart,
				"Comments" : [],
				"Path": this.initPath(),
				"nextNodes":[],
				"Signatures":{},
				"status" : "active",
				"begin_timestamp" : Timestamp.getTimestamp(new Date().getTime()),
				"end_timestamp" : "",
				"formId": this.props.formId,
				"flowchartId" :this.state.flowchartId,
				"Feedback" : "",
				"seals":{}, 
				"Feedback_ts": 0,
                                "priority": false,
				"User":old_object.User,
				"Title": old_object.Title,

				"id" : old_version.split('v')[0] + 'v' + (parseInt(old_version.split('v')[1]) + 1)


			  }
			  console.log("The Payload",payload);
			  payload["send_requests"] = WorkflowNode.getApprovers(payload.FlowChart[payload.Path[0]])
			  
				payload.Feedback =  "New Workflow Initiated"
				alert_msg = "Workflow Updated and Restarted .\n Your new Workflow id is"+payload.id
		 }
		 
		 payload.Feedback_ts = Timestamp.getTimestamp(new Date().getTime())
		 payload["cancel_requests"] = []
		 old_object.Feedback = "Updated to version "+payload.id
		 old_object.Feedback_ts = Timestamp.getTimestamp(new Date().getTime())
		 old_object["send_requests"] = [] 
		 old_object["cancel_requests"] = WorkflowNode.getApprovers(old_object.FlowChart[old_path[old_path.length - 1]])
	
		 console.log("The old object", old_object)
		 console.log("The payload", payload)
			 
			   api.workFlow().post(payload).then(res =>{
					console.log(res);
					console.log("Older version",old_object)
						alert(alert_msg)

					this.props.onUpdate(old_version, old_object)
				  }) 
    	}
     }

	  saveFormData = (FormData) =>
	  {
		console.log("Saving Form")
		console.log(FormData);
		alert("Updated Form Response")
		this.state.FormData = FormData
	  }
	  


	  saveFlowChartData = (chart) =>
	  {
		console.log("Saving FlowChart")
		console.log(chart)
		// Update Flowchart Table
		
		
		
		let reformated_chart = ReformatWorkFlow.reformat(chart)
		console.log("Workflow is changed, Saving updated structure")
			let NewFlowChart = {
		    "id":1,
		    "title":"FlowChart",
		    "chart":chart,
		  }
		  NewFlowChart.title = this.props.wrkflw.Title

		  NewFlowChart.id = Timestamp.getTSID()
		  this.state.FlowChart = reformated_chart
		  this.state.flowchartId = NewFlowChart.id
		  
		  console.log(NewFlowChart)
		  api.flowChart().post(NewFlowChart).then(res =>{
		    console.log(res);
		    alert("Updated Flowchart")
		  })
		
	  }
	
	render(){
		const {classes} = this.props
		return(
		<div>
			
      			
			<Container maxWidth="lg">
			
			<br/>
			<br/>
			<br/>
			<br/>
			<div>
            
            <FormComponent title={this.state.selectedTitle} id={this.state.formId} formData = {this.state.FormData} save={this.saveFormData} />

            <br/>

            <DisplayWorkflow modify={"modify"} title={this.state.selectedTitle} id={this.state.flowchartId} save={this.saveFlowChartData}/>
         <br/>
            <Button
              variant="contained"
              color="primary"
              onClick = {this.postRequest}>
            
              Update Workflow
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
  export default connect(mapStatetoProps, null)(withStyles(useStyles)(UpdateWorkflow));

