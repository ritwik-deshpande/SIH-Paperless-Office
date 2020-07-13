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
import {
	AppBar,
	withStyles,
	Toolbar,
	ButtonGroup,
	Box,
	TextField,
	Grid,
} from "@material-ui/core";
import useStyles from "../Style";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

class StatusComponent extends Component {
	state = {
		id: null,
		status: null,
		workflow: null,
		nodesList: [],
		workflowSteps: [],
		username: null,
		title: null,
		updateWorkFlow: false,
		myWorkflow: false,
		open: false,
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
		this.state.workflow.end_timestamp = Timestamp.getTimestamp();
		api
			.workFlow()
			.put(this.state.workflow.id, this.state.workflow)
			.then((res) => {
				console.log("Updated New Workflow", res);
				alert("WorkFlow Terminated !");
				this.props.history.push("/");
			});
	};

	handleChange = (e) => {
		console.log(e.target.value);
		this.setState({
			id: e.target.value,
		});
	};
	handleOnUpdate = (old_version, old_object) => {
		console.log("Handle Modify", this.state.workflow, old_object);
		old_object.status = "terminated";
		old_object.end_timestamp = Timestamp.getTimestamp();
		api
			.workFlow()
			.put(old_version, old_object)
			.then((res) => {
				console.log("Updated New Workflow", res);
				this.props.history.push("/");
			});
	};
	handleSearch = (curentWorkflow) => {
		this.setState(
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

		console.log(this.state);

		this.setState({
			open: true,
		});
	};
	handleClose = () => {
		this.setState({
			open: false,
			updateWorkFlow: false,
		});
	};
	handleGetWorkflow = (id) => {
		this.state.open = true;
		this.setState({
			id: id,
		});
		api
			.getWorkFlow()
			.getByid(id)
			.then((res) => {
				//console.log('The data received is',res.data)
				if (res && res.data) {
					this.setState({
						workflow: res.data,
						title: res.data.Title,
						username: res.data.User,
					});
					this.init();
				}
			});
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
		if (
			!this.state.id &&
			this.props.location.search.localeCompare("") !== 0 &&
			this.props.location.search.split("=")[1]
		) {
			console.log("in something");
			this.setState({ id: this.props.location.search.split("=")[1] });
		}
		const { classes } = this.props;
		return (
			<div>
				{/* <h1>API test</h1> */}
				{/* <ToastContainer
                        autoClose={2000}
                        hideProgressBar={true}
                        position={toast.POSITION.BOTTOM_RIGHT}
                    /> */}

				{/* <ListItem alignItems="flex-start">
        
        <ListItemText primary={ "Show My Workflows"} />
        <IconButton color="primary" onClick={()=>this.Click()}>
                <ExpandMoreIcon style={{ fontSize: 40 }} />
                </IconButton>
      </ListItem> */}
				{/* <br></br> */}
				{/* <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<ExpandMoreIcon style={{ fontSize: 40 }} />}
                    onClick={()=>this.Click()}
                    style= {
                        {
                            
                        }
                    }
                >
                    Show My Workflows
                </Button> */}
				{/* <br/><br/> */}

				<MyWorkflow
					userObj={this.props.userObj}
					handleSubmit={this.handleSearch}
				/>
				{/* {this.state.myWorkflow ? 
                <MyWorkflow userObj={this.props.userObj} handleSubmit={this.handleSearch}/>
                
    :null} */}
				{/* <form className={classes.form} 
                noValidate autoComplete="off"> */}
				<Box m={2} p={2}>
					<Grid container spacing={3}>
						{/* <Input //className={classes.button} 
                    onChange = {this.handleChange}
                    value = {this.state.id}
                    name='comment' 
                    fullWidth='true'
                    placeholder='Add the id you wanna search for' 
                    inputProps={{ 'aria-label': 'description' }} /> */}
						<Grid item xs>
							{/* <Box m={2} p={2}> */}
							<TextField
								fullWidth
								variant="outlined"
								size="small"
								label="Enter Workflow ID to Search"
								onChange={this.handleChange}
							/>
							{/* </Box> */}
						</Grid>
						<Grid item xs>
							{/* <Box m={2} p={2}> */}
							<Button
								variant="contained"
								color="primary"
								//className={classes.button}
								startIcon={<AddCommentIcon />}
								onClick={() => {
									this.handleGetWorkflow(this.state.id);
								}}>
								GET WORKFLOW STATUS
							</Button>
							{/* </Box> */}
						</Grid>
					</Grid>
				</Box>
				{/* </form>  */}

				<Dialog
					fullScreen
					open={this.state.open}
					onClose={this.handleClose}
					TransitionComponent={Transition}
					PaperProps={{
						style: {
							backgroundColor: "#FFF",
						},
					}}>
					{this.state.id ? (
						!this.state.status ? (
							<h1>Sorry WorkFlow not yet initialised</h1>
						) : !this.state.updateWorkFlow ? (
							<div className={classes.root}>
								<AppBar className={classes.appBar}>
									<Toolbar className={classes.toolbar}>
										<Box display="flex" flexGrow={1}>
											<Button
												edge="start"
												autoFocus
												color="inherit"
												onClick={this.handleClose}
												startIcon={<ArrowBackIosIcon />}>
												Go Back
											</Button>
										</Box>
										{this.state.workflow.status === "terminated" ? null : (
											<div>
												<ButtonGroup variant="text">
													<Box pr={3}>
														<Button color="inherit" onClick={this.handleModify}>
															MODIFY WORKFLOW
														</Button>
													</Box>
													<Box pl={3}>
														<Button color="inherit" onClick={this.handleEnd}>
															END WORKFLOW
														</Button>
													</Box>
												</ButtonGroup>
											</div>
										)}
									</Toolbar>
								</AppBar>
								<WorkFlowStatusUI
									workflow={this.state.workflow}
									title={this.state.title}
									steps={this.state.workflowSteps}
									nodesList={this.state.nodesList}
								/>
							</div>
						) : (
							<div>
								<AppBar className={classes.appBar}>
									<Toolbar className={classes.toolbar}>
										<Box display="flex" flexGrow={1}>
											<Button
												edge="start"
												autoFocus
												color="inherit"
												onClick={this.handleClose}
												startIcon={<ArrowBackIosIcon />}>
												Go Back
											</Button>
										</Box>
									</Toolbar>
								</AppBar>
								<UpdateWorkflow
									selectedId={this.state.workflow.componentId}
									wrkflw={this.state.workflow}
									onUpdate={this.handleOnUpdate}
								/>
							</div>
						)
					) : null}
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
)(withStyles(useStyles)(StatusComponent));
