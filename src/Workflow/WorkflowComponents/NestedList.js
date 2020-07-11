import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import AddIcon from '@material-ui/icons/Add';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';

import Logo from './grid.jpg';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';


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
    gridList: {
      width: 1150,
      height: 850,
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      transform: 'translateZ(0)',
    },
    media: {
      height: 100,
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
        <ListItem button className={classes.nested} onClick={()=>Click(form.id,form.title)}>
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText primary={form.title} />
        </ListItem>
      </div>
      </div>
      )}))
    }
    
    return (
      <div>
       <br></br> 
         <br></br>
          <Typography className={classes.title} variant="h6" noWrap>
              Create Workflow
          </Typography>
         <br></br> 
         <br></br>
      
          <GridList cellHeight={500} spacing={30} cols={4} className={classes.gridList}>
          {Object.keys(json).map(key => {
          return (
          <div key={key}>
            <Card>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={Logo}
                title="Create Workflow"
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  info about type of workflows
                </Typography>
              </CardContent>
            </CardActionArea>
            <GridListTile>
            <ListItem button onClick={() => handleClick(key)}>
              <ListItemIcon>
              </ListItemIcon>
                <InboxIcon />
              <ListItemText primary={key} />
              {open.localeCompare(key) === 0 ? <ExpandLess /> : <ExpandMore/>}
            </ListItem>

            <Collapse in={open.localeCompare(key) === 0} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
            
                { renderListItem(json[key]) }

              </List>
            </Collapse>
          </GridListTile> 
          </Card>
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
       </GridList> 
      </div>
    );
  }