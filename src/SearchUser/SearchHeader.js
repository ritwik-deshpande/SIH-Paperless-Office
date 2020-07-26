import React from 'react'
import { Paper, Typography, Box, makeStyles, useTheme } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import style from '../StyleSheet'

function SearchHeader(props) 
{
    const title = props.title
    const classes = makeStyles(style(useTheme()))();
  return (
    <React.Fragment>
      {/* <Paper className={classes.headerBox} elevation={0} square> */}
        <Grid container wrap="nowrap" className={classes.SearchheaderBox} alignItems="center" justify="center">
          <Grid item xs>
            <Typography variant="h2" align='center' className={classes.searchheaderTitle}><strong>{title}</strong></Typography>
          </Grid>
        </Grid>
      {/* </Paper> */}
    </React.Fragment>
  )
}

export default SearchHeader;
