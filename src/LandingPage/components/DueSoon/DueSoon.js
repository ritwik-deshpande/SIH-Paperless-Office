import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Avatar, Box, useTheme, Paper } from '@material-ui/core';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';
import {withRouter} from 'react-router-dom'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Timestamp from "../../../utils/TimeStamp";
import {
  CardHeader,
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton
} from '@material-ui/core';

import mockData from './data';
import style from '../../../StyleSheet';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';

function TabPanel(props) {
  const { children, value, index,classes,...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box className={classes.utilCard} style={{overflow: "auto"}}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

  const DueSoon = props => {
  const { className, ...rest } = props;
  const handleClick = (path, payload) => {
	props.history.push({
		pathname:path,
		state: payload
		})
  }


  function getRecentWorkflows(){
	if (props.recentWorkflows.length === 0) {
	    return (
	      <Box m={1} p={2}>
		<Typography>
		  No Content to Display
		</Typography>
	      </Box>
	    );
	  }


	let recentWorkflowsList = []
      console.log(props.recentWorkflows)
      for(var index in props.recentWorkflows){
		recentWorkflowsList.push(
			<ListItem key={props.recentWorkflows[index].id} alignItems="flex-start">
			      <ListItemText 
				primary={props.recentWorkflows[index].Title} 
				secondary={
				  <React.Fragment>
				    <Typography variant="subtitle1">
				      <Box fontSize={14} fontWeight={600}  color={"textSecondary"}> Id : {props.recentWorkflows[index].id} </Box>
				    </Typography>

				    <Typography variant="subtitle1">
				      <Box fontSize={14} fontWeight={600}  color={"textSecondary"}> Status : {props.recentWorkflows[index].status} </Box>
				    </Typography>
				    <Typography variant="subtitle2">
				      <Box fontSize={12} fontWeight="Light"> {props.recentWorkflows[index].Feedback} </Box>
				    </Typography> 
				    <Typography variant="subtitle2">
				      <Box fontSize={12} fontWeight="Light"> Last Updated on: {props.recentWorkflows[index].Feedback_ts} </Box>
				    </Typography> 
				  </React.Fragment>
				}
			      /> 
			      <IconButton
				edge="end"
				size="small"
                                onClick={ () => handleClick('/status', props.recentWorkflows[index])}
			      >
				<ChevronRightIcon />
			      </IconButton>
			    </ListItem>
			
		)

  	}
	return recentWorkflowsList


	
  }

  function getUrgentApprovals(){
	console.log(props.urgentApprovals)

        if (props.urgentApprovals.length === 0) {
	    return (
	      <Box m={1} p={2}>
		<Typography>
		  No Content to Display
		</Typography>
	      </Box>
	    );
	  }
	let urgentApprovals = []
        for(var index in props.urgentApprovals){
	   	urgentApprovals.push(
   			<ListItem key={props.urgentApprovals[index].id} alignItems="flex-start">
			      <ListItemText 
				primary={props.urgentApprovals[index].subject} 
				secondary={
				  <React.Fragment>
				   <Typography variant="subtitle1">
				      <Box fontSize={14} fontWeight={600} > Id : {props.urgentApprovals[index].id} </Box>
				    </Typography>
				    <Typography variant="subtitle1">
				      <Box fontSize={14} fontWeight={600}  color={"#ff9800"}> Waiting for Your Approval </Box>
				    </Typography>
				    <Typography variant="subtitle2">
				      <Box fontSize={12} fontWeight="Light">Sent by: {props.urgentApprovals[index].nameofSender} </Box>
				    </Typography> 
				    <Typography variant="subtitle2">
				      <Box fontSize={12} fontWeight="Light"> Received on: {Timestamp.getTimestamp(parseInt( props.urgentApprovals[index].receivedon,10))} </Box>
				    </Typography> 
				  </React.Fragment>
				}
			      /> 
			      <IconButton
				edge="end"
				size="small"
                                onClick={() => handleClick('/approve', props.urgentApprovals[index])}
			      >
				<ChevronRightIcon />
			      </IconButton>
			    </ListItem>
			
		)

	}
	return urgentApprovals
	
  }


  // const classes = useStyles();
  const classes = makeStyles(style(useTheme()))();

  
  const [myWorkflows] = useState(mockData);
  const [pendingApprovals] = "";
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  
  return (
    // <Card>
    //   <CardContent style={{width:"100%"}}>
    <Paper style={{width:"100%", height: "100%",padding:"8px"}}>
      <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Recent Workflows" wrapped/>
          <Tab label="Urgent Approvals" wrapped/>
      </Tabs>
      <SwipeableViews
        axis='x'
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} classes={classes}>
        
	   <List disablePadding dense>
          {getRecentWorkflows()}
	   </List>
        </TabPanel>
        <TabPanel value={value} index={1} classes={classes}>
          
	    <List disablePadding dense>
          {getUrgentApprovals()}
	    </List>
        </TabPanel>
      </SwipeableViews>
    </Paper>
      /* <Typography variant="h6" gutterBottom>
            Recent Workflows
          </Typography>
          <Divider />
          <Box className={classes.utilCard} style={{overflow: "auto"}}>
            <List disablePadding dense>
          {dueSoonFlows.map((flow, i) => (
            <ListItem key={flow.id} alignItems="flex-start">
              <ListItemText 
                primary={flow.title} 
                secondary={
                  <React.Fragment>
                    <Typography variant="subtitle1">
                      <Box fontSize={14} fontWeight={600}  color={flow.type === 'approver' ? "#ff9800" : "textSecondary"}> {flow.subtitle1} </Box>
                    </Typography>
                    <Typography variant="subtitle2">
                      <Box fontSize={12} fontWeight="Light"> {flow.subtitle2} </Box>
                    </Typography> 
                  </React.Fragment>
                }
              /> 
              <IconButton
                edge="end"
                size="small"
              >
                <ChevronRightIcon />
              </IconButton>
            </ListItem>
            
          ))}
         </List>
        </Box> */
    //   </CardContent>
    // </Card>
  );
};

DueSoon.propTypes = {
  className: PropTypes.string
};

export default withRouter(DueSoon);
