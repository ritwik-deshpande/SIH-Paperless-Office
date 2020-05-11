import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';
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

import MoreVertIcon from '@material-ui/icons/MoreVert';
import MoneyIcon from '@material-ui/icons/Money';

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
    backgroundColor: '#90caf9',
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

const OnTime = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [onTimeFlows] = useState(mockData);

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
              On Time
            </Typography>
            <List>
          {onTimeFlows.map((flow, i) => (
            <ListItem divider={i < onTimeFlows.length - 1} key={flow.id}>
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

OnTime.propTypes = {
  className: PropTypes.string
};

export default OnTime;
