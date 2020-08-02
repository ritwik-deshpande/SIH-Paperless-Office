import React from "react";
import clsx from 'clsx';
import { makeStyles, useTheme } from "@material-ui/core/styles";

import IconButton from "@material-ui/core/IconButton";

import VisibilityIcon from "@material-ui/icons/Visibility";
import MaterialTable from "material-table";

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
// import useStyles from "../Style";
import style from "../StyleSheet";
import { Box } from "@material-ui/core";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

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

const useTableStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
		paddingLeft: "20px",
		paddingRight: "10px",
	},
}));


// const json ={

//   listitems : [{id:1, subject:'Need Plancks constant',
//             nameofSender: 'Dustin Henderson', status: 'never ending story'},
//             {id:2, subject:'Escape from Mind Flayer',
//             nameofSender: 'Will Byers', status: 'Approved by Chief PD'},
//             {id:3, subject:'Want eleven to stop',
//             nameofSender: 'Mike Wheeler', status: 'Threatened by the party'}]
// }

export default function WorkflowTable({ Click, myworkflowsTable, filter }) {
	const { useState } = React;
	const [selectedRow, setSelectedRow] = useState(null);



	const tableColumns = [
	{ title: "Application ID", field: "id" },
	{ title: "Application Name", field: "wname" },
	{ title: "Status", field: "status" , defaultFilter : filter, 
		render: rowData => 
		<div style={{display:"inline"}} 
			className={clsx({
			[classes.activeColor]: rowData.status==='active',
			[classes.terminatedColor]: rowData.status==='terminated',
			[classes.completedColor]: rowData.status==='Completed',
		})}><FiberManualRecordIcon style={{fontSize:"10px"}}/><Box fontWeight="Bold" display="inline">{" "+rowData.status}</Box>
		</div>
	},
	{ title: "Last Feedback", field: "lastfeedback" },
	{ title: "Last Updated On", field: "time" }, // add type: 'numeric' if required
];





	// const classes = useStyles();
	const classes = makeStyles(style(useTheme()))();
 
	const theme=useTheme();
	let tableTitle = "My Applications "
	if(filter){
		tableTitle = tableTitle.concat(filter)
		console.log("The table title", tableTitle)
	}

	console.log("The table title", tableTitle)
	console.log("Table data",myworkflowsTable)
	return (
		<div className={classes.tableStyle}>
			<MaterialTable
				icons={tableIcons}
				title= {tableTitle}
				columns={tableColumns}
				data={myworkflowsTable}
				actions={[
					{
						icon: "view",
						tooltip: "View Workflow",
						onClick: (event, rowData) => {
							Click(rowData.index_no);
						},
					},
				]}
				components={{
					Action: (props) => (
						<IconButton
							onClick={(event) => props.action.onClick(event, props.data)}
							color="primary"
							variant="contained"
							style={{ textTransform: "capitalize" }}
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
						color: "#fff",
						fontWeight: "bold",
						fontSize: "15px",
					},
					rowStyle: {
						fontSize: "14px",
					},
				}}
			/>
		</div>
	);
	// const renderListItem = (obj) =>{
	//   return(obj.map(item =>{
	//     return(
	//     <div key={item.id}>
	//     <ListItem alignItems="flex-start">
	//       <ListItemAvatar>
	//         <Avatar alt={item.nameofSender} src="/static/images/avatar/1.jpg" />
	//       </ListItemAvatar>
	//       <ListItemText
	//         primary={ item.subject }
	//         secondary={
	//           <React.Fragment>
	//             <Typography
	//               component="span"
	//               variant="body2"
	//               className={classes.inline}
	//               color="textPrimary"
	//             >
	//               {item.nameofSender}
	//             </Typography><br/>
	//             {item.status}
	//              On: {item.ts}
	//           </React.Fragment>
	//         }
	//       />
	//       <IconButton color="primary" onClick={()=>Click(item)}>
	//       <DoubleArrowTwoToneIcon style={{ fontSize: 40 }} />
	//       </IconButton>
	//     </ListItem>
	//     <Divider variant="inset" component="li" />
	//   </div>
	//   )}))
	// }
	// return (

	//   <List className={classes.root}>

	//     {renderListItem(json['requests'])}

	//   </List>
	// );
}
