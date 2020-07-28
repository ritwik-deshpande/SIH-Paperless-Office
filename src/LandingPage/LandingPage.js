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
import NumberCard from '../Analytics/NumberCard'
import PagesSaved from './pagesSaved'
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import style from '../StyleSheet'
import Todo from '../TODO/Main'
import TimeWidget from './TimeWidget'
import { ScrollSync, ScrollSyncPane } from 'react-scroll-sync';

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

  

export default function  MainComponent ({userObj, props}){
    // const classes = useStyles();
    const classes = makeStyles(style(useTheme()))();
    // const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const numberCardData = {
      pending : 24,
      completed : 100,
      terminated : 25,
      active : 5
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
        <PagesSaved />
      </div>
    </div>
  )

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
                  <DueSoon />
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
