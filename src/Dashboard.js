  
import React from 'react';
import clsx from 'clsx';

import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';


import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import NavBar from './listitems'
import useStyles from './Style'
import y from './MainComponent'
import {Route,BrowserRouter} from 'react-router-dom'
import FolderComponent from './Folders'
import FormComponent  from "./Forms/FormComponent";
import StartWrkflwComponent from './Workflow/StartWrkflwComponent';

import DisplayWorkflow from './Workflow/DisplayWorkflowComponent';



export default function Dashboard() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
 

  return (
    <BrowserRouter>
    
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit"  noWrap className={classes.title}>
            DigiDocs
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List> <NavBar/></List>
        <Divider />
      </Drawer>
      <div>
      <Route exact path='/' component={y}/>
      <Route exact path='/viewDocs' component={FolderComponent} />
      <Route exact path='/getForm' component={StartWrkflwComponent} />
      <Route exact path='/Form' component={FormComponent} />
     
     </div>
      
       
    </div>
    </BrowserRouter>
  );
}