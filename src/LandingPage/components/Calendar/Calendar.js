import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

import { Component } from 'react';
import Calendar from 'react-calendar';
class MyApp extends Component {
  state = {
    date: new Date(),
  }

  onChange = date => this.setState({ date })

  render() {
    return (
      <div>
        <Calendar
          onChange={this.onChange}
          value={this.state.date}
        />
      </div>
    );
  }
}

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    backgroundColor: 'white',
    color: '#aa647b'
  },
  content: {
    alignItems: 'center',
    display: 'flex'
  },
  title: {
    fontWeight: 700
  },
  avatar: {
    backgroundColor: 'white',
    color: '#aa647b',
    height: 56,
    width: 56
  },
  icon: {
    height: 32,
    width: 32
  }
}));

const MyCalendar = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent>
        <Grid container justify="space-between">
          <Grid item>
            <Typography className={classes.title} color="inherit" gutterBottom variant="body2">
              Calendar
            </Typography>
            <MyApp />
          </Grid>
          
        </Grid>
      </CardContent>
    </Card>
  );
};

MyCalendar.propTypes = {
  className: PropTypes.string
};

export default MyCalendar;
