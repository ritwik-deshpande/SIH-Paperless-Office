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

const useStyles = makeStyles((theme) => ({
  root: {
    width: '200%',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

const json ={
  
  listitems : [{id:1, subject:'Need Plancks constant',
            nameofSender: 'Dustin Henderson', status: 'never ending story'},
            {id:2, subject:'Escape from Mind Flayer',
            nameofSender: 'Will Byers', status: 'Approved by Chief PD'},
            {id:3, subject:'Want eleven to stop', 
            nameofSender: 'Mike Wheeler', status: 'Threatened by the party'}]
}

export default function AlignItemsList({Click,json}) {
  const classes = useStyles();
  const renderListItem = (obj) =>{
    return(obj.map(item =>{
      return(
      <div key={item.id}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt={item.nameofSender} src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary={ item.subject }
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                {item.nameofSender}
              </Typography><br/>
              {item.status}
            </React.Fragment>
          }
        />
        <IconButton color="primary" onClick={()=>Click(item)}>
        <DoubleArrowTwoToneIcon style={{ fontSize: 40 }} />
        </IconButton>
      </ListItem>
      <Divider variant="inset" component="li" />
    </div>
    )}))
  }
  return (
    
    <List className={classes.root}>

      {renderListItem(json['requests'])}

    </List>
  );
}
