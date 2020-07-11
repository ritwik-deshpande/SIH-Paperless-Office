import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import VisibilityIcon from '@material-ui/icons/Visibility';
import MaterialTable from 'material-table';
import Typography from '@material-ui/core/Typography';
import { forwardRef } from 'react';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import Divider from '@material-ui/core/Divider';
import useStyles from '../Style'
import DoubleArrowTwoToneIcon from '@material-ui/icons/DoubleArrowTwoTone'
import Avatar from '@material-ui/core/Avatar'

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
               On: {item.ts}
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
