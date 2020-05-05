import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';

const useStyles = makeStyles(theme => ({
    root: {
      width: "150%",
      maxWidth: 300,
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      width: "100%",
      paddingLeft: theme.spacing(4),
    },
  }));
  
// const json ={
//   New:[{id : 1, title: "Start a Custom WorkFlow"}],
//   Academics : [{id : 1, title: "Admission Cancellation"},
//                 {id :2, title: "No Dues Form"},
//                 {id :3, title: "Library Registration"}],
//   Store : [{id :4, title: "Tender 1"},
//             {id : 5, title : "Random Form"}]
// }

// const acad = [{id : 1, title: "Admission Cancellation"},
// {id :2, title: "No Dues Form"}]

export default function NestedList({menu,Click}) {
    const classes = useStyles();


    const json = menu.contents


    console.log("The json is ")
    console.log(menu)
    const [open, setOpen] = React.useState("")
    const handleClick = (key) => {
      
      if(open.localeCompare(key) === 0)
      {
        setOpen("")
      }
      else{
        setOpen(key)
      }
    };
    
    const renderListItem = (obj) =>{
      return(obj.map(form =>{
        return(
         <div>
          <div className={classes.appBarSpacer} />
        <div key={form.id}>
        <ListItem button className={classes.nested} onClick={()=>Click(form.title)}>
          <ListItemIcon>
            <StarBorder />
          </ListItemIcon>
          <ListItemText primary={form.title} />
        </ListItem>
      </div>
      </div>
      )}))
    }
    
    return (
      
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
           
          </ListSubheader>
        }
        className={classes.root}
      >
        
        
        {Object.keys(json).map(key => {
          
          return (
          
          <div key={key}>
            <ListItem button onClick={() => handleClick(key)}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={key} />
              {open.localeCompare(key) === 0 ? <ExpandLess /> : <ExpandMore/>}
            </ListItem>

            <Collapse in={open.localeCompare(key) === 0} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
            
                { renderListItem(json[key]) }

              </List>
            </Collapse>
          </div>

          );
        })}
        
        

        {/* <ListItem button onClick={handleClick}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Hostel Section" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="Starred" />
            </ListItem>
          </List>
      </Collapse> */}
      </List> 
    );
  }