import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Logo from '../Workflow/WorkflowComponents/grid.jpg';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {
	Col
  } from "shards-react";
import { Grid, Paper, Box, useTheme } from '@material-ui/core';
// import useStyles from '../Style'
import styles from '../StyleSheet'
// const useStyles = makeStyles(theme => ({
//   root: {
//     display: 'flex',
//   },
//   details: {
//     display: 'flex',
//     flexDirection: 'column',
//   },
//   content: {
//     flex: '1 0 auto',
//   },
//   cover: {
//     width: 151,
//   },
//   number : {
//       alignContent : 'center',
//       alignItems : 'center',
//       height : 100,
//   }
//   }));
// const theme = useTheme();
// const styles = theme => ({
//   numCardNumber: {
// 		margin: "auto",
//     // flex: '1 0 auto',
// 		padding: theme.spacing(1),
// 		// alignItems: "flex-start",
// 	},
// });

const color = {};
color['pending'] = "#ff9800";
color['completed'] = "#4caf50";
color['terminated'] = "#d32f2f";
color['active'] = "#303f9f"

export default function NumberCard({data}) {
    // const classes = useStyles();
    // const s = makeStyles(styles(useTheme()));
    const classes = makeStyles(styles(useTheme()))();
    const color = {};
    color['pending'] = "#ff9800";
    color['completed'] = "#4caf50";
    color['terminated'] = "#d32f2f";
    color['active'] = "#0288d1"
    return(
        <>
        {/* <Grid container alignContent="center" justify="space-around" align="center" spacing={2}> */}
        {Object.keys(data).map(key => {
          if(key.localeCompare("pending") === 0)
	 {
          return (
            <React.Fragment>
              <Col lg="3">
                <Card elevation={2}>
                    <CardContent>
                      <Box mt={1} textAlign="center" className={classes.numCardContent} >
                        <Typography variant="h2" style={{color:color[key]}}>
                          {data[key]}
                        </Typography>
                        <Typography component="h5" variant="h5" gutterbottom>
                          {key}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            APPROVALS
                        </Typography>
                      </Box> 
                    </CardContent>
                </Card>
              </Col>
              
            </React.Fragment>
          );
	}
	else{
	return (
            <React.Fragment>
              <Col lg="3">
                <Card elevation={2}>
                    <CardContent>
                      <Box mt={1} textAlign="center" className={classes.numCardContent} >
                        <Typography variant="h2" style={{color:color[key]}}>
                          {data[key]}
                        </Typography>
                        <Typography component="h5" variant="h5" gutterbottom>
                          {key}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            WORKFLOWS
                        </Typography>
                      </Box> 
                    </CardContent>
                </Card>
              </Col>
            </React.Fragment>
          );
	}
        })}
        {/* </Grid> */}
        </>
    )
}
