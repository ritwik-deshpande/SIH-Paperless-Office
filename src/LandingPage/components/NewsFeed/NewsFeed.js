import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/styles';
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
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography
} from '@material-ui/core';

import CommentBox from './Response/CommentBox'
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import style from '../../../StyleSheet'
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

function NewsFeed(props){
  //const { className, ...rest } = props;
  const classes = makeStyles(style(useTheme()))();
  //const classes = useStyles();

  const user = props.userObj;

  const [products] = useState(mockData);
  
  const [expanded, setExpanded] = React.useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Card>
      <CardHeader
        subtitle={`${products.length} in total`}
        title="News Feed"
      />
      <Divider />
      <CardContent style={{padding: 0, maxHeight:"800px",overflow:"auto"}}>
          {products.map((product, i) => (
              <div>
              <Accordion expanded={expanded === product.id} onChange={handleChange(product.id)} style={{width: '100%'}}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                <Typography>{product.title}</Typography>
                
                </AccordionSummary>
                <AccordionDetails>
                    <CommentBox id={product.id} comments ={product.comments} user ={user}/>
                </AccordionDetails>
              </Accordion>
          </div>))}
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
