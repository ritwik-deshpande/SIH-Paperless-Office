import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { NavLink, withRouter } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';



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


  return (
    <div className="container">
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" onClick={handleDashboard} ></ListItemText>
        
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Update Profile" />
      </ListItem>
      
     
      <ListItem button>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Start a Workflow" onClick={() => handleNavlink('/getForm')} />
      </ListItem>
     

 
      <ListItem button>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
      
        <ListItemText primary="Documents" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        </ListItemText>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={() => handleNavlink('/viewDocs')}
        >
          <MenuItem onClick={() => handleNavlink('/viewDocs')}>New Document</MenuItem>
          <MenuItem onClick={() => handleNavlink('/viewDocs')}>View Documents</MenuItem>
        </Menu>
        
      </ListItem>
     
      <ListItem button>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Approve Documents" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="View Emails" />
      </ListItem>
    </div>
  )
}







export default withRouter(Listitems )
