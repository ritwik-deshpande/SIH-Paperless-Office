import React from 'react'
import Box from '@material-ui/core/Box';
import useStyles from '../Style'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import clsx from 'clsx';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import FormBuilder from 'react-form-builder2'
import CustomForm from '../Forms/CustomForms'

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
const MainComponent= () =>{
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

        return(
            <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="lg" className={classes.container}>
              <Grid container spacing={10}>
                {/* On Time */}
                <Grid item lg={3} sm={6} xl={3} xs={12}>
                  <OnTime />
                </Grid>

                {/* Due Soon */}
                <Grid item lg={3} sm={6} xl={3} xs={12} >
                  <DueSoon />
                </Grid>
                
                {/* Over Due */}
                <Grid item lg={3} sm={6} xl={3} xs={12}>
                  <OverDue />
                </Grid>
                
                <Grid item lg={3} sm={6} xl={3} xs={12}>
                  <MyCalendar />
                </Grid>
        
                <Grid item lg={10} md={6} xl={3} xs={12}>
                  <NewsFeed />
                </Grid>
              </Grid>

              <Box pt={4}>
                <Copyright />
              </Box>
              </Container>
          </main>
        )
    }


export default MainComponent