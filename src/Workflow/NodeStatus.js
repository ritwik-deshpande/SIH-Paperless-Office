import React from "react";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import ShowPDF from "../Approvals/ShowPDF";
import Comments from "../utils/Comments";
import useStyles from "../Style";
import Button from "@material-ui/core/Button";

import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Box, ButtonGroup } from "@material-ui/core";
import GetAppIcon from "@material-ui/icons/GetApp";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { green } from "@material-ui/core/colors";

export default function NodeStatus({ workflow, node }) {
	const classes = useStyles();

	const mapIdtoUser = {
		DIR01: "Pramod Padole",
		HOD001: "Umesh Deshpande",
		AP001: "Ravindra Keskar",
		AP002: "Anil Mokhade",
		AP003: "Manish Kurhekar",
	};

	console.log("the Node is", node);

	const handleDownload = (uri, index) => {
		const linkSource = uri;
		const downloadLink = document.createElement("a");
		const fileName = uri.split(";")[1];

		downloadLink.href = linkSource;
		downloadLink.download = fileName;
		downloadLink.click();
	};
	const handleView = (uri) => {
		let pdfWindow = window.open("");
		pdfWindow.document.write(
			"<iframe width='100%' height='100%' src='" + uri + "'></iframe>"
		);
	};

	function getListItems() {
		let rows = [];

		for (var approver in node.approvedBy) {
			if (node.approvedBy[approver]) {
				rows.push(
					<ListItem>
						<ListItemIcon>
							<AccountCircle />
						</ListItemIcon>
						<ListItemText primary={mapIdtoUser[approver]} />
						<Box display="flex" justifyContent="flex-end">
							<Box>
								<ListItemIcon>
									<CheckCircleIcon style={{ color: green[600] }} />
								</ListItemIcon>
							</Box>
							<Box>
								<ListItemText
									style={{ color: green[600] }}
									primary={node.timestamp[approver]}
								/>
							</Box>
						</Box>
						<Divider />
					</ListItem>
				);
			} else {
				rows.push(
					<ListItem>
						<ListItemIcon>
							<AccountCircle />
						</ListItemIcon>
						<ListItemText primary={mapIdtoUser[approver]} />

						<Box display="flex" justifyContent="flex-end">
							<Box>
								<ListItemIcon>
									<HourglassEmptyIcon style={{ color: "grey.600" }} />
								</ListItemIcon>
							</Box>
							<Box>
								<ListItemText style={{ color: "grey.600" }} primary="Pending" />
							</Box>
						</Box>
						<Divider />
						<Divider />
					</ListItem>
				);
			}
		}
		return rows;
	}

	return (
		<div>
			<ShowPDF
				formData={workflow.FormData}
				title={workflow.Title}
				signatures={workflow.Signatures}
			/>
			<br />
			<Typography variant="h6">Documents Uploaded</Typography>
			{workflow.FormData.Upload_Documents
				? workflow.FormData.Upload_Documents.map((uri, index) => {
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
												onClick={() => handleView(uri)}
												startIcon={<VisibilityIcon />}
												className={classes.button}>
												View DOCUMENT
											</Button>
										</Box>
										<Box pl={3}>
											<Button
												color="primary"
												onClick={() => handleDownload(uri, index)}
												startIcon={<GetAppIcon />}
												className={classes.button}>
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
			<br />
			<br />
			<Typography variant="h6">Approvers Status</Typography>
			{getListItems()}

			<br />
			<br />

			<Comments json={{ listitems: workflow.Comments }} />
		</div>
	);
}
