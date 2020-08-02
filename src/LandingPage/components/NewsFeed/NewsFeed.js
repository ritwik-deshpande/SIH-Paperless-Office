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
  Typography,
  Paper,
  Box,
  Grid
} from '@material-ui/core';

import CommentBox from './Response/CommentBox'
import Comment from "./Response/Comment";
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import style from '../../../StyleSheet'
import mockData from './data';
import useMediaQuery from '@material-ui/core/useMediaQuery';

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

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const latestComments = 2;
  return (
    // <Paper>
    //   <Typography variant="h6" gutterBottom>
    //          Feed
    //       </Typography>
    <div className={classes.newsBox}>
      
    {/* <Card>
      <CardHeader
        subtitle={`${products.length} in total`}
        title="News Feed"
      />
      <Divider /> */}
      <Accordion style={{width: '100%'}} disabled>
          <AccordionSummary
            id="panel1bh-header"
          >
          <Typography >NEWS FEED </Typography>
          
          </AccordionSummary>
            
        </Accordion>
          {products.map((product, i) => (
              
              <Accordion expanded={expanded === product.id} onChange={handleChange(product.id)} style={{width: '100%'}}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                <Typography>{product.title}</Typography>
                
                </AccordionSummary>
                <AccordionDetails >
                  <div style={{width:"100%"}}>
                    <List dense>
                      {
                        product.comments.slice(0,latestComments).map(comment => {
                          return (
                            <Comment author={comment.name} body={comment.comment} key={comment.id} time={comment.timestamp}/>
                          );
                        })
                      }
                    </List>
                    <CommentBox id={product.id} comments ={product.comments} title={product.title} userObj ={props.userObj} fullScreen={fullScreen}/>
                  </div>
                </AccordionDetails>
              </Accordion>
          ))}
      {/* </CardContent> */}
      {/* <Divider />
      <CardActions style={{justifyContent: 'flex-end'}}>
        <Button
          color="primary"
          size="small"
          variant="text"
        >
          View all <ArrowRightIcon />
        </Button>
      </CardActions>
    </Card> */}
    </div>
    // </Paper>
  );
};

NewsFeed.propTypes = {
  className: PropTypes.string
};

export default NewsFeed;
