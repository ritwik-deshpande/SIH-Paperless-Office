import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import { withRouter } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import AccountCircle from '@material-ui/icons/AccountCircle';
import useStyles from './Style'
import Typography from '@material-ui/core/Typography';
import ChatIcon from '@material-ui/icons/Chat';
import FolderIcon from '@material-ui/icons/Folder';
import WorkIcon from '@material-ui/icons/Work';
import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite';
import CreateIcon from '@material-ui/icons/Create';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Tooltip from '@material-ui/core/Tooltip';
import Box from '@material-ui/core/Box';
import AssessmentIcon from '@material-ui/icons/Assessment';


function Listitems(props) {

  const pageDict = {};
  pageDict['/']=1;
  pageDict['/esign']=2;
  pageDict['/viewDocs']=3;
  pageDict['/status']=4;
  pageDict['/getForm']=5;
  pageDict['/approve']=6;
  pageDict['/chat']=7;
  pageDict['/analytics']=8;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(pageDict[props.history.location.pathname]);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleNavlink = (link, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
    console.log(props);
    props.history.push(link);  
  };
 
  const handleDashboard = (index) =>{
    setSelectedIndex(index);
    console.log('Props is',props);
    props.history.push('/');
    
  }

const classes = useStyles();
  return (
    <div>
      {props.open ? <div className={classes.navBarLogo} >
        <img src="../DigiDocsLogoW.png" className={classes.loginLogo}/>
        {/* <Typography component="h3" variant="h6" color="inherit"  noWrap className={classes.title}>
                Welcome, {props.userObj.name}
        </Typography>  */}
        <Typography component="h1" variant="h4" align="center">
          <Box fontWeight={800} display="inline">Digi</Box>
          <Box display="inline">Docs</Box>
        </Typography>
        <br/>
  	  <Divider/>
      </div>: null }

      <List component="nav">
        <Tooltip title={props.open ? "" : "Dashboard"}>
          <ListItem button selected={selectedIndex===1} onClick={() => handleDashboard(1)} >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
        </Tooltip>

        <Tooltip title={props.open ? "" : "My Profile"}>
          <ListItem button selected={selectedIndex===2} onClick={() => handleNavlink('/esign',2)}>
            <ListItemIcon>
              <AccountCircle />
            </ListItemIcon>
            <ListItemText primary="My Profile"/>
          </ListItem>
        </Tooltip>

        <Tooltip title={props.open ? "" : "My Documents"}>
          <ListItem button selected={selectedIndex===3} onClick={() => handleNavlink('/viewDocs',3)}>
            <ListItemIcon>
              <FolderIcon />
            </ListItemIcon>
            <ListItemText primary="My Documents" /> 
          </ListItem>
        </Tooltip>

        <Tooltip title={props.open ? "" : "My Workflows"}>
          <ListItem button selected={selectedIndex===4} onClick={() => handleNavlink('/status',4)}>
            <ListItemIcon>
              <WorkIcon />
            </ListItemIcon>
            <ListItemText primary="My WorkFlows"/>
          </ListItem>
        </Tooltip>

        <Divider/>
        
        <Tooltip title={props.open ? "" : "Start a Workflow"}>
          <ListItem button selected={selectedIndex===5} onClick={() => handleNavlink('/getForm',5)}>
            <ListItemIcon>
              <PlayCircleFilledWhiteIcon />
            </ListItemIcon>
            <ListItemText primary="Start a Workflow"/>
          </ListItem>
        </Tooltip>

        <Tooltip title={props.open ? "" : "Approve Documents"}>
          <ListItem button selected={selectedIndex===6} onClick={() => handleNavlink('/approve',6)}>
            <ListItemIcon>
              <CreateIcon />
            </ListItemIcon>
            <ListItemText primary="Approve Documents" />
          </ListItem>
        </Tooltip>

        <Tooltip title={props.open ? "" : "Chat"}>
          <ListItem button selected={selectedIndex===7} onClick={() => handleNavlink('/chat',7)}>
            <ListItemIcon>
              <ChatIcon />
            </ListItemIcon>
            <ListItemText primary="Chat" />
          </ListItem>
        </Tooltip>
 
	<Tooltip title={props.open ? "" : "Analytics"}>
          <ListItem button selected={selectedIndex===8} onClick={() => handleNavlink('/analytics',8)}>
            <ListItemIcon>
              <AssessmentIcon />
            </ListItemIcon>
            <ListItemText primary="Analytics" />
          </ListItem>
        </Tooltip>
      
        <Divider/>

        <Tooltip title={props.open ? "" : "LogOut"}>
          <ListItem button selected={selectedIndex===9}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="LogOut" onClick={ () => props.logout()}/>
          </ListItem>
        </Tooltip>

        

     </List>
  	</div>
  )
}







export default withRouter(Listitems )
