import React from "react";
import WorkflowTable from "./MyWorkflowsTable";
import api from "../utils/api";
import axios from "axios";
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography'
class MyWorkflow extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showPDF: false,
			item: null,
			myworkflows: this.props.myWorkflows,
			tableData: [],
			tableCreated: false,
		};
	}
	componentDidMount() {
		/*api
			.myworkflows()
			.get(this.props.userObj.name)
			.then((res) => {
				console.log("The data received is", res.data);
				this.setState({
					myworkflows: res.data,
				});
				
			});*/
		console.log("IN table received",this.state.myworkflows)
		this.initTable(this.state.myworkflows);
	}
	initTable(myworkflows) {
		let tableData = [
			{
				id: "3",
				wname: "Tech Sec Application",
				status: "Intermediate",
				lastappr: "Dr. R.B. Keskar",
				time: 10,
			},
		];
		let i = 0;
		if(myworkflows){
			for (i = 0; i < myworkflows.length; i++) {
				if(myworkflows[i].status.localeCompare("corrupted") === 0){
					this.state.tableData.push({
						id: myworkflows[i].id,
						wname: " ",
						status: "Workflow is corrupted",
						lastfeedback: " ",
						time:" ",
						index_no: i,
					});
				}
				else
				{this.state.tableData.push({
					id: myworkflows[i].id,
					wname: myworkflows[i].Title,
					status: myworkflows[i].status,
					lastfeedback: myworkflows[i].Feedback,
					time: myworkflows[i].Feedback_ts,
					index_no: i,
				});}
			}
			console.log(this.state.tableData);
			this.setState({
				tableCreated: true,
			});
		}
	}
	handleClick = (index) => {
		console.log(index);
		console.log(this.state.myworkflows[index]);
		this.props.handleSubmit(this.state.myworkflows[index]);
	};
	render() {
		return (
			<div>
				{this.state.tableCreated ? (
					<WorkflowTable
						Click={this.handleClick}
						userObj={this.props.userObj}
						filter={this.props.filter}
						myworkflowsTable={this.state.tableData}
					/>
				) : (
					<div style={{ display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					height: '50vh'}}> <Typography variant="h5"> Fetching My Workflows</Typography><br/><LinearProgress style={{ display: 'flex',
					width: '50%'}} color="secondary" /> </div>
				)}
			</div>
		);
	}
}
export default MyWorkflow;
