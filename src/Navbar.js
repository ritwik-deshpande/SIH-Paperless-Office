import React from 'react';
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

function Listitems(props) {

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleNavlink = (link) => {
    setAnchorEl(null);
    console.log(props)
    props.history.push(link)
  };
 
  const handleDashboard = () =>{
    console.log('Props is',props)
    props.history.push('/')
  }

const classes = useStyles();
  return (
    <div className="container">
	{props.open ? <div >
	<img src="../logo512.png" className={classes.loginLogo}/>
	 <Typography component="h3" variant="h6" color="inherit"  noWrap className={classes.title}>
            Welcome, {props.userObj.name}
          </Typography> </div>: null }


	<br/>
	<Divider/>
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" onClick={handleDashboard} ></ListItemText>
        
      </ListItem>

      <ListItem button>
        <ListItemIcon>
           <AccountCircle />
        </ListItemIcon>
        <ListItemText primary="My Profile" onClick={() => handleNavlink('/esign')}/>
      </ListItem>

      <ListItem button>
        <ListItemIcon>
          <FolderIcon />
        </ListItemIcon>
      
        <ListItemText primary="My Documents" onClick={() => handleNavlink('/viewDocs')}>
        </ListItemText>
        
        
      </ListItem>

     

     <ListItem button>
        <ListItemIcon>
          <WorkIcon />
        </ListItemIcon>
        <ListItemText primary="My WorkFlows" onClick={() => handleNavlink('/status')} />
      </ListItem>


      <Divider/>
     
      <ListItem button>
        <ListItemIcon>
          <PlayCircleFilledWhiteIcon />
        </ListItemIcon>
        <ListItemText primary="Start a Workflow" onClick={() => handleNavlink('/getForm')} />
      </ListItem>

      

     
      <ListItem button>
        <ListItemIcon>
          <CreateIcon />
        </ListItemIcon>
        <ListItemText primary="Approve Documents" onClick={() => handleNavlink('/approve')}/>
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <ChatIcon />
        </ListItemIcon>
        <ListItemText primary="Chat" onClick={() => handleNavlink('/chat')}/>
      </ListItem>
    
	<Divider/>
	<ListItem button>
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText primary="LogOut" />
      </ListItem>
	</div>
  )
}







export default withRouter(Listitems )
