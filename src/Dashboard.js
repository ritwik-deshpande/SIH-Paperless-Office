  
import React from 'react';
import clsx from 'clsx';

import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Popover from '@material-ui/core/Popover';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';

import MailIcon from '@material-ui/icons/Mail';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import NavBar from './Navbar'
import useStyles from './Style'
import LandingPage from './LandingPage/LandingPage'
import {Route,BrowserRouter} from 'react-router-dom'
import FolderComponent from './ViewDocs/Folders'
import FormComponent  from "./Forms/FormComponent";
import StartWrkflwComponent from './Workflow/StartWrkflwComponent';
import ApproveComponent from './Approvals/ApproveComponent';
import ESignComponent from './Signatures/ESignComponent'
import StatusComponent from './Workflow/StatusComponent'
import api from './utils/api'
import Root from './Chat/Component/Root/Root'

import {messaging } from './Chat/Config/MyFirebase'
import firebase from 'firebase'



// window.addEventListener('load', async () => {
//   const registration = await navigator.serviceWorker.register('./firebase-messaging-sw.js', {
//       updateViaCache: 'none'
//   });
// messaging.useServiceWorker(registration);
// })


//connect returns a high order component in which we need to wrap the component we need the stroe in.
export default function Dashboard({userObj, logout}) {

	
 const User = userObj
 messaging.requestPermission()
  .then( function(){
    console.log('Have Permission')
    return messaging.getToken()
  })
  .then(function(token) {
    console.log(token)
  })
  .catch(function(err){
    console.log(err)
  })

 messaging.onMessage(function(payload){
  console.log(payload);
  const n = {
    title: payload.notification.title,
    content : payload.notification.body
  }
  const temp = {...notifs, "n4" : n}
  setNotifs(temp);
})

 function getNotifications(){
  let notifications = []

  for (var key in notifs){
	console.log(key)
	notifications.push(
		<Card >
		      <CardContent>
			<Typography variant="h5" component = "h2">
			  {notifs[key].title}
			</Typography>
			<Typography className={classes.title} color="textSecondary" gutterBottom>
			  {notifs[key].content}
			</Typography>
		      </CardContent>
			
		      <CardActions>
			<Button size="small">Learn More</Button>
		      </CardActions>
		</Card>)

	}
	return notifications


}

  const classes = useStyles();
  const [notifs,setNotifs] = React.useState([]);
  const [open, setOpen] = React.useState(true);
  if(localStorage.getItem("notifs"))
  {
    setNotifs(JSON.parse(localStorage.getItem("notifs")))
  }
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
 
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const notify = Boolean(anchorEl);
  const id = notify ? 'simple-popover' : undefined;

//console.log("The user object is", userObj)

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

          <Typography component="h1" variant="h6" color="inherit"  noWrap className={classes.title}>
            Name : {userObj.name}
          </Typography>
         


          <IconButton color="inherit" onClick={handleClick}>
            <Badge badgeContent={Object.keys(userObj.notifications).length} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>

	<Popover
		id={id}
		open={notify}
		anchorEl={anchorEl}
		onClose={handleClose}
		anchorOrigin={{
		  vertical: 'bottom',
		  horizontal: 'center',
		}}
		transformOrigin={{
		  vertical: 'top',
		  horizontal: 'center',
		}}
		>

		{getNotifications()}
		
	</Popover>
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
        <List>
           <NavBar userObj = {userObj} open = {open} logout = {logout}/>
           </List>
        <Divider/>
      </Drawer>
    
      <div className={classes.appBarSpacer} />

      <Route exact path='/' component={LandingPage}/>
      <Route exact path='/viewDocs' component={FolderComponent} />
      <Route exact path='/getForm' component={StartWrkflwComponent} />
      <Route exact path='/Form' component={FormComponent} />
      <Route exact path='/esign' render={() => <ESignComponent userObj={userObj} />} />
      <Route exact path='/approve' render={()=> <ApproveComponent userObj={userObj}/>} />
      <Route exact path='/status' component={StatusComponent}/>
      <Route exact path='/chat' component={() => <Root userObj={userObj} />}/>
     
  
      </div>
       
    
   
  
    </BrowserRouter>


   
  );
}
