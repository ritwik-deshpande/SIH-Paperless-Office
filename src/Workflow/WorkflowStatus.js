import React from "react";

import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import NodeStatus from "./NodeStatus";

import useStyles from "../Style";
import { Box, Grid } from "@material-ui/core";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{"Copyright © "}
			<Link color="inherit" href="https://material-ui.com/">
				DigiDocs 2020
			</Link>{" "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	);
}

function getStepContent(step, nodesList, workflow) {
	console.log(step, nodesList);

	return <NodeStatus workflow={workflow} node={nodesList[step]} />;
	// switch (step) {
	//   case 0:
	//     return <NodeStatus />;
	//   case 1:
	//     return <NodeStatus />;
	//   case 2:
	//     return <NodeStatus />;
	//   default:
	//     throw new Error('Unknown step');
	// }
}

export default function WorkflowStatus({ workflow, title, steps, nodesList }) {
	console.log(title, steps, nodesList);

	const classes = useStyles();
	const [activeStep, setActiveStep] = React.useState(steps.length - 1);

	const handleNext = () => {
		setActiveStep(activeStep + 1);
	};

	const handleEnd = () => {
		alert("WorkFlow Ended !");
	};

	const handleBack = () => {
		setActiveStep(activeStep - 1);
	};
	const approvedByAll = (d) => {
		for (var key in d) {
			if (!d[key]) {
				console.log(key, d[key]);
				return false;
			}
		}
		return true;
	};

	const getStatus = () => {
		console.log(nodesList, steps.length);

		// if( nodesList[steps.length-1].type === "End" && approvedByAll(nodesList[steps.length-1].approvedBy)){
		// 	return (
		// 	    <Typography component="h1" variant="h4" align="center">
		// 	    Status : Completed
		// 	 </Typography>
		// 	)
		// }
		// else{
		// 	return (
		// 	    <Typography component="h1" variant="h4" align="center">
		// 	    Status : In Progress...
		// 	 </Typography>
		// 	)
		// }
		return (
			<Typography component="h1" variant="h5" align="center" style={{textTransform:"capitalize"}}>
				Current Status : {workflow.status}
			</Typography>
		);
	};
	return (
		<div>
			<div className={classes.appBarSpacer} />
			<Container maxWidth="lg">
				{/* <Paper className={classes.paper} >  */}
				{/* <div style={{ width: "1000" }}> */}
				<Typography
					component="h1"
					variant="h4"
					align="center"
					className={classes.subtitle}>
					{title}
				</Typography>
				{/* </div> */}
				{getStatus()}
				<Stepper activeStep={activeStep} className={classes.stepper}>
					{steps.map((label) => (
						<Step key={label}>
							<StepLabel>{label}</StepLabel>
						</Step>
					))}
				</Stepper>
				<React.Fragment>
					<div>
						{getStepContent(activeStep, nodesList, workflow)}
						<br />
						<br />

						<div>
							{/* <Box display='flex' flexGrow={1}> */}
							<Grid
								container
								direction="row"
								justify="space-between"
								alignItems="center">
								<Button
									onClick={handleBack}
									variant="contained"
									color="primary"
									disabled={activeStep === 0}
									startIcon={<NavigateBeforeIcon />}>
									Back
								</Button>
								{/* </Box>
                  <Box> */}
								<Button
									onClick={handleNext}
									variant="contained"
									color="primary"
									disabled={activeStep === steps.length - 1}
									endIcon={<NavigateNextIcon />}>
									Next
								</Button>
								{/* </Box> */}
							</Grid>
							{/* {activeStep !== 0 && (
                    <Button onClick={handleBack} variant="contained"
                    color="primary"
                    className={classes.button}>
                      Back
                    </Button>
                  )} */}

							{/* {activeStep === steps.length - 1  ? 
                    
                      <Button
                    variant="contained"
                    color="primary"
		    style = {{marginLeft :1000}}
                    disabled = "true"
                    onClick={handleNext}
                    
                    className={classes.button}
                  >Next </Button> : <Button
                    variant="contained"
                    color="primary"
                    style = {{marginLeft :1000}}
                    onClick={handleNext}
                    className={classes.button}
                  >Next </Button>} */}
						</div>
					</div>
				</React.Fragment>
				{/* </Paper> */}
			</Container>
			<Copyright />
		</div>
	);
}
