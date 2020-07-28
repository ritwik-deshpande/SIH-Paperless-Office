import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Avatar, Box, useTheme } from '@material-ui/core';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';

import MoreVertIcon from '@material-ui/icons/MoreVert';
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

// const useStyles = makeStyles(theme => ({
//   root: {
//     height: '100%'
//   },
//   content: {
//     alignItems: 'center',
//     display: 'flex'
//   },
//   title: {
//     fontWeight: 700
//   },
//   avatar: {
//     backgroundColor: '#4caf50',
//     height: 56,
//     width: 56
//   },
//   icon: {
//     height: 32,
//     width: 32
//   },
//   difference: {
//     marginTop: 2,
//     display: 'flex',
//     alignItems: 'center'
//   },
//   differenceIcon: {
//     color: 'black'
//   },
//   differenceValue: {
//     color: 'black',
//     marginRight: 1
//   }
// }));

const DueSoon = props => {
  const { className, ...rest } = props;

  // const classes = useStyles();
  const classes = makeStyles(style(useTheme()))();
  const [dueSoonFlows] = useState(mockData);

  return (
    <Card>
      <CardContent style={{width:"100%"}}>
          <Typography variant="h6" gutterBottom>
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
        </Box>
      </CardContent>
    </Card>
  );
};

DueSoon.propTypes = {
  className: PropTypes.string
};

export default DueSoon;
