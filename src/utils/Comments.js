import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import DoubleArrowTwoToneIcon from '@material-ui/icons/DoubleArrowTwoTone';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));



export default function Comments({json}) {
  const classes = useStyles();
  const renderListItem = (obj) =>{
	if(obj.length == 0){
		return (<div> No Feedback </div>)
	}
	
    return(obj.map(item =>{
      return(
      <div key={item.id}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt={item.name} src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary={ item.name }
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                {item.message}
              </Typography><br/>
	      <Typography
                component="span"
                variant="body3"
                className={classes.inline}
                color="textPrimary"
              >
                {item.timestamp}
              </Typography><br/>
              
            </React.Fragment>
          }
        />
        
      </ListItem>
      <Divider variant="inset" component="li" />
    </div>
    )}))
  }
  return (
    <Paper >
   <Typography variant="h6">
	    Approvers Feedback
	</Typography>
    <List className={classes.root} style={{maxHeight: 200,maxwidth:100, overflow: 'auto'}}>

      {renderListItem(json['listitems'])}

    </List>
    </Paper>
  );
}
