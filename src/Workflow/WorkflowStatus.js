import React from 'react'

import  Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import NodeStatus from './NodeStatus'

import useStyles from '../Style'


function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
          DigiDocs 2020
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }




function getStepContent(step,nodesList, workflow) {

  console.log(step,nodesList)

  return <NodeStatus workflow ={workflow} node = {nodesList[step]}/>
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

export default function WorkflowStatus({workflow ,title,steps,nodesList}) {


    console.log(title,steps,nodesList)

    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(steps.length -1);

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    
  
    const handleEnd = () => {
        alert("WorkFlow Ended !")
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };
    const approvedByAll = (d) => {
        for(var key in d){
            if(!d[key]){
              console.log(key, d[key])
              return false
            }
        }
        return true
   }

    const getStatus = () =>{
    
    	console.log(nodesList, steps.length)
    
     	if( nodesList[steps.length-1].type === "End" && approvedByAll(nodesList[steps.length-1].approvedBy)){
     		return (
     		    <Typography component="h1" variant="h4" align="center">
				    Status : Completed
				 </Typography>
     		
     		)
     	}
     	else{
     	
     		return (
     		    <Typography component="h1" variant="h4" align="center">
				    Status : In Progress...
				 </Typography>
     		
     		)
     	
     	}


	}
    return (
	<div >
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg">
        
        <Paper className={classes.paper} > 
         <div style={{ width: "1000" }}>
          <Typography component="h1" variant="h4" align="center" >
            WorkFlow Protocol for : {title}
          </Typography>
          </div>
	  {

		getStatus()
	  }
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
		<br/>
		<br/>
		

		
		
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} variant="contained"
                    color="primary"
                    className={classes.button}>
                      Back
                    </Button>
                  )}
                  
                    {activeStep === steps.length - 1 && steps.length != 1 ? 
                    
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
                  >Next </Button>}
   		  { workflow.isRejected ? 
		<div>
		<br/>
		  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleEnd}
                    className={classes.button}
                  >TERMINATE WORKFLOW </Button>
                  
                </div> : null}
                  
                </div> 
              </div>
          </React.Fragment>
        </Paper>
        </Container>
        <Copyright />


      </div>
            
    )
}
