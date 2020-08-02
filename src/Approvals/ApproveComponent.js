import React from "react";
import clsx from "clsx";
import AlignItemsList from "../Approvals/AlignItemsList";
import CreatePDF from "./CreatePDF";
import api from "../utils/api";
import axios from "axios";
// import useStyles from "../Style";
import { withStyles, Container } from "@material-ui/core";
import Timestamp from "../utils/TimeStamp";
import Dialog from "@material-ui/core/Dialog";
import CloseIcon from "@material-ui/icons/Close";
import style from '../StyleSheet'
import Slide from "@material-ui/core/Slide";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import {withRouter} from 'react-router-dom'
import {
	AppBar,
	Toolbar,
	Typography,
	Button,
	Box
} from "@material-ui/core";

class ApproveComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showPDF: false,
			item: null,
			requestTable: null,
			filter:null
		};
	}
	componentDidMount() {
		

		if(this.props.location.state){

			if(( typeof this.props.location.state) === "string")
			{
				this.setState({
					filter : this.props.location.state,
					json: this.props.myApprovals,
					requestTable: this.createRequestTable(this.props.myApprovals),
				});

				
			}
			else{

				this.setState({
				item:this.props.location.state,
				showPDF: true,
				json: this.props.myApprovals,
				requestTable: this.createRequestTable(this.props.myApprovals)
				})
			}
		}
		else{
			this.setState({
				json: this.props.myApprovals,
				requestTable: this.createRequestTable(this.props.myApprovals),
			});
		
		}
	}
	
	createRequestTable(pending_requests) {
		let tableData = [];
		const displayPriority = {
			'true' : "High",
			'false' : "Normal"
		}
		for (var index in pending_requests.requests) {
			tableData.push({
				id: pending_requests.requests[index].id,
				wname: pending_requests.requests[index].subject,
				sender: pending_requests.requests[index].nameofSender,
				feedback: pending_requests.requests[index].status,
				time: Timestamp.getTimestamp(parseInt( pending_requests.requests[index].receivedon,10)),
				priority : displayPriority[pending_requests.requests[index].priority],
				item: pending_requests.requests[index],
			});
		}
		return tableData;
	}
	handleClick = (item) => {
		console.log(item);
		this.setState({
			item: item,
			showPDF: true,
		});
	};
        handleBackButton = () =>{
		this.setState({
			showPDF: false,
		}, () => { window.location.reload(true) })
	}
	render() {
		const { classes } = this.props;
		const Transition = React.forwardRef(function Transition(props, ref) {
			return <Slide direction="up" ref={ref} {...props} />;
		});
		return (
			<main>
				{/* <Container className={classes.container}> */}
				{this.state.requestTable ? (
					this.state.showPDF ? (
						 <Dialog
							fullScreen
							open={this.state.showPDF}
							onClose={this.handleBackButton}
							TransitionComponent={Transition}>
							<AppBar  className={classes.appBar}>
								<Toolbar >
									<Box display="flex" flexGrow={1}>
										<Button
											edge="start"
											autoFocus
											color="inherit"
											onClick={this.handleBackButton}
											startIcon={<ArrowBackIosIcon />}>
											Back
										</Button>
									</Box>
									<Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title} display="inline">
										<Box fontWeight={800} display="inline">{this.state.item.subject + " "}</Box>
										- Status : <Box display="inline" fontWeight={600} className={clsx({
											[classes.pendingColor]: this.state.item.status.toLowerCase()==='pending',
											[classes.activeColor]: this.state.item.status.toLowerCase()==='active',
											[classes.terminatedColor]: this.state.item.status.toLowerCase()==='rejected',
											[classes.completedColor]: this.state.item.status.toLowerCase()==='approved',
										})}>{this.state.item.status}</Box>
				      				</Typography>
								</Toolbar>
							</AppBar>
							<CreatePDF item={this.state.item} setResponded = {this.setResponded}/>
						</Dialog>
					) : (
						<AlignItemsList
							Click={this.handleClick}
							userObj={this.props.userObj}
							requestTable={this.state.requestTable}
							filter={this.state.filter}
						/>
					)
				) : (
					<div> Fetching Approval Requests</div>
				)}
				{/* </Container> */}
			</main>
		);
	}
}
export default withStyles(style)(withRouter(ApproveComponent));
