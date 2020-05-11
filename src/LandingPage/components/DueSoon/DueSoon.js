import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';
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

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  content: {
    alignItems: 'center',
    display: 'flex'
  },
  title: {
    fontWeight: 700
  },
  avatar: {
    backgroundColor: '#4caf50',
    height: 56,
    width: 56
  },
  icon: {
    height: 32,
    width: 32
  },
  difference: {
    marginTop: 2,
    display: 'flex',
    alignItems: 'center'
  },
  differenceIcon: {
    color: 'black'
  },
  differenceValue: {
    color: 'black',
    marginRight: 1
  }
}));

const DueSoon = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [dueSoonFlows] = useState(mockData);

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent>
        <Grid
          container
          justify="space-between"
        >
          <Grid item>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
              variant="body2"
            >
              Due Soon
            </Typography>
            <List>
          {dueSoonFlows.map((flow, i) => (
            <ListItem divider={i < dueSoonFlows.length - 1} key={flow.id}>
              <ListItemText primary={flow.name} />
              <IconButton
                edge="end"
                size="small"
              >
                <MoreVertIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
          
          </Grid>
        </Grid>
        
      </CardContent>
    </Card>
  );
};

DueSoon.propTypes = {
  className: PropTypes.string
};

export default DueSoon;
