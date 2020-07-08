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
        <ListItemText primary="My Profile" onClick={() => handleNavlink('/esign')}/>
      </ListItem>
      
     
      <ListItem button>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Start a Workflow" onClick={() => handleNavlink('/getForm')} />
      </ListItem>

      

      <ListItem button>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Status of WorkFlow" onClick={() => handleNavlink('/status')} />
      </ListItem>
     

 
      <ListItem button>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
      
        <ListItemText primary="View Documents" onClick={() => handleNavlink('/viewDocs')}>
        </ListItemText>
        
        
      </ListItem>
     
      <ListItem button>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Approve Documents" onClick={() => handleNavlink('/approve')}/>
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Chat" onClick={() => handleNavlink('/chat')}/>
      </ListItem>
    </div>
  )
}







export default withRouter(Listitems )
