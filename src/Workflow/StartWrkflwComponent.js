import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FormComponent from '../Forms/FormComponent';
import DisplayWorkflow from './DisplayWorkflowComponent';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));


class StartWrkflwComponent extends Component{

    constructor(props){
        super(props);
        this.state = {
          anchorEl:null,
          showFormandWrkflw : false,
          selectedTitle : "",
          Academics : [{id : 1, title: "Admission Cancellation"},
                        {id :2, title: "No Dues Form"},]
        };
        console.log(this.state);
    }
    
    handleClick = (title) =>{
      console.log(title);
      this.setState({selectedTitle : title,
      showFormandWrkflw  :true});
      this.handleClose()
       //this.props.history.push("/Form")

    }
    
    handleListClick = (event) =>{
      this.setState({anchorEl : event.currentTarget});
    }

    handleClose = () => {
      this.setState({anchorEl : null});
      console.log(this.props)
      //this.props.history.push('/viewDocs')
    };
    render(){

        const renderPanel = () => {
            return this.state.Academics.map(form => {
              return (

              <div key={form.id}>
                <MenuItem onClick= {() => this.handleClick(form.title)}>{form.title}</MenuItem>
              </div>
              );
            });
          };
        return(
            <div>
                <h1 id="title">API CALLS</h1>
                <ListItem button>
                <ListItemText primary="Academics" 
                aria-controls="simple-menu" 
                aria-haspopup="true" 
                onClick={this.handleListClick}>
        </ListItemText>
        <Menu
          id="simple-menu"
          anchorEl={this.state.anchorEl}
          keepMounted
          open={Boolean(this.state.anchorEl)}
          onClose={this.handleClose}
        >
          {renderPanel()}
        </Menu>
        
      </ListItem>
            
            {this.state.showFormandWrkflw ?
           (<div>
            <FormComponent title={this.state.selectedTitle} /> 
            <DisplayWorkflow title={this.state.selectedTitle} />
            </div>) :
           (null)
            }
            </div>
            
        )
    }
}

export default StartWrkflwComponent;