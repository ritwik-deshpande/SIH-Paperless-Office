import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import NestedList from './WorkflowComponents/NestedList';
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
import FormComponent from '../Forms/FormComponent'
import DisplayWorkflow from './DisplayWorkflowComponent';
import axios from 'axios';
import api from '../utils/api';
import CustomFormComponent from '../Forms/CustomFormComponent';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  button: {
    margin: theme.spacing(1),
  },
}));


class StartWrkflwComponent extends Component
{

  
  constructor(props){
      super(props);
      this.state = {
        anchorEl:null,
        showFormandWrkflw : false,
        FormData : null,
        FlowChart : null,
        selectedTitle : "",
        Academics : [{id : 1, title: "Admission Cancellation"},
                      {id :2, title: "No Dues Form"},]
      };
      console.log(this.state);
  }
  
  postRequest = () =>{
    //TODO: Create post request to db.json
    if(!this.state.Form)
    {
      alert("Please Submit the Form First");
    }
    else if(!this.state.FlowChart)
    {
      alert("Please Save the Workflow First");
    }
    
      let payload = {

        "FormData" : this.state.FormData,
        "FlowChart" : this.state.FlowChart,
        "Comments" : [],
        "approvedBy": [],
        "isSigned" : false,

      }
      console.log(payload);
      api.workflow("Workflow").post(payload).then(res =>{
        console.log(res);
      })
    
    
  }

  saveFormData = (FormData) =>
  {
    console.log(FormData);
    this.setState({
      FormData : FormData
    })
  }

  saveFlowChart = (chart) =>
  {
    console.log(chart)
    this.setState({
      FlowChart : chart
    })
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
        <NestedList/>
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
            onClose={this.handleClose}>
          
              {renderPanel()}

          </Menu>
      
        </ListItem>
          
        {this.state.showFormandWrkflw ?
          
          ( <div>
            
              <FormComponent title={this.state.selectedTitle} save={this.saveFormData} />
              <DisplayWorkflow title={this.state.selectedTitle} save={this.saveFlowChart}/>
          
              <Button
                variant="contained"
                color="primary"
                onClick = {this.postRequest}>
              
                Send
              </Button>
            </div>) :
            (<CustomFormComponent/>)
        } 
      </div>
          
    )
  }
}

export default StartWrkflwComponent;