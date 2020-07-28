import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import mockData from './data';

// const useStyles = makeStyles(() => ({
//   root: {
//     height: '100%'
//   },
//   content: {
//     padding: 0
//   },
//   image: {
//     height: 48,
//     width: 48
//   },
//   actions: {
//     justifyContent: 'flex-end'
//   }
// }));

const NewsFeed = props => {
  const { className, ...rest } = props;

  // const classes = useStyles();

  const [products] = useState(mockData);

  return (
    <Card>
      <CardHeader
        subtitle={`${products.length} in total`}
        title="News Feed"
      />
      <Divider />
      <CardContent style={{padding: 0, maxHeight:"800px",overflow:"auto"}}>
        <List>
          {products.map((product, i) => (
            <ListItem divider={i < products.length - 1} key={product.id}>
              <ListItemText primary={product.name} secondary={`Updated ${product.updatedAt.fromNow()}`}/>
              <IconButton
                edge="end"
                size="small"
              >
                <MoreVertIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </CardContent>
      <Divider />
      <CardActions style={{justifyContent: 'flex-end'}}>
        <Button
          color="primary"
          size="small"
          variant="text"
        >
          View all <ArrowRightIcon />
        </Button>
      </CardActions>
    </Card>
  );
};

NewsFeed.propTypes = {
  className: PropTypes.string
};

export default NewsFeed;
