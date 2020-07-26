import React from "react";
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
		};
	}
	componentDidMount() {
		console.log(this.props.userObj);
		api
			.pending_request()
			.get(this.props.userObj.id)
			.then((res) => {
				console.log("The data received is", res.data);
				this.setState({
					json: res.data,
					requestTable: this.createRequestTable(res.data),
				});
			});
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
		})
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
								</Toolbar>
							</AppBar>
						
							<CreatePDF item={this.state.item} />
						</Dialog>
					) : (
						<AlignItemsList
							Click={this.handleClick}
							userObj={this.props.userObj}
							requestTable={this.state.requestTable}
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
export default withStyles(style)(ApproveComponent);
