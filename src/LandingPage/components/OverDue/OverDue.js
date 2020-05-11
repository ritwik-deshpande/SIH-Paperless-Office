import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Avatar,
  LinearProgress
} from '@material-ui/core';
import InsertChartIcon from '@material-ui/icons/InsertChartOutlined';
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
    backgroundColor: '#f44336',
    color: 'black',
    height: 56,
    width: 56
  },
  icon: {
    height: 32,
    width: 32
  },
  progress: {
    marginTop: 3
  }
}));

const OverDue = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [overDueFlows] = useState(mockData);

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
              Over Due
            </Typography>
            <List>
          {overDueFlows.map((flow, i) => (
            <ListItem divider={i < overDueFlows.length - 1} key={flow.id}>
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

OverDue.propTypes = {
  className: PropTypes.string
};

export default OverDue;
