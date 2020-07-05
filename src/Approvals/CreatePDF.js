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
import ShowPDF from "./ShowPDF";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));


const json ={

  listitems : [{id:1, name:'Dustin Henderson', message: 'never ending story. turn around and look at what tyou see.<br/>In her face something never ending story. turn around and look at what tyou see.<br/>In her face something'},
            {id:2, name: 'Will Byers', message: 'Approved by Chief PD'},
            {id:3, name: 'Mike Wheeler', message: 'Threatened by the party'},
            {id:4, name:'Dustin Henderson', message: 'never ending story'},
            {id:5, name: 'Will Byers', message: 'Approved by Chief PD'},
            {id:6, name: 'Mike Wheeler', message: 'Threatened by the party'}
            ]
}

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
    axios.get(api.getWorkFlow("workflow").getByid(this.props.item.wrkflwid))
        .then(res => {
          console.log('The data received is',res.data[0])
          if(res.data && res.data[0])
          {this.setState({
            workflow : res.data[0],
            comments : res.data[0].Comments,
	    	signatures: res.data[0].Signatures

          })}

        })

  }
  
  getTimestamp = () =>{

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Aug', 'Sep','Oct','Nov','Dec']


    let date = new Date().getDate();
    let month = new Date().getMonth();
    let year = new Date().getYear() + 1900;
    let hour = new Date().getHours()
    let mins = new Date().getMinutes()

    let timestamp = months[month-1]+"  "+date+ "  at  "+hour+":"+mins+",   " + year
    return timestamp

 }

  handleAddComment = (comment) => {
    
    let timestamp = this.getTimestamp()
    
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
    
    
    
    
    
    
    
    let name = this.props.userObj.name
    let username = this.props.userObj.username
    let esign = this.props.userObj.esign
    console.log(this.state.signatures)
    this.setState({isSigned : true,
		isApproved : true,

    })
    this.state.signatures[name] = esign
    console.log("in handlesignClick")
    
    
    
    
    
	if( nextNodes.length == 0){
		if(username in currentNode.approvedBy){

                        
			currentNode.approvedBy[username] = true
			
	
			if(this.approvedByAll(currentNode.approvedBy)){
				//send request to approvers of next child
                                 
                                let timestamp = this.getTimestamp()
				currentNode.timestamp = timestamp								
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
                    
		next_node_key = this.chooseNextNode(nextNodes, username)
		nextNode = this.state.workflow.FlowChart[next_node_key]
		nextNode.approvedBy[username] = true
		path = [...path, next_node_key]
		
		this.state.workflow.nextNodes = []
		
		
		if(this.approvedByAll(nextNode.approvedBy)){
				//send request to approvers of next child

                        let timestamp = this.getTimestamp()
		        nextNode.timestamp = timestamp
			console.log("Adding Next Nodes")
			nextNodes = nextNode.nextNodes
			this.state.workflow.nextNodes = nextNodes
		}
                this.state.workflow.FlowChart[next_node_key] = nextNode
	}
    
    	
    this.state.workflow.Path = path
    this.state.workflow.Signatures = this.state.signatures
    this.state.workflow.Comments = this.state.comments
   
   console.log("New Workflow", this.state.workflow)
    
    api.updateWorkFlow("workflow", this.state.workflow.id).put(this.state.workflow).then( res => {
    	console.log("Updated New Workflow", res)
    })
    
  }

  handleRejectClick = () => {

    // add the content for Rejection.
    //notifies the owner.
    this.setState({isSigned : true,
    isApproved : true})
    console.log("in handlesignClick")
  }

  render(){
    //const classes = useStyles();
    return(
      <div>
        {
          this.state.comments?
          (<>
          <ShowPDF formData = {this.state.workflow.FormData} signatures = {this.state.signatures} />
            <br/>
            
            <AddComments json={{listitems : this.state.comments}} handleAddComment={this.handleAddComment} />
            <br/>

        <br/>
        {this.state.isApproved? null :<> 
        <Button
              variant="contained"
              color="primary"
              //className={classes.button}
              startIcon={<ThumbUpIcon />}
              onClick = {this.handleSignClick}
            >
          Approve and add e-signature
        </Button>


        <Button style ={{ marginLeft : 800}}
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
