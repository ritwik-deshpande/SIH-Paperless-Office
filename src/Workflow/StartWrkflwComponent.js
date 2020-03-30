import React, { Component } from 'react';
import Collapsible from '../utils/Collapsible';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FormComponent from '../Forms/FormComponent'
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
            showFormandWrkflw : false,
            selectedTitle : "",
            Academics : [{id : 1, title: "Admission Cancellation"},
                            {id :2, title: "No Dues Form"},]
        };
    }
      handleClick = (title) =>{
       console.log(title);
       this.setState({selectedTitle : title,
        showFormandWrkflw  :true});
       //this.props.history.push("/Form")

     }
    render(){

        //const classes = useStyles();
        const renderExpansionPanel = () => {
            return this.state.Academics.map(form => {
              return (

                <div id={form.id} onClick={()=>this.handleClick(form.title)}>
                <ExpansionPanelDetails key={form.id}>
                <Typography>
                  {form.title}
                </Typography>
                </ExpansionPanelDetails>
                </div>
              );
            });
          };
        return(
            <div>
                <h1 id="title">API CALLS</h1>
            <div className={useStyles.root}>
            <ExpansionPanel>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className={useStyles.heading}>Academics</Typography>
              </ExpansionPanelSummary>
             
              {renderExpansionPanel()}
            </ExpansionPanel>
            {this.state.showFormandWrkflw ?
           (<div>
             <FormComponent title={this.state.selectedTitle} />
            <DisplayWorkflow title={this.state.selectedTitle} />
            </div>) :
           null
            }
            </div>
            </div>
        )
    }
}

export default StartWrkflwComponent;