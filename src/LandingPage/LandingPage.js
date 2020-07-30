import React from 'react'
import Box from '@material-ui/core/Box';
// import useStyles from '../Style'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import clsx from 'clsx';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import FormBuilder from 'react-form-builder2'
import CustomForm from '../Forms/CustomForms'
import Calendar from '../Calendar/Calendar'
import Header from '../Header';
import NumberCard from './components/NumberCard'
import PagesSaved from './pagesSaved'
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import style from '../StyleSheet'
import Todo from '../TODO/Main'
import TimeWidget from './TimeWidget'
import { ScrollSync, ScrollSyncPane } from 'react-scroll-sync';
import Timestamp from "../utils/TimeStamp";

import {
  
  OnTime,
  DueSoon,
  OverDue,
  MyCalendar,
  NewsFeed,
} from './components';
import { IconButton, makeStyles, useTheme, Hidden, Drawer } from '@material-ui/core';


function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
          DigiDocs
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

  

export default function  MainComponent ({userObj, props, myApprovals, myWorkflows}){
    // const classes = useStyles();
    const classes = makeStyles(style(useTheme()))();
    // const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    const [pending, setPending] = React.useState(0)
    const [completed, setCompleted] = React.useState(0)
    const [active ,setActive] = React.useState(0)
    const [terminated, setTerminated] = React.useState(0)
    const [recentWorkflows, setRecentWorkflows] = React.useState([])
    const [urgentApprovals, setUrgentApprovals] = React.useState([])
    const [numberofPages, setNumberofPages] = React.useState(myApprovals.requests.length*10 + myWorkflows.length*10)

    React.useEffect( () => {
        console.log(myApprovals)
	let temp_completed = 0
	let temp_active = 0
	let temp_terminated = 0
	let temp_pending = 0
	let recentWorkflows = []
	let urgentApprovals = []
	for(var index in myWorkflows){
			let time_gap =Timestamp.getTSObj() - Timestamp.str2TSObj(myWorkflows[index].begin_timestamp);
			time_gap = Timestamp.getHours(time_gap)
			let base_time = 5*24
			console.log(time_gap)

			if(time_gap<base_time)
			{
				recentWorkflows.push(myWorkflows[index])
			}


			if(myWorkflows[index].status.localeCompare("terminated") === 0)
			{
				temp_terminated++
			}
			else if(myWorkflows[index].status.localeCompare("active") === 0)
			{	
				temp_active++
			}
			else{

				temp_completed++
			}
		}

	for( var index in myApprovals.requests){
		//if(myApprovals.requests[index].priority && (myApprovals.requests[index].status.localeCompare("Pending") === 0)){
		if(myApprovals.requests[index].status.localeCompare("Pending") === 0){
			urgentApprovals.push(myApprovals.requests[index])
			temp_pending++
		}
        }
		

	setActive(temp_active)
	setPending(temp_pending)
	setCompleted(temp_completed)
	setTerminated(temp_terminated)
	setRecentWorkflows(recentWorkflows)
	setUrgentApprovals(urgentApprovals)


   },[])

    


    const numberCardData = {
      Pending : pending,
      Completed : completed,
      terminated : terminated,
      active : active
  }
  const [sideBarOpen, setSideBarOpen] = React.useState(false);
    
  const handleSideDrawerToggle = () => {
    setSideBarOpen(!sideBarOpen);
  };

  const sideDrawer = (
    <div className={classes.sideDrawerContainer}>
      <div className={classes.appBarSpacer} />
      <div>
        <TimeWidget />
      </div>
      <div style={{marginTop: '16px'}}>
        <PagesSaved number={numberofPages}/>
      </div>
    </div>
  )
	//initNumbers()
        return(
          <React.Fragment>
            <Header title={'Welcome, ' + userObj.name} Click={handleSideDrawerToggle}/>
		      <div className={classes.landingPageMainContent}>
              <Grid container spacing={3}>
                    {/* <Grid item xs={12} container justify="space-evenly" spacing={2}> */}
                <NumberCard  data={numberCardData}/>
                    {/* </Grid> */}

                {/* TO-DO List */}    
                <Grid item xs ={12} sm={6}>
                  <Todo userid = {userObj.id}/>
                </Grid>

                {/* Due Soon */}
                <Grid item xs={12} sm={6}>
                  <DueSoon recentWorkflows={recentWorkflows} urgentApprovals = {urgentApprovals}/>
                </Grid>
                
                {/* Over Due */}
                {/* <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
                  <OverDue />
                </Grid >           */}
		           
                {/* News Feed */}
                <Grid item xs={12}>
                  <NewsFeed />
                </Grid>
              </Grid>

              <Box pt={6}>
                <Copyright />
              </Box>  
          
              <Hidden lgUp implementation="css">
                <Drawer
                  style={{position:'relative', zIndex:1}}
                  variant="temporary"
                  anchor="right"
                  open={sideBarOpen}
                  onClose={handleSideDrawerToggle}
                  classes={{
                    paper: classes.sideDrawerPaper
                  }}
                  ModalProps={{
                    keepMounted: true // Better open performance on mobile.
                  }}
                >
                  {sideDrawer}
                </Drawer>
              </Hidden>
              <Hidden mdDown implementation="css">
                <Drawer
                  elevation={0}
                  variant="permanent"
                  anchor="right"
                  className={classes.sideDrawer}
                  classes={{
                    paper: classes.sideDrawerPaper
                  }}
                >
                  {sideDrawer}
                </Drawer>
              </Hidden>
              </div>
           </React.Fragment>
        )
    }


// export default MainComponent
