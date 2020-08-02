import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import VisibilityIcon from "@material-ui/icons/Visibility";
import MaterialTable, { MTableBody, MTableBodyRow } from "material-table";
import Typography from "@material-ui/core/Typography";
import { forwardRef } from "react";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import Divider from "@material-ui/core/Divider";
// import useStyles from "../Style";
import DoubleArrowTwoToneIcon from "@material-ui/icons/DoubleArrowTwoTone";
import Avatar from "@material-ui/core/Avatar";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import CreateIcon from "@material-ui/icons/Create";
import style from "../StyleSheet";
import ApprovalsHeader from "../Headers/ApprovalsHeader";

const tableIcons = {
	Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
	Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
	Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
	Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
	DetailPanel: forwardRef((props, ref) => (
		<ChevronRight {...props} ref={ref} />
	)),
	Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
	Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
	Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
	FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
	LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
	NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
	PreviousPage: forwardRef((props, ref) => (
		<ChevronLeft {...props} ref={ref} />
	)),
	ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
	Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
	SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
	ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
	ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

export default function AlignItemsList({ Click, requestTable, filter, node }) {
	// const tableclasses = useTableStyles();
	// const classes = useStyles();
	const classes = makeStyles(style(useTheme()))();

	const tableColumns = [
	{ title: "Application ID", field: "id" },
	{ title: "Application Name", field: "wname" },
	{ title: "Sender Name", field: "sender" },
	{ title: "Request Feedback", field: "feedback",defaultFilter : filter },
	{ title: "Last Updated On", field: "time" },
	{ title: "Priority", field: "priority" } // add type: 'numeric' if required
];
	

	if(!node)
	{
        let tableTitle = "My Approvals "
		if(filter)
		{
			tableTitle = tableTitle.concat(filter)
		}

	return (
		<React.Fragment>
		<ApprovalsHeader title="Approve Documents"/>
		<div className={classes.tableStyle}>
			<MaterialTable
				icons={tableIcons}
				title={tableTitle}
				columns={tableColumns}
				data={requestTable}
				actions={[
					{
						icon: "view",
						tooltip: "Approve Document",
						onClick: (event, rowData) => {
							Click(rowData.item);
						},
					},
				]}
				components={{
					Action: (props) => (
						<IconButton
							onClick={(event) => props.action.onClick(event, props.data)}
							color="primary"
							variant="contained"
							style={{ textTransform: "none" }}
							size="small">
							<CreateIcon />
						</IconButton>
					),
				}}
				options={{
					search: true,
					sorting: true,
					actionsColumnIndex: -1,
					headerStyle: {
						backgroundColor: "#002a29",
						color: "#FFF",
						fontWeight: "bold",
						fontSize: "15px",
					},
					rowStyle: rowData => ({
						fontSize: "14px",
						color: rowData.priority === 'High' && rowData.feedback === 'Pending' ? "#ff9800" : "#000",
						fontWeight: rowData.priority === 'High' && rowData.feedback === 'Pending' ? "Bold" : "Medium",
					}),
				}}
			/>
		</div>
		</React.Fragment>
	);

	}
	else{
		    let tableTitle = node.name
			tableTitle = tableTitle.concat("\'s  Approvals")
			

			return(<React.Fragment>
			<br/>
			<br/>
			<br/>
		<div className={classes.tableStyle}>
			<MaterialTable
				icons={tableIcons}
				title={tableTitle}
				columns={tableColumns}
				data={requestTable}
				actions={[
					{
						icon: "view",
						tooltip: "Approve Document",
						onClick: (event, rowData) => {
							Click(rowData.item);
						},
					},
				]}
				components={{
					Action: (props) => (
						<IconButton
							onClick={(event) => props.action.onClick(event, props.data)}
							color="primary"
							variant="contained"
							style={{ textTransform: "none" }}
							size="small">
							<VisibilityIcon />
						</IconButton>
					),
				}}
				options={{
					search: true,
					sorting: true,
					actionsColumnIndex: -1,
					headerStyle: {
						backgroundColor: "#002a29",
						color: "#FFF",
						fontWeight: "bold",
						fontSize: "15px",
					},
					rowStyle: {
						fontSize: "14px",
					},
				}}
			/>
		</div>
		</React.Fragment>
)

		}

}
