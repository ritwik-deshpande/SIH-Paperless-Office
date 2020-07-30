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

import Todo from '../TODO/Main'


import {
  
  OnTime,
  DueSoon,
  OverDue,
  MyCalendar,
  NewsFeed,
} from './components';


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

  const numberCardData = {
    pending : 24,
    completed : 100,
    terminated : 25,
    active : 5
}
const MainComponent= ({userObj}) =>{
    // const classes = useStyles();
    // const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

        return(

		<main>
           {/* <div/> */}
           {/* <Grid container> */}
            <Header title={'Welcome Back,' + userObj.name}/>
           {/* </Grid> */}
           <br/>
            <Container maxWidth="lg">
            
              <Grid container spacing={3}>
                {/* <Grid item container spacing={2}> */}
                    <Grid item xs={12} sm={12} md={12} lg={8} container justify="space-evenly" spacing={1}>
                      <NumberCard  data={numberCardData}/>
                    </Grid>
                    <Grid item xs ={12} sm={6} md={4}>
                      <Todo userid = {userObj.id}/>
                    </Grid>
                {/* </Grid> */}
                  {/* <Grid item lg={10} md={6} xl={3} xs={12}>
                      <NumberCard  data={numberCardData}/>
                    </Grid> */}
                {/* On Time */}
                {/* <Grid item lg={3} sm={6} xl={3} xs={12}>
                  <OnTime />
                </Grid>

                {/* Due Soon */}
                <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
                  <DueSoon />
                </Grid>
                
                
                {/* Over Due */}

                <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
                  <OverDue />
                </Grid >          
			
            
                
                <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
                <PagesSaved/>
                </Grid>
        	
		           
                <Grid item xs={12} sm={12} md={8} lg={12} xl={3}>
                  <NewsFeed />
                </Grid>
              </Grid>

		<br/>
		<br/>
		<br/>
		 {/* <Todo userid = {userObj.id}/> */}

              {/* <Box pt={4}>
                <Copyright />
              </Box> */}
              </Container>
		
          </main>
           
        )
    }


export default MainComponent
