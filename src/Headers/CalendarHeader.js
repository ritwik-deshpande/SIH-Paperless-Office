import React from 'react'
import { Paper, Typography, Box, makeStyles, useTheme } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import style from '../StyleSheet'
import EventIcon from '@material-ui/icons/Event';
function CalendarHeader(props) 
{
    const title = props.title
    const classes = makeStyles(style(useTheme()))();
  return (
    <React.Fragment>
      {/* <Paper className={classes.headerBox} elevation={0} square> */}
        <Grid container wrap="nowrap" className={classes.calendarHeader} alignItems="center" justify="center">
          <Grid item xs>
            <EventIcon className={classes.calendarIcon}/><Typography variant="h4" className={classes.headerTitle}>{title}</Typography>
          </Grid>
        </Grid>
      {/* </Paper> */}
    </React.Fragment>
  )
}

export default CalendarHeader;
