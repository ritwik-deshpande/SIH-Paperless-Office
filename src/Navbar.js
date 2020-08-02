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
import TodayIcon from '@material-ui/icons/Today';
// import useStyles from './Style'
import PageviewIcon from '@material-ui/icons/Pageview';
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

import ReportIcon from '@material-ui/icons/Report';
import CloseIcon from '@material-ui/icons/Close'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { IconButton, makeStyles, Avatar } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import html2canvas from 'html2canvas';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import style from './StyleSheet';
import GroupIcon from '@material-ui/icons/Group';

//import AvatarImage from './images/lodu.jpeg'


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Listitems(props) {

  const pageDict = {};
  pageDict['/']=1;
  pageDict['/esign']=2;
  pageDict['/calendar'] = 3;
  pageDict['/viewDocs']=4;
  pageDict['/status']=5;
  pageDict['/getForm']=6;
  pageDict['/approve']=7;
  pageDict['/chat']=8;
  pageDict['/analytics']=9;
  pageDict['/searchuser'] = 11
  pageDict['/Hierarchy'] = 12
  const [anchorEl, setAnchorEl] = React.useState(null);

  props.setSelectedIndex(pageDict[props.history.location.pathname]);
  let selectedIndex = props.selectedIndex;
  // const [selectedIndex, setSelectedIndex] = React.useState(pageDict[props.history.location.pathname]);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleNavlink = (link, index) => {
    props.setSelectedIndex(index);
    // setSelectedIndex(index);
    setAnchorEl(null);
    console.log(props);
    props.history.push(link);  
  };
 
  const handleDashboard = (index) =>{
    props.setSelectedIndex(index);
    // setSelectedIndex(index);
    console.log('Props is',props);
    props.history.push('/');
    
  }

  const [openDialog, setOpenDialog] = React.useState(false);

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
    takeSS();
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const [openSnackBar, setOpenSnackBar] = React.useState(false);

  const handleSubmitReportForm = () => {
    /* Submit Form Logic */
    setOpenDialog(false)
    setOpenSnackBar(true);
  };

  const handleCloseSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackBar(false);
  };

  const [imgData, setimgData] = React.useState(null);
  const takeSS = () => {
    html2canvas(document.getElementById("root")).then(function(canvas) {
      setimgData(canvas.toDataURL("image/png"));
      console.log("ImgData",imgData);
      // Canvas2Image.saveAsPNG(canvas, 1400,720);
    });
  };

  const [includeSS, setincludeSS] = React.useState(true);
  const handleChange = (event) => {
    setincludeSS(!includeSS);
  };

  // const classes = useStyles();
  const classes = makeStyles(style(useTheme()))();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <div>
      {/* {props.open ? <div className={classes.navBarProfile} >
        {/* <img src="../DigiDocsLogoW.png" className={classes.loginLogo}/> */}
        {/* <Typography component="h3" variant="h6" color="inherit"  noWrap className={classes.title}>
                Welcome, {props.userObj.name}
        </Typography>  */}
        {/* <Typography component="h1" variant="h4" align="center" color="inherit">
          <Box fontWeight={800} display="inline">Digi</Box>
          <Box display="inline">Docs</Box>
        </Typography> */}
        {/* <br/> */}
  	  {/* <Divider/> */}
      {/* </div>: null } */} 
      
      {props.open ? (
        // <List>
        
        <div className={classes.navBarProfile}>
        <Box pt={4}>
          <Typography color="inherit" align="center">
            <Box fontSize={20} >
              {props.userObj.name}
            </Box>
            <Box mt={1} fontSize={16} fontWeight="Light" color="textSecondary">
              ID:  {props.userObj.id}
            </Box>
          </Typography>

          <div align='center'>
						<img
						  className={classes.navBarProfileLogo}
						  src={require('./images/'+props.userObj.id+".jpg")}
			  			alt={props.userObj.name}
						/>
		  		</div>
        </Box>
        </div>
      ) : (null
        // <Box>
        //   <Box align="center" pt={10}>
        //     <Avatar
        //       alt={props.userObj.name}
        //       src="../../public/logo512.png"
        //       // className={classes.navBarProfileLogo}
        //     />
        //   </Box>
        // </Box>
      )}

      
      <div className={classes.navBarLists}>
      <List component="nav" className={classes.navBarListItems}>
        {/* <Tooltip title={props.open ? "" : "Dashboard"}> */}
          <ListItem button={!(selectedIndex===1)} selected={selectedIndex===1} onClick={() => handleDashboard(1)} >
            <ListItemIcon className={classes.navBarIcons}>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
        {/* </Tooltip> */}

        {/* <Tooltip title={props.open ? "" : "My Profile"}> */}
          <ListItem button={!(selectedIndex===2)} selected={selectedIndex===2} onClick={() => handleNavlink('/esign',2)}>
            <ListItemIcon className={classes.navBarIcons}>
              <AccountCircle />
            </ListItemIcon>
            <ListItemText primary="My Profile"/>
          </ListItem>
        {/* </Tooltip> */}

        {/* <Tooltip title={props.open ? "" : "Planner"}> */}
          <ListItem button={!(selectedIndex===3)} selected={selectedIndex===3} onClick={() => handleNavlink('/calendar',3)}>
            <ListItemIcon className={classes.navBarIcons}>
              <TodayIcon />
            </ListItemIcon>
            <ListItemText primary="Schedule A Meet"/>
          </ListItem>
        {/* </Tooltip> */}

        {/* <Tooltip title={props.open ? "" : "My Documents"}> */}
          <ListItem button={!(selectedIndex===4)} selected={selectedIndex===4} onClick={() => handleNavlink('/viewDocs',4)}>
            <ListItemIcon className={classes.navBarIcons}>
              <FolderIcon />
            </ListItemIcon>
            <ListItemText primary="My Documents" /> 
          </ListItem>
        {/* </Tooltip> */}

	      {/* <Tooltip title={props.open ? "" : "My Team"}> */}
          <ListItem button={!(selectedIndex===12)} selected={selectedIndex===12} onClick={() => handleNavlink('/Hierarchy',12)}>
            <ListItemIcon className={classes.navBarIcons}>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText primary="My Team" /> 
          </ListItem>
        {/* </Tooltip> */}


        <Divider classes={{root: classes.navBarDivider}} variant={props.open ? "fullWidth" :"middle"}/>

        {/* <Tooltip title={props.open ? "" : "View Workflows"}> */}
          <ListItem button={!(selectedIndex===5)} selected={selectedIndex===5} onClick={() => handleNavlink('/status',5)}>
            <ListItemIcon className={classes.navBarIcons}>
              <WorkIcon />
            </ListItemIcon>
            <ListItemText primary="View WorkFlows"/>
          </ListItem>
        {/* </Tooltip> */}
        
        {/* <Tooltip title={props.open ? "" : "Start a Workflow"}> */}
          <ListItem button={!(selectedIndex===6)} selected={selectedIndex===6} onClick={() => handleNavlink('/getForm',6)}>
            <ListItemIcon className={classes.navBarIcons}>
              <PlayCircleFilledWhiteIcon />
            </ListItemIcon>
            <ListItemText primary="Start a Workflow"/>
          </ListItem>
        {/* </Tooltip> */}

        {/* <Tooltip title={props.open ? "" : "Approve Documents"}> */}
          <ListItem button={!(selectedIndex===7)} selected={selectedIndex===7} onClick={() => handleNavlink('/approve',7)}>
            <ListItemIcon className={classes.navBarIcons}>
              <CreateIcon />
            </ListItemIcon>
            <ListItemText primary="Approve Documents" />
          </ListItem>
        {/* </Tooltip> */}

        {/* <Tooltip title={props.open ? "" : "Chat"}> */}
          <ListItem button={!(selectedIndex===8)} selected={selectedIndex===8} onClick={() => handleNavlink('/chat',8)}>
            <ListItemIcon className={classes.navBarIcons}>
              <ChatIcon />
            </ListItemIcon>
            <ListItemText primary="Chat" />
          </ListItem>
        {/* </Tooltip> */}
 
	      {/* <Tooltip title={props.open ? "" : "Analytics"}> */}
          <ListItem button={!(selectedIndex===9)} selected={selectedIndex===9} onClick={() => handleNavlink('/analytics',9)}>
            <ListItemIcon className={classes.navBarIcons}>
              <AssessmentIcon />
            </ListItemIcon>
            <ListItemText primary="Analytics" />
          </ListItem>
        {/* </Tooltip> */}
      
        <Divider classes={{root: classes.navBarDivider}} variant={props.open ? "fullWidth" :"middle"}/>

        {/* <Tooltip title={props.open ? "" : "Report Error"}> */}
          <ListItem button={!(selectedIndex===10)} selected={selectedIndex===10} onClick={handleClickOpenDialog}>
            <ListItemIcon className={classes.navBarIcons}>
              <ReportIcon />
            </ListItemIcon>
            <ListItemText primary="Report Error"/>
          </ListItem>
        {/* </Tooltip> */}

        {/* <Tooltip title={props.open ? "" : "Search User"}> */}
          <ListItem button={!(selectedIndex===11)} selected={selectedIndex===11} onClick={() => handleNavlink('/searchuser',11)}>
            <ListItemIcon className={classes.navBarIcons}>
              <PageviewIcon />
            </ListItemIcon>
            <ListItemText primary="Search User"/>
          </ListItem>
        {/* </Tooltip> */}

        <Dialog open={openDialog} onClose={handleCloseDialog} fullScreen={fullScreen}>
          <DialogTitle id="form-dialog-title">
            Report Error
            <IconButton aria-label="close" className={classes.closeButton} onClick={handleCloseDialog}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>
            <DialogContentText>
              We apologize for the inconvenience caused. Please fill in the details of the problem, so that we can assist better.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="userID"
              label="Enter your User ID"
              type="text"
              fullWidth
            />
            <TextField
              margin="dense"
              id="userName"
              label="Enter your User Name"
              type="text"
              fullWidth
            />
            <TextField
              margin="dense"
              id="workflowID"
              label="Enter the Workflow ID"
              type="text"
              fullWidth
            />
            <TextField
              id="description"
              label="Please describe the Problem here."
              multiline
              margin="dense"
              rows={4}
              fullWidth
            />
            <FormGroup>
              <FormControlLabel
                control={<Switch checked={includeSS} onChange={handleChange} aria-label="login switch" />}
                label="Include screenshot"
              />
            </FormGroup>
            {includeSS && (<img src={imgData} alt={imgData} width="400"/>)}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSubmitReportForm} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
        <Snackbar open={openSnackBar} autoHideDuration={6000} onClose={handleCloseSnackBar}>
          <Alert onClose={handleCloseSnackBar} severity="success">
            Report Submitted. We will get back to you Soon!
          </Alert>
        </Snackbar>

        {/* <Tooltip title={props.open ? "" : "LogOut"}> */}
          <ListItem button={!(selectedIndex===12)} selected={selectedIndex===12}  onClick={ () => props.logout()}>
            <ListItemIcon className={classes.navBarIcons}>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="LogOut"/>
          </ListItem>
        {/* </Tooltip> */}
     </List>
     </div>
  	</div>
  )
}







export default withRouter(Listitems)
