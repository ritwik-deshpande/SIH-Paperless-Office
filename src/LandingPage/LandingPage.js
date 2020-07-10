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
import Calendar from '../Calendar/Calendar'

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

		
            <div> 
		<div className={classes.appBarSpacer} />
		<Calendar/> 
	    </div>
           
        )
    }


export default MainComponent
