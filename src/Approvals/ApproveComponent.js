import React from "react";
import AlignItemsList from "../Approvals/AlignItemsList";
import CreatePDF from "./CreatePDF";
import api from "../utils/api";
import axios from "axios";
import useStyles from "../Style";
import { withStyles, Container } from "@material-ui/core";

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
		for (var index in pending_requests.requests) {
			tableData.push({
				id: pending_requests.requests[index].id,
				wname: pending_requests.requests[index].subject,
				sender: pending_requests.requests[index].nameofSender,
				feedback: pending_requests.requests[index].status,
				time: pending_requests.requests[index].ts,
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
	render() {
		const { classes } = this.props;
		return (
			<div>
				{/* <Container className={classes.container}> */}
				{this.state.requestTable ? (
					this.state.showPDF ? (
						<Container className={classes.container}>
							<CreatePDF item={this.state.item} />
						</Container>
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
			</div>
		);
	}
}
export default withStyles(useStyles)(ApproveComponent);
