import React from 'react'
import { Paper, Typography, Box, makeStyles, useTheme } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import style from '../StyleSheet'
import PersonIcon from '@material-ui/icons/Person';
function Header(props) 
{
    const title = props.title
    const classes = makeStyles(style(useTheme()))();
  return (
    <React.Fragment>
      {/* <Paper className={classes.headerBox} elevation={0} square> */}
        <Grid container wrap="nowrap" className={classes.myProfileHeader} alignItems="center" justify="center">
          <Grid item xs>
          <PersonIcon className={classes.calendarIcon}/><Typography variant="h4" className={classes.headerTitle}>{title}</Typography>
          </Grid>
        </Grid>
      {/* </Paper> */}
    </React.Fragment>
  )
}

export default Header;
