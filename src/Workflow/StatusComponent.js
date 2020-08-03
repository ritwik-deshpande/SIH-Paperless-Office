import React, { Component } from "react";
import WorkFlowStatusUI from "./WorkflowStatus";
import api from "../utils/api";
import axios from "axios";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import Input from "@material-ui/core/Input";
import GetAppIcon from "@material-ui/icons/GetApp";
import AddCommentIcon from "@material-ui/icons/AddComment";
import { toast, ToastContainer } from "react-toastify";
import MyWorkflow from "./MyWorkflows";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import UpdateWorkflow from "./UpdateWorkflow";
import Timestamp from "../utils/TimeStamp";
import Dialog from "@material-ui/core/Dialog";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import Typography from "@material-ui/core/Typography";
import MyWorkflowsHeader from '../Headers/MyWorkflowsHeader';
import Paper from '@material-ui/core/Paper'
import SearchBar from 'material-ui-search-bar'
import {withRouter} from 'react-router-dom'
import {
	AppBar,
	withStyles,
	Toolbar,
	ButtonGroup,
	Box,
	Tooltip,
	TextField,
	Grid,
} from "@material-ui/core";
import useStyles from "../Style";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import WorkflowNode from '../utils/WorkflowNode'
import style from '../StyleSheet'
import Header from '../Headers/MyWorkflowsHeader'
const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

class StatusComponent extends Component {
	state = {
		id: null,
		status: null,
		workflow: null,
		searchId:"",
		nodesList: [],
		workflowSteps: [],
		username: null,
		title: null,
		updateWorkFlow: false,
		myWorkflow: false,
		archivedWorkflows : null,
		nonArchivedWorkflows : null,
		open: false,
		tableTitle: "My_Applications", 
		sentBy:null,
		filter : null
	};

	componentDidMount() {
		// axios.get(api.getWorkFlow().get(this.state.username,this.state.title))
		// .then(res => {
		//   console.log('The data received is',res.data[0])
		//   this.setState({
		// workflow : res.data[0]
		//   })
		//   this.init()
		// })

		if(this.props.location.state){

			if(( typeof this.props.location.state) === "string")
			{
				this.setState({
					filter : this.props.location.state
				})

				
			}
			else{
				let curentWorkflow = this.props.location.state
				
				console.log(this.props)

				console.log("Current Workflow", curentWorkflow)
				this.setState(
				{
					status: null,
					id: curentWorkflow.id,
					workflow: curentWorkflow,
					title: curentWorkflow.Title,
					username: curentWorkflow.User,
					sentBy : this.props.location.sentBy
				},
				() => {
					this.init();
				}
				);

				console.log(this.state);

				this.setState({
					open: true,
				});
			}
		}
		else{
			  let list1 = [] 
		  	  let list2 = []
			  let allWorkflows = this.props.myWorkflows
			  for(var index in allWorkflows)
			  {
				  //if(allWorkflows[index].status.localeCompare("corrupted") !== 0)
				  //{
					/*let time_gap =Timestamp.getTSObj() - Timestamp.str2TSObj(myWorkflows[index].begin_timestamp);
					time_gap = Timestamp.getHours(time_gap)
					let base_time = 5*24
					console.log(time_gap)

					if(time_gap<base_time)
					{
					  list1.push(myWorkflows[index])
					}*/
					if(!allWorkflows[index].isArchived){
			
						list1.push(allWorkflows[index])
					}
			
					
			
					//}
				
			}
			console.log("The list1", list1)
			this.setState({
				nonArchivedWorkflows : list1
			})
			
		}
	}
	requestAccepted(d) {
		for (var key in d) {
			if (!d[key]) {
				return false;
			}
		}
		return true;
	}

	init() {
		let flowchart = this.state.workflow.FlowChart;
		let nodesList = [];
		let workflowSteps = [];
		let Path = this.state.workflow.Path;
		let i = 0;

		for (i = 0; i < Path.length; i++) {
			let node = Path[i];
			this.state.status = "begin";
			nodesList = [...nodesList, flowchart[node]];
			workflowSteps = [...workflowSteps, flowchart[node].type];
		}
		// console.log(nodesList)
		// console.log(workflowSteps)

		this.setState({
			nodesList: nodesList,
			workflowSteps: workflowSteps,
		});
		// toast.success("Workflow Loaded")
	}

	handleModify = () => {
		console.log("Handle Modify");
		this.setState({
			updateWorkFlow: true,
		});
	};
	handleEnd = () => {
		this.state.workflow.status = "terminated";
		this.state.workflow.end_timestamp = Timestamp.getTimestamp(new Date().getTime());
		this.state.workflow.Feedback = "Terminated by User"
		this.state.workflow.Feedback_ts = Timestamp.getTimestamp(new Date().getTime());
		let Path = this.state.workflow.Path
		this.state.workflow.send_requests = []
		this.state.workflow["cancel_requests"] = WorkflowNode.getApprovers(this.state.workflow.FlowChart[Path[Path.length - 1]])
		api
			.workFlow()
			.put(this.state.workflow.id, this.state.workflow)
			.then((res) => {
				console.log("Updated New Workflow", res);
				alert("WorkFlow Terminated !");
                                this.props.history.push('/status')
				window.location.reload(true)
			});
	};

	handleChange = (newValue) => {
		// console.log(e.target.value);
			// this.state.searchId = e.target.value
		this.setState({
			searchId: newValue
		})
	};
	handleOnUpdate = (old_version, old_object) => {
		console.log("Handle Modify", this.state.workflow, old_object);
		old_object.status = "terminated";
		old_object.end_timestamp = Timestamp.getTimestamp(new Date().getTime());
		api
			.workFlow()
			.put(old_version, old_object)
			.then((res) => {
				console.log("Updated New Workflow", res);
				this.props.history.push('/status')
				window.location.reload(true)
			});
	};
	handleSearch = (curentWorkflow) => {
		//add what is changed for corrupt workflow
		if(curentWorkflow.status.localeCompare("corrupted") === 0)
		{
			alert("This workflow is corrupted")
		}
		else
		{this.setState(
			{
				status: null,
				id: curentWorkflow.id,
				workflow: curentWorkflow,
				title: curentWorkflow.Title,
				username: curentWorkflow.User,
			},
			() => {
				this.init();
			}
		);

		this.setState({
			open: true,
		});
		}

		//console.log(this.state);

		
	};
	handleClose = () => {
	
		if(this.state.sentBy){
			this.props.history.push('/Hierarchy')
		
		}else{
			this.setState({
				open: false,
				updateWorkFlow: false,
			});
		}
	};
	handleGetWorkflow = (id) => {
		this.state.id = null
		if(id.localeCompare("")===0)
		{
			alert("Workflow Not Found");
		}
		else{
			api
				.workFlow()
				.getByid(id)
				.then((res) => {
					console.log('The data received is',res.data)
					if (res && res.data) {
						if(res.data.status.localeCompare("corrupted") === 0)
						{
							alert('Workflow is corrupted');
						}
						else
						{
							this.setState({
							workflow: res.data,
							title: res.data.Title,
							username: res.data.User,
							id:id,
							open:true
						}, ()=> { this.init() } );
					}
					
					}
					else{
						alert("Workflow Not Found");
					}
				})
				.catch(err => {
					alert("Workflow Not Found");
				});
		}
	};
	Click = () => {
		this.setState({ myWorkflow: true });
	};

	//    let url = http://localhost:3030/workflow?User=rd&&Title=Application%20for%20Sports%20Secretary
	render() {
		// this.state.username = this.props.userObj.username
		// this.state.title = this.props.location.search.split("=")[1]
		// console.log(this.state.username,this.state.title)
		// console.log(this.state.workflowSteps,this.state.nodesList)
		console.log("Received Workflows", this.props.myWorkflows)
		
		if(this.state.id){
			console.log("The id",this.state.id.length)
		}
		else{
			console.log("id is false")
		}
		const { classes } = this.props;
		return (
			<div>
				{/* <Header title={'Workflows'}/> */}


				<MyWorkflowsHeader title={'Applications'}/>

				{/* <Paper style={{backgroundColor:'#002a29'}}>
					<Grid container justify="center" spacing={3}>
						
						<Grid item xs>
							
							<TextField
								fullWidth
								variant="filled"
								size="small"
								label="Enter Workflow ID to Search"
								onChange={this.handleChange}
								color="secondary"
							/>
							
						</Grid>
						<Grid item xs>
							
							<Button
								variant="contained"
								color="secondary"
								//className={classes.button}
								startIcon={<AddCommentIcon />}
								onClick={() => {
									this.handleGetWorkflow(this.state.searchId);
								}}>
								GET OTHER WORKFLOWS
							</Button>
							
						</Grid>
					</Grid>
					</Paper> */}
				<Paper className={classes.headerSearchBox} elevation={0} square>
					<Grid container spacing={3} direction="row" justify="flex-start" alignItems="flex-start">
						<Grid item xs={7} sm={8} md={10}>
							<Tooltip title="Search other Workflows by ID" arrow placement="top-start">
								<SearchBar
								placeholder = "Search other Workflows by ID"
								value={this.state.searchId}
								onChange={(newValue) => this.handleChange(newValue)}
								onRequestSearch={() => {
									this.handleGetWorkflow(this.state.searchId);}}
								fullWidth
								/>
							</Tooltip>
						</Grid>
						<Grid item xs={5} sm={4} md={2}>
							<Button variant="contained" color="secondary" onClick={() => {
											this.handleGetWorkflow(this.state.searchId);}} fullWidth>
							GET WORKFLOW
							</Button>
						</Grid>
					</Grid>
				</Paper>
								{/* <br></br> */}
				
				{ this.state.nonArchivedWorkflows ? 
				<MyWorkflow
					tableTitle={this.state.tableTitle}
				    myWorkflows={this.state.nonArchivedWorkflows}
					userObj={this.props.userObj}
					handleSubmit={this.handleSearch}
					filter={this.state.filter}
				/> : <h1> Fetching Workflows </h1>}

				{/* </form>  */}

				<Dialog
					fullScreen
					open={this.state.open}
					onClose={this.handleClose}
					TransitionComponent={Transition}>
					{this.state.id  ? [ !this.state.updateWorkFlow ? (
							<div className={classes.root}>
								<AppBar className={classes.appBar}>
									<Toolbar >
										<Box display="flex" flexGrow={1}>
											<Button
												edge="start"
												color="primary"
												onClick={this.handleClose}
												startIcon={<ArrowBackIosIcon />}>
												Back
											</Button>
										</Box>
										{(this.state.workflow.status === "terminated") || (this.state.workflow.status === "Completed") || (this.state.workflow.User !== this.props.userObj.name ) ? null : (
											<div>
												<ButtonGroup variant="text">
													<Box pr={3}>
														<Button color="primary" onClick={this.handleModify}>
															RESUBMIT WORKFLOW
														</Button>
													</Box>
													<Box pl={3}>
														<Button color="primary" onClick={this.handleEnd}>
															END WORKFLOW
														</Button>
													</Box>
												</ButtonGroup>
											</div>
										)}
									</Toolbar>
								</AppBar>
								<main className={classes.content}>
								<WorkFlowStatusUI
									workflow={this.state.workflow}
									title={this.state.title}
									steps={this.state.workflowSteps}
									nodesList={this.state.nodesList}
								/>
								</main>
							</div>
						) : (
							<div>
								<AppBar className={classes.appBar}>
									<Toolbar >
										<Box display="flex" flexGrow={1}>
											<Button
												edge="start"
												autoFocus
												color="inherit"
												onClick={this.handleClose}
												startIcon={<ArrowBackIosIcon />}>
												Back
											</Button>
										</Box>
									</Toolbar>
								</AppBar>
								<UpdateWorkflow  selectedTitle= {this.state.workflow.Title} FormData={this.state.workflow.FormData} formId = {this.state.workflow.formId} flowchartId = {this.state.workflow.flowchartId} wrkflw ={ this.state.workflow}  onUpdate = {this.handleOnUpdate} />
							</div>
						) ]: null}
				</Dialog>
			
			</div>
		);
	}
}

const mapStatetoProps = (state) => {
	return {
		userObj: state.auth.userObj,
		loggedIn: state.auth.loggedIn,
	};
};
export default connect(
	mapStatetoProps,
	null
)(withStyles(style)(withRouter(StatusComponent)));
