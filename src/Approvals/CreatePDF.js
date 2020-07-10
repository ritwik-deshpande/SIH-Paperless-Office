import React from "react";
import {
  PDFViewer,
  Document,
  Page,
  Text,
  View,
  Image,
  Link,
  StyleSheet,
  PDFDownloadLink
} from "@react-pdf/renderer";
import axios from 'axios'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Input from '@material-ui/core/Input'
import GetAppIcon from '@material-ui/icons/GetApp';
import AddCommentIcon from '@material-ui/icons/AddComment';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import Header from './PDFComponents/Header';
import Comments from '../utils/Comments';
import AddComments from "./Comments";
import api from '../utils/api';
import Timestamp from '../utils/TimeStamp'
import ShowPDF from "./ShowPDF";
import Typography from '@material-ui/core/Typography';

class CreatePDF extends React.Component{

  constructor(props){
    super(props);
    this.state = {
    isSigned: false,
    isApproved : false,
    comments : null,
	workflow : null,
    signatures : null
    // comments : [{id:1, name:'Dustin Henderson', message: 'never ending story. turn around and look at what tyou see.<br/>In her face something never ending story. turn around and look at what tyou see.<br/>In her face something'},
    // {id:2, name: 'Will Byers', message: 'Approved by Chief PD'},
    // {id:3, name: 'Mike Wheeler', message: 'Threatened by the party'},
    // {id:4, name:'Dustin Henderson', message: 'never ending story'},
    // {id:5, name: 'Will Byers', message: 'Approved by Chief PD'},
    // {id:6, name: 'Mike Wheeler', message: 'Threatened by the party'}
    // ]
    };
    console.log("in Create PDF")
  }

  componentDidMount(){
   console.log(this.props.item)
    api.workFlow().getByid(this.props.item.id)
        .then(res => {
          console.log('The data received is',res.data)
          if(res.data )
          {this.setState({
            workflow : res.data,
            comments : res.data.Comments,
	    	signatures: res.data.Signatures

          })}

        })

  }
  
  

  handleAddComment = (comment) => {
    
    let timestamp = Timestamp.getTimestamp()
    
    console.log(comment)
    this.setState({ comments: [...this.state.comments, {id:this.state.comments.length, name: this.props.userObj.name,message:comment, timestamp: timestamp }] })
    
  }

  handleChangeinComment = (e) => {
    console.log(e.target.value);
    this.setState({comment: e.target.value})
  }
  approvedByAll = (d) => {
        for(var key in d){
            if(!d[key]){
              console.log(key, d[key])
              return false
            }
        }
        return true
  }
  chooseNextNode = (nodes, name) => {
  	let i =0 
  	let temp_flowchart = this.state.workflow.FlowChart
  	console.log(temp_flowchart)
  	
  	for(i = 0; i < nodes.length; i++){
  	
  		if(name in temp_flowchart[nodes[i]].approvedBy){
  			return nodes[i]
  		}
  	}
  }
  
  
  sendRequest = () => {
  
  	// Append in pending_request array
  	// Append in User notifications
        // Remove pending request from current user
  	
  }

  getAvgResponseTime = (avg_response, no_of_approvals, new_response) => {

	console.log(avg_response, new_response)
	avg_response = Math.floor((avg_response * no_of_approvals + new_response)/(no_of_approvals + 1))

	console.log(avg_response)
	return avg_response
  }

  

  handleSignClick = () => {

    // add the content for approval.
    // check if all have approved at the same level.
    //broadcast to the next level.
    // at the end send update message to server along with the required arrays.
    
    let node_level = this.state.workflow.Path.length
    let path = this.state.workflow.Path
    let current_node_key = this.state.workflow.Path[node_level - 1]
    let currentNode = this.state.workflow.FlowChart[current_node_key]
    
    let nextNodes = this.state.workflow.nextNodes
    let userObj = this.props.userObj
    
    let name = this.props.userObj.name
    let id = this.props.userObj.id
    let esign = this.props.userObj.esign
    console.log(this.state.signatures)
    this.setState({isSigned : true,
		isApproved : true,

    })
    this.state.signatures[name] = esign
    console.log("in handlesignClick")
    
	if( nextNodes.length == 0){
		if(id in currentNode.approvedBy){

                        
			currentNode.approvedBy[id] = true
			currentNode.timestamp[id] = Timestamp.getTimestamp()
	
			if(this.approvedByAll(currentNode.approvedBy)){

				//send request to approvers of next child	

				console.log("Adding Next Nodes")
				nextNodes = currentNode.nextNodes
				this.state.workflow.nextNodes = nextNodes
			}
      this.state.workflow.FlowChart[current_node_key] = currentNode
		}
		
	}
	else{
		let next_node_key
    let nextNode
    // remove pending requests from all other next Nodes! 
                    
		next_node_key = this.chooseNextNode(nextNodes, id)
		nextNode = this.state.workflow.FlowChart[next_node_key]
	    nextNode.approvedBy[id] = true
	    nextNode.timestamp[id] = Timestamp.getTimestamp()
		path = [...path, next_node_key]
		
		this.state.workflow.nextNodes = []
		
		
		if(this.approvedByAll(nextNode.approvedBy)){
				//send request to approvers of next child

      // let timestamp = this.getTimestamp()
			  //  nextNode.timestamp = timestamp

				console.log("Adding Next Nodes")
				nextNodes = nextNode.nextNodes
				this.state.workflow.nextNodes = nextNodes
			}
	    this.state.workflow.FlowChart[next_node_key] = nextNode
	
	    this.state.workflow.Path = path
	}
    
    	
    this.state.workflow.Signatures = this.state.signatures
    this.state.workflow.Comments = this.state.comments
   
    console.log("New Workflow", this.state.workflow)
    
    api.workFlow().put(this.state.workflow.id,this.state.workflow).then( res => {
    	console.log("Updated New Workflow", res)
    })
    
     let response_time = Timestamp.getTSObj() - Timestamp.str2TSObj(this.props.item.ts)
     let avg_time = this.getAvgResponseTime(userObj.avg_response_time, userObj.no_of_approvals, response_time)

	console.log(avg_time)
	userObj.no_of_approvals = userObj.no_of_approvals + 1
	userObj.avg_response_time = avg_time
	console.log("the new user object", userObj)

    api.users().update(userObj.id, userObj).then( res => {

	console.log("Updated user sucessfully")
   })
    
  }

  handleRejectClick = () => {

    // add the content for Rejection.
    //notifies the owner.
    
    console.log("in handlesignClick")


    let node_level = this.state.workflow.Path.length
    let path = this.state.workflow.Path
    let current_node_key = this.state.workflow.Path[node_level - 1]
    let currentNode = this.state.workflow.FlowChart[current_node_key]
    
    let nextNodes = this.state.workflow.nextNodes
    
    let name = this.props.userObj.name
    let username = this.props.userObj.username
   
    console.log("in handlesignClick")
	
	if(nextNodes.length != 0){
		let next_node_key
    		let nextNode
                // remove pending requests from all other next Nodes! 
                    
		next_node_key = this.chooseNextNode(nextNodes, username)

		path = [...path, next_node_key]
		
		this.state.workflow.nextNodes = []
		
                this.state.workflow.Path = path
		
	}
    
    	
    this.state.workflow.Comments = this.state.comments
    this.state.workflow.isRejected = true

   
   console.log("New Workflow", this.state.workflow)
    
   api.workFlow().put(this.state.workflow.id,this.state.workflow).then( res => {
    	console.log("Updated New Workflow", res)
    })
  }

  render(){
    //const classes = useStyles();
    return(
      <div>
        {
          this.state.comments?
          (<>
           <br/>
	   <br/>
	   <br/>
	   <Typography
                component="h3"
                variant="h5"
  
              >
                STATUS OF WORKFLOW : {this.state.workflow.status} 
              </Typography>
          <ShowPDF formData = {this.state.workflow.FormData} title= { this.state.workflow.Title} signatures = {this.state.signatures} />
            <br/>
            
            <AddComments json={{listitems : this.state.comments}} handleAddComment={this.handleAddComment} />
            <br/>

        <br/>
        {this.state.isApproved? <div style = {{ width : 1000}}></div>:<> 
        <Button
              variant="contained"
              color="primary"
              //className={classes.button}
              startIcon={<ThumbUpIcon />}
              onClick = {this.handleSignClick}
            >
          Approve and add e-signature
        </Button>


        <Button style ={{ marginLeft : 700}}
        variant="contained"
        color="primary"
        //className={classes.button}
        startIcon={<ThumbDownIcon />}
        onClick = {this.handleRejectClick}
      >
    Reject 
  </Button></>}
            </>):
            null
        }
        
        
      </div>
      
    );
  }
}

const mapStatetoProps = (state) =>{

  return{
    userObj: state.auth.userObj,
    loggedIn : state.auth.loggedIn
  }
}
export default connect(mapStatetoProps, null)(CreatePDF);
