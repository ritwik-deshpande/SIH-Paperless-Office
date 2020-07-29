 
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
// import useStyles from './Style'
import LandingPage from './LandingPage/LandingPage'
import { Route, BrowserRouter } from 'react-router-dom'
import FolderComponent from './ViewDocs/Folders'
import FormComponent from "./Forms/FormComponent";
import StartWrkflwComponent from './Workflow/StartWrkflwComponent';
import ApproveComponent from './Approvals/ApproveComponent';
import ESignComponent from './Signatures/ESignComponent'
import StatusComponent from './Workflow/StatusComponent'
import api from './utils/api'
import Root from './Chat/Component/Root/Root'
import { toast, ToastContainer } from 'react-toastify'
import { Box, makeStyles, useTheme, Tooltip } from '@material-ui/core';

//import { Alert } from 'react-native';
import { messaging } from './Chat/Config/MyFirebase'
import firebase from 'firebase'
import Calendar from './Calendar/Calendar'
import AnalyticDashboard from './Analytics/AnalyticDashbard';
import FirepadEditor from './TextEditor/Firepad';
import MyMails from './Email/MyMails';
import ComposeMail from './Email/ComposeMail';
import style from './StyleSheet';
import Hidden from "@material-ui/core/Hidden";
import SearchUser from './SearchUser/SearchUser';

import { useLocation } from 'react-router-dom';

function Dashboard({ userObj, logout},props) {


  
  // window.addEventListener('load', async () => {
  //   const registration = await navigator.serviceWorker.register('./firebase-messaging-sw.js', {
  //       updateViaCache: 'none'
  //   });
  // messaging.useServiceWorker(registration);
  // })

  // const classes = useStyles();
  const { window } = props;
  const classes = makeStyles(style(useTheme()))();
  const [notifs, setNotifs] = React.useState([{
    title: "Demo Notification",
    content: "demo content for testing notification feature"
  }]);
  const [pushNotif, setPushNotifs] = React.useState({});

  const [myWorkflows, setMyWorkflows] = React.useState(null)
  const [myApprovals, setMyApprovals] = React.useState(null)
  const [open, setOpen] = React.useState(false);

  //const [badge, setBadge] = React.useState(false);

  
  function renderStatusComponent(){
  	if(myWorkflows){
  		return (<StatusComponent myWorkflows={myWorkflows}/>)
  	}
  	else{
  		return (<h1> Loading...</h1>)
  	}
  }
  function renderLandingPageComponent(){
  	if(myWorkflows && myApprovals){
  		return (<LandingPage userObj = {userObj} myWorkflows={myWorkflows} myApprovals={myApprovals}/> )
  	}
  	else{
  		return (<h1> Loading...</h1>)
  	}
  }
  
  function renderApprovalComponent(){
  	if(myApprovals){
  		return (<ApproveComponent userObj={userObj} myApprovals = {myApprovals}/>)
  	}
  	else{
  		return (<h1> Loading...</h1>)
  	}
  }

  React.useEffect(() => {

	api
			.pending_request()
			.get(userObj.id)
			.then((res) => {
				if(res && res.data){
				console.log("The Pending Request data received is", res.data);
				setMyApprovals(res.data)
				}
				else{
				     setMyApprovals({requests:[]})
				}
			})
			.catch(err => {
			      setMyApprovals({requests:[]})			
			});

  },[])
  
  React.useEffect(() => {

	api.myworkflows()
			.get(userObj.name)
			.then((res) => {
				if(res && res.data){
					console.log("The Workflow data received is", res.data);
					setMyWorkflows(res.data)
				}
				else{
					setMyWorkflows([])
				}
			})
			.catch(err => {
				setMyWorkflows([])
			});

  },[])


  
  React.useEffect(() => {

    
  messaging.requestPermission()
    .then(function () {
      console.log('Have Permission')
      return messaging.getToken()
    })
    .then(function (token) {
      
      if(token){

        sessionStorage.setItem("token", token)
      
      api.notification().get(userObj.id,token)
      .then(
        (res) => {
          setNotifs(res.data.notifs.reverse())
        }
      )
      }
      console.log(token)
    })
    .catch(function (err) {
      console.log(err)
    })

    const unsubscribe = messaging.onMessage(async payload => {
      console.log(payload)
      const n = {
        title: payload.notification.title,
        content: payload.notification.body
      }
      setPushNotifs(n)
    });

    return unsubscribe;
  }, []);
  React.useEffect(() => {

    setNotifs([pushNotif, ...notifs])
  }, [pushNotif]);
  // messaging.onMessage(function(payload){
  //   console.log(payload);
  //   const n = {
  //     title: payload.notification.title,
  //     content : payload.notification.body
  //   }
  //   setNotifs([n,...notifs])


  // })
  const handleDrawerToggle = () => {
    setOpen(!open);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  // const handleDrawerClose = () => {
  //   setOpen(false);
  // };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const notify = Boolean(anchorEl);
  const id = notify ? 'simple-popover' : undefined;

  
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const navBar = (
    <React.Fragment>
      <div className={classes.toolbarIcon}>
        <IconButton onClick={handleDrawerClose} className={classes.navBarIcons}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <NavBar userObj = {userObj} open = {open} logout = {logout} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex}/>
    </React.Fragment>
  );

  const container = window !== undefined ? () => window().document.body : undefined;
  console.log("Dashboard :",userObj)
  return (

    <BrowserRouter>
      <ToastContainer
        autoClose={2000}
        hideProgressBar={true}
        position={toast.POSITION.BOTTOM_RIGHT}
      />
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            {open ? "" :
              <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                <Box fontWeight={800} display="inline">Digi</Box>
                <Box display="inline">Docs</Box>
              </Typography>
            }
           
            {/* <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title} align="center">
              Welcome,<Box fontWeight={600} display="inline">{userObj.name}</Box>
            </Typography>         */}
           

          <IconButton color="inherit" onClick={handleClick}>
            <Badge badgeContent={''}color="secondary">
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

		{notifs.map((value)=>{
  return(<Card >
      <CardContent>
        <Typography variant="h5" component = "h2">
          {value.title}
        </Typography>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {value.content}
        </Typography>
            </CardContent>
        
            <CardActions>
        <Button size="small">Learn More</Button>
            </CardActions>
      </Card>)
    })}
		
	</Popover>
        </Toolbar>
      </AppBar>
      {/* <Drawer
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
        
        
          <NavBar userObj = {userObj} open = {open} logout = {logout}/>
        
      </Drawer> */}
      <nav className={classes.drawer} aria-label="mailbox folders"> 
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden mdUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            open={open}
            onClose={handleDrawerClose}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
            
          >
            {navBar}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            variant="permanent"
            className={clsx(classes.drawer, {
              [classes.drawerClose]: !open
            })}
            classes={{
              paper: clsx({
                [classes.drawerClose]: !open
              })
            }}
          >
              {navBar}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
      <div className={classes.appBarSpacer} />

      <Route exact path='/' render ={() => renderLandingPageComponent() }/>
      <Route exact path='/viewDocs' component={FolderComponent} />
      <Route exact path='/getForm' component={StartWrkflwComponent} />
      <Route exact path='/Form' component={FormComponent} />
      <Route exact path='/esign' render={() => <ESignComponent userObj={userObj} />} />
      <Route exact path='/calendar' render={() => <Calendar userObj={userObj} />} />
      <Route exact path='/approve' render={()=> renderApprovalComponent()} />
      <Route exact path='/status' render={ () => renderStatusComponent() }/>
      <Route exact path='/chat' component={() => <Root userObj={userObj} />}/>
      <Route exact path='/analytics' component={() => <AnalyticDashboard userObj={userObj} />}/>
      <Route exact path='/searchuser' render={() => <SearchUser userObj={userObj} />} />
      
     
        </main>
      </div>




    </BrowserRouter>



  );
}

export default Dashboard;
