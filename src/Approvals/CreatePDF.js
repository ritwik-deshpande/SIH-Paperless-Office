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
	PDFDownloadLink,
} from "@react-pdf/renderer";
import axios from "axios";
import { connect } from "react-redux";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import Input from "@material-ui/core/Input";
import GetAppIcon from "@material-ui/icons/GetApp";
import AddCommentIcon from "@material-ui/icons/AddComment";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import Header from "./PDFComponents/Header";
import Comments from "../utils/Comments";
import AddComments from "./Comments";
import api from "../utils/api";
import Timestamp from "../utils/TimeStamp";
import ShowPDF from "./ShowPDF";
import Typography from "@material-ui/core/Typography";
import useStyles from "../Style";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Box, Container } from "@material-ui/core";
import WorkflowNode from "../utils/WorkflowNode";
import HeaderBanner from '../Header';
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import {withRouter} from 'react-router-dom'
import Divider from "@material-ui/core/Divider";

import { ButtonGroup } from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { green } from "@material-ui/core/colors";
import { red } from "@material-ui/core/colors";
import CancelIcon from '@material-ui/icons/Cancel';
import style from '../StyleSheet'
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";

var bcrypt = require('bcryptjs');

const mapIdtoRoles ={
	GRP000: "Directors",
	GRP001: "Deans" ,
	GRP002: "Associate Deans",
	GRP003: "Head of Department",
	GRP004: "Student Council",
	GRP006: "Assistant Professors",
	GRP007: "Teaching Assistants",
	GRP008: "Security Section",
	GRP009: "Student Mentor Coordinator",
	GRP010: "HR manager",
	GRP011: "Accountants",
	GRP012: "Academics",
	GRP013: "Hostel Section",  
	GRP014: "Health Center",

}
class CreatePDF extends React.Component {

	//classes = useStyles();
	constructor(props) {
		super(props);
		this.state = {
			isSigned: false,
			isResponded : false,
			isApproved: false,
			openDialog : false,
			openSealMenu : false,
			pin: null,
			selectedSeal:null,
			comments: null,
			workflow: null,
			seals:null,
			signatures: null,
			// comments : [{id:1, name:'Dustin Henderson', message: 'never ending story. turn around and look at what tyou see.<br/>In her face something never ending story. turn around and look at what tyou see.<br/>In her face something'},
			// {id:2, name: 'Will Byers', message: 'Approved by Chief PD'},
			// {id:3, name: 'Mike Wheeler', message: 'Threatened by the party'},
			// {id:4, name:'Dustin Henderson', message: 'never ending story'},
			// {id:5, name: 'Will Byers', message: 'Approved by Chief PD'},
			// {id:6, name: 'Mike Wheeler', message: 'Threatened by the party'}
			// ]
		};
		console.log("in Create PDF");
	}

	viewedWorkflow = () => {
		console.log("Viewed Workflow")
		this.state.workflow.Feedback = "Viewed by " + this.props.userObj.name;
		this.state.workflow.Feedback_ts = Timestamp.getTimestamp(new Date().getTime());

		api
		.workFlow()
		.put(this.state.workflow.id, this.state.workflow)
		.then((res) => {
			console.log("Viewing Workflow", res);
			//this.props.history.push('/approve')
			//window.location.reload(true)

		});
	}

	componentDidMount() {
		console.log(this.props.item);
		api
			.workFlow()
			.getByid(this.props.item.id)
			.then((res) => {
				console.log("The data received is", res.data);
				if (res.data) {

					if(res.data.status.localeCompare("corrupted") === 0)
					{
						alert("Workflow is corrupted");
					}
					else
					{this.setState({
						workflow: res.data,
						comments: res.data.Comments,
						signatures: res.data.Signatures,
						seals: res.data.seals,
					}, () => { this.viewedWorkflow() });}
				}
			});
	}
	handleCloseSealMenu = () => {
	     this.setState({
			openSealMenu : false,
	     	
	     })
		
	}
	getSeal = ()=>{
	
		return this.state.selectedSeal
	}
	
	
	handleAddSeal = (seal,index) => {
		console.log("The role",seal,index)
	
		this.setState({
			openDialog : true,
			selectedSeal :seal,
			isApproved: true,
			openSealMenu:false,
		})
		
	}
	
	getListItem = () => {
	
		/*var seal_menu = []
	    for(var index in this.props.userObj.seals){
	    
	    	seal_menu.push()
	    
	    }
	
		return seal_menu*/
		
		    return Object.keys(this.props.userObj.seals).map((key, seal) => {
		    
		    	return (<div >
					<ListItem
						button
						onClick={() => this.handleAddSeal(this.props.userObj.seals[key])}>
						<ListItemIcon>
							<AddIcon />
						</ListItemIcon>
						<ListItemText primary={key} />
					</ListItem>
					{/* </div> */}
				</div>)
				
			})

	
	}

	handleAddComment = (comment) => {
		let timestamp = Timestamp.getTimestamp(new Date().getTime());

		console.log(comment);
		this.setState({
			comments: [
				...this.state.comments,
				{
					id: this.state.comments.length,
					name: this.props.userObj.name,
					message: comment,
					timestamp: timestamp,
				},
			],
		});
	};

	handleChangeinComment = (e) => {
		console.log(e.target.value);
		this.setState({ comment: e.target.value });
	};
	approvedByAll = (d) => {
		for (var key in d) {
			if (!d[key]) {
				console.log(key, d[key]);
				return false;
			}
		}
		return true;
	};

	isUserInGroup = (node, name) =>{

		let temp_flowchart = this.state.workflow.FlowChart;
		for(let approver  in temp_flowchart[node].approvedBy )
		{
			if(mapIdtoRoles[approver] && this.props.userObj.roles.includes(mapIdtoRoles[approver]))
			{
				console.log("approver", approver)
				return approver;
			}
		}
		return null;
	}

	chooseNextNode = (nodes, name) => {
		let i = 0;
		let temp_flowchart = this.state.workflow.FlowChart;
		console.log(temp_flowchart);
		let cancel_reqs = []
		let return_json ={
			next_node_key : null,
			cancel_reqs: null
		}

		let return_node
		for (i = 0; i < nodes.length; i++) {
			if (name in temp_flowchart[nodes[i]].approvedBy) {
				return_node = nodes[i];
			}
			else if(this.isUserInGroup(nodes[i],name)){
				return_node = nodes[i];
			}
			else{
				console.log(nodes[i])
				console.log(WorkflowNode.getApprovers(temp_flowchart[nodes[i]]))
				cancel_reqs = cancel_reqs.concat(WorkflowNode.getApprovers(temp_flowchart[nodes[i]]))
			}
		}
		
		return_json.next_node_key = return_node
		return_json.cancel_reqs = cancel_reqs
		
		return return_json
	};

	sendRequest = () => {
		// Append in pending_request array
		// Append in User notifications
		// Remove pending request from current user
	};

	getAvgResponseTime = (avg_response, no_of_approvals, new_response) => {
		console.log(avg_response, new_response);
		avg_response = Math.floor(
			(avg_response * no_of_approvals + new_response) / (no_of_approvals + 1)
		);

		console.log(avg_response);
		return avg_response;
	};
	handleSignClick = () =>{
		console.log("Open Dialog")
	
		this.setState({
			openSealMenu : true,
		})
	
	}
	
	handleSubmit = () => {
		console.log("Compare",this.state.pin,this.props.userObj.pin)
		//this.state.pin.localeCompare(this.props.userObj.pin) === 0
		//bcrypt.compareSync(this.state.pin, this.props.userObj.pin)
		if(bcrypt.compareSync(this.state.pin, this.props.userObj.pin)){
			this.setState({
				openDialog : false
			})
			if(this.state.isApproved){
				alert("Approving Document")
				this.approveDocument()
			}
			else{
				alert("Rejecting Document")
				this.rejectDocument()
			}
		}
		else{
			alert("Invalid user PIN")
		}
	}
	handleChange = (e) => {
		console.log(e.target.value);
		this.setState({
			pin: e.target.value,
		});
	};
	
	handleClose = () => {
		this.setState({
			openDialog : false,
			isApproved: false
		})
	}	

	approveDocument = () => {
		// add the content for approval.
		// check if all have approved at the same level.
		//broadcast to the next level.
		// at the end send update message to server along with the required arrays.

		this.state.isResponded = true


		let node_level = this.state.workflow.Path.length;
		let path = this.state.workflow.Path;
		let current_node_key = this.state.workflow.Path[node_level - 1];
		let currentNode = this.state.workflow.FlowChart[current_node_key];

		let nextNodes = this.state.workflow.nextNodes;
		let userObj = this.props.userObj;

		let name = this.props.userObj.name;
		let id = this.props.userObj.id;
		let esign = this.props.userObj.esign;
		
		let seal = this.state.selectedSeal
		
		
		// console.log(this.state.signatures);
		this.setState({ isSigned: true });
		this.state.signatures[name] = esign;
		if(seal){
			this.state.seals[name] = seal;
		}
		// console.log("in handlesignClick");
		this.state.workflow.send_requests = []
		this.state.workflow.cancel_requests = []
		
		if (nextNodes.length == 0) {
			if (id in currentNode.approvedBy) {
				currentNode.approvedBy[id] = true;
				// set pending request of current child as Approved
				currentNode.timestamp[id] = Timestamp.getTimestamp(new Date().getTime());
			}
			else if(this.isUserInGroup(current_node_key, id))
			{
				let group = this.isUserInGroup(current_node_key, id)
				console.log("group", group)
				currentNode.approvedBy[group] = true;
				// set pending request of current child as Approved
				currentNode.timestamp[group] = Timestamp.getTimestamp(new Date().getTime());
			}
			if (this.approvedByAll(currentNode.approvedBy)) {
				//send request to approvers of next child

				console.log("Adding Next Nodes");
				if (currentNode.type === "End") {
					this.state.workflow.status = "Completed";
					this.state.workflow.nextNodes = [];
					this.state.workflow.end_timestamp = Timestamp.getTimestamp(new Date().getTime());
				} else {
					nextNodes = currentNode.nextNodes;
					this.state.workflow.nextNodes = nextNodes;
				}
				  
				var reqs = []
				console.log("Next nide ki value : " + nextNodes)
				this.state.workflow.nextNodes.forEach((value) => {
					console.log(value)
					reqs = reqs.concat(Object.keys((this.state.workflow.FlowChart)[value].approvedBy))
				  })
				  this.state.workflow.send_requests = reqs;}
			this.state.workflow.FlowChart[current_node_key] = currentNode;
		} else {
			let next_node_key;
			let nextNode;
		    let retval ;
			retval = this.chooseNextNode(nextNodes, id);
			
			next_node_key = retval.next_node_key
			console.log("JSON",retval)
			console.log("Cancel requests", retval.cancel_reqs)
			
			this.state.workflow.cancel_requests = retval.cancel_reqs
			// remove pending requests from all other next Nodes after chosing the nextNode
			nextNode = this.state.workflow.FlowChart[next_node_key];
			current_node_key = next_node_key;
			if(this.isUserInGroup(current_node_key, id))
			{
				let group = this.isUserInGroup(current_node_key, id)
				nextNode.approvedBy[group] = true;
				nextNode.timestamp[group] = Timestamp.getTimestamp(new Date().getTime());
			}
			else
			{nextNode.approvedBy[id] = true;
			nextNode.timestamp[id] = Timestamp.getTimestamp(new Date().getTime());}
			// set pending request of current child as Approved
			path = [...path, next_node_key];

			this.state.workflow.nextNodes = [];

			if (this.approvedByAll(nextNode.approvedBy)) {
				//send request to approvers of next child

				console.log("Adding Next Nodes");
				if (nextNode.type === "End") {
					this.state.workflow.status = "Completed";
					this.state.workflow.nextNodes = []
           				this.state.send_requests = []
					this.state.workflow.end_timestamp = Timestamp.getTimestamp(new Date().getTime());
				} else {
					nextNodes = nextNode.nextNodes;
					this.state.workflow.nextNodes = nextNodes;
				}

			
				var reqs = []
				console.log("Next nide ki value : " + nextNodes)
				this.state.workflow.nextNodes.forEach((value) => {
				    console.log(value)
				    reqs = reqs.concat(Object.keys((this.state.workflow.FlowChart)[value].approvedBy))
				  })
				this.state.workflow.send_requests = reqs;


			}
			this.state.workflow.FlowChart[next_node_key] = nextNode;

			this.state.workflow.Path = path;
			
		}

		this.state.workflow.Signatures = this.state.signatures;
		this.state.workflow.seals = this.state.seals;
		this.state.workflow.Comments = this.state.comments;
		this.state.workflow.Feedback = "Approved by " + name;
		this.state.workflow.Feedback_ts = Timestamp.getTimestamp(new Date().getTime());
		if(this.isUserInGroup(current_node_key,id)){
		
			this.state.workflow.cancel_requests = this.state.workflow.cancel_requests.concat([this.isUserInGroup(current_node_key,id)+'-'+id])
		}
		console.log("New Workflow", this.state.workflow);
		
		
		api
			.workFlow()
			.put(this.state.workflow.id, this.state.workflow)
			.then((res) => {
				console.log("Updated New Workflow", res);
				this.props.history.push('/approve')
				window.location.reload(true)

			});

		//Updating Average Response Time

		let response_time =
			Timestamp.getTSObj() - parseInt(this.props.item.receivedon, 10);
		let avg_time = this.getAvgResponseTime(
			userObj.avg_response_time,
			userObj.no_of_approvals,
			response_time
		);

		console.log(avg_time);
		userObj.no_of_approvals = userObj.no_of_approvals + 1;
		userObj.avg_response_time = avg_time;
		console.log("the new user object", userObj);

		api
			.users()
			.update(userObj.id, userObj)
			.then((res) => {
				console.log("Updated user sucessfully");
			}); 
	};
	
	handleRejectClick = () => {
		this.setState({
			openDialog : true,
			isApproved: false
		})
	}

	rejectDocument = () => {
		// add the content for Rejection.
		//notifies the owner.

		this.state.isResponded = true

		console.log("in handlesignClick");

		let node_level = this.state.workflow.Path.length;
		let path = this.state.workflow.Path;
		let current_node_key = this.state.workflow.Path[node_level - 1];
		let currentNode = this.state.workflow.FlowChart[current_node_key];

		let nextNodes = this.state.workflow.nextNodes;
		let userObj = this.props.userObj;
		let name = this.props.userObj.name;
		let username = this.props.userObj.username;
		let id = this.props.userObj.id;
		let retval;
		console.log("in handlesignClick");
		this.state.workflow.send_requests = []
		this.state.workflow.cancel_requests = []

		if (nextNodes.length != 0) {
			let next_node_key;
			let nextNode;
			// remove pending requests from all other next Nodes!

			retval = this.chooseNextNode(nextNodes, id);
			
			next_node_key = retval.next_node_key
			current_node_key = next_node_key;
			currentNode = this.state.workflow.FlowChart[current_node_key];
			if(this.isUserInGroup(current_node_key, id))
			{
				let group = this.isUserInGroup(current_node_key, id)
				currentNode.approvedBy[group] = false;
				currentNode.timestamp[group] = Timestamp.getTimestamp(new Date().getTime());
			}
			else
			{currentNode.approvedBy[id] = false;
			currentNode.timestamp[id] = Timestamp.getTimestamp(new Date().getTime());}

			this.state.workflow.cancel_requests = retval.cancel_reqs

			path = [...path, next_node_key];

			this.state.workflow.nextNodes = [];

			this.state.workflow.Path = path;
		}
		else{
		    	if(this.isUserInGroup(current_node_key, id))
			{
				let group = this.isUserInGroup(current_node_key, id)
				console.log("group", group)
				currentNode.approvedBy[group] = false;
				currentNode.timestamp[group] = Timestamp.getTimestamp(new Date().getTime());
			}
			else{
				currentNode.approvedBy[id] = false;
				currentNode.timestamp[id] = Timestamp.getTimestamp(new Date().getTime());
			}	

		}
		this.state.workflow.FlowChart[current_node_key] = currentNode
		this.state.workflow.Comments = this.state.comments;
		this.state.workflow.isRejected = true;
		this.state.workflow.Feedback = "Rejected by " + name;
		this.state.workflow.Feedback_ts = Timestamp.getTimestamp(new Date().getTime());
		if(this.isUserInGroup(current_node_key,id)){
		
			this.state.workflow.cancel_requests = this.state.workflow.cancel_requests.concat([this.isUserInGroup(current_node_key,id)+'-'+id])
		}
		console.log("New Workflow", this.state.workflow);
		//window.location.reload(true)

		api
			.workFlow()
			.put(this.state.workflow.id, this.state.workflow)
			.then((res) => {
				console.log("Updated New Workflow", res);
				this.props.history.push('/approve')
				window.location.reload(true)
			});

		//Updating Average Response Time

		let response_time =
		Timestamp.getTSObj() - parseInt(this.props.item.receivedon, 10);
		let avg_time = this.getAvgResponseTime(
			userObj.avg_response_time,
			userObj.no_of_approvals,
			response_time
		);

		console.log(avg_time);
		userObj.no_of_approvals = userObj.no_of_approvals + 1;
		userObj.avg_response_time = avg_time;
		console.log("the new user object", userObj);

		api
			.users()
			.update(userObj.id, userObj)
			.then((res) => {
				console.log("Updated user sucessfully");
			});
	};
	handleDownload = (uri, index) => {
		const linkSource = uri;
		const downloadLink = document.createElement("a");
		const fileName = uri.split(";")[1];

		downloadLink.href = linkSource;
		downloadLink.download = fileName;
		downloadLink.click();
	};
	handleView = (uri) => {
		let pdfWindow = window.open("");
		pdfWindow.document.write(
			"<iframe width='100%' height='100%' src='" + uri + "'></iframe>"
		);
	};
	render() {
		const { classes } = this.props;
		return (
			<React.Fragment>
				{this.state.comments ? (
					<>
						 <br/>
						   <br/>
						   <br/> 
	   					{/* <Typography component="h1" variant="h5" align="center" style={{textTransform:"capitalize"}}>
							Current Status : {this.state.workflow.status}
						</Typography> */}
						{/* // <Typography component="h3" variant="h5" className={classes.title}>
						// 	STATUS OF WORKFLOW : {this.state.workflow.status}
						// </Typography> */}
						<Container>
						<Box m={2} p={1}>
							<ShowPDF
								formData={this.state.workflow.FormData}
								title={this.state.workflow.Title}
								signatures={this.state.signatures}
								seals={this.state.seals}
							/>
						</Box>
						<br />
							
						{
				this.state.workflow.FormData.Upload_Documents ? (<Typography variant="h6">Documents Uploaded</Typography>):null
			}
			
			{this.state.workflow.FormData.Upload_Documents
				? this.state.workflow.FormData.Upload_Documents.map((uri, index) => {
						return (
							<>
								<Box display="flex" m={1}>
									<Box flexGrow={1} p={1}>
										{index + 1}.{" " + uri.split(";")[1] + " : "}
									</Box>
									<ButtonGroup variant="text">
										<Box pr={3}>
											<Button
												// variant="outlined"
												color="primary"
												onClick={() => this.handleView(uri)}
												startIcon={<VisibilityIcon />}
												//className={this.classes.button}
												>
												View DOCUMENT
											</Button>
										</Box>
										<Box pl={3}>
											<Button
												color="primary"
												onClick={() => this.handleDownload(uri, index)}
												startIcon={<GetAppIcon />}
												//className={this.classes.button}
												>
												Download DOCUMENT
											</Button>
										</Box>
									</ButtonGroup>
								</Box>
								<Divider />
							</>
						);
				  })
				: null}
						<AddComments
							json={{ listitems: this.state.comments }}
							handleAddComment={this.handleAddComment}
						/>
						<br />

						<br />
						<Dialog open={this.state.openDialog} onClose={this.handleClose} aria-labelledby="form-dialog-title">
							<DialogTitle id="form-dialog-title">Authenticate using PIN</DialogTitle>
							<DialogContent>
							  <DialogContentText>
								Enter your 4 digit PIN to add your E-Signature on the Document.
							  </DialogContentText>
							  <TextField
								autoFocus
								margin="dense"
								id="name"
								label="PIN"
								type="password"
								onChange={this.handleChange}
								fullWidth
							  />
							</DialogContent>
							<DialogActions>
							  <Button onClick={this.handleClose} color="primary">
								Cancel
							  </Button>
							  <Button onClick={this.handleSubmit} color="primary">
								SUBMIT
							  </Button>
							</DialogActions>
						  </Dialog>
						
						
						{this.state.isApproved || this.props.item.status !== "Pending" ? (
							<Box display="flex" p={1} mb={1}>
								<Box flexGrow={1}>
									<Button
										variant="contained"
										color="primary"
										//className={classes.button}
										startIcon={<ThumbUpIcon />}
										disabled
										onClick={this.handleSignClick}
										>
										Approve and add e-signature
									</Button>
								</Box>
								<Box>
									<Button
										variant="contained"
										color="primary"
										//className={classes.button}
										startIcon={<ThumbDownIcon />}
										disabled
										onClick={this.handleRejectClick}>
										Ask for Changes
									</Button>
								</Box>
							</Box>
						) : (<>
							<Box display="flex" p={1} mb={1}>
								<Box flexGrow={1}>
									<Button
										variant="contained"
										color="primary"
										//className={classes.button}
										startIcon={<ThumbUpIcon />}
										onClick={this.handleSignClick}>
										Approve and add e-signature
									</Button>
								</Box>
								<Dialog
									onClose={() => {this.handleCloseSealMenu()}}
									scroll="paper"
									aria-labelledby="customized-dialog-title"
									open={this.state.openSealMenu}>
									<DialogTitle>
										<Typography variant="h6" display="inline">
											Add Institute Seal
										</Typography>
										<IconButton
											className={classes.closeButton}
											onClick={() => {this.handleCloseSealMenu()} }>
											<CloseIcon />
										</IconButton>
									</DialogTitle>
									<DialogContent dividers>
										<List component="div">
											{this.getListItem()}
										</List>
									</DialogContent>
								</Dialog>
						




								<Box>
									<Button
										variant="contained"
										color="primary"
										//className={classes.button}
										startIcon={<ThumbDownIcon />}
										onClick={this.handleRejectClick}>
										Ask for Changes
									</Button>
								</Box>
							</Box>
							
						
						</>
						
						)}
						</Container>
					</>
				) : null}
			</React.Fragment>
		);
	}
}

const mapStatetoProps = (state) => {
	return {
		userObj: state.auth.userObj,
		loggedIn: state.auth.loggedIn,
	};
};
export default connect(mapStatetoProps, null)(withRouter(withStyles(style)(CreatePDF)));
