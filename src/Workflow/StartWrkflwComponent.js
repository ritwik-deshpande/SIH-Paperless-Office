import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import NestedList from './WorkflowComponents/NestedList';
import { makeStyles } from '@material-ui/core/styles';
import FormComponent from '../Forms/FormComponent'
import DisplayWorkflow from './DisplayWorkflowComponent';
import axios from 'axios';
import api from '../utils/api';
import TextField from '@material-ui/core/TextField';
import CustomForm from '../Forms/CustomForms'
import Container from '@material-ui/core/Container';
import ReformatWorkFlow from '../utils/ReformatWorkflow'
import { connect } from 'react-redux'

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

  componentDidMount(){
    axios.get(api.menu("menu"))
    .then(res => {
      console.log(res.data[0])
      this.setState({
        menu : res.data[0],
      })
    })
  }

  
  constructor(props){
      super(props);
      this.state = {
        customWorkflow:"Empty",
        anchorEl:null,
        menu:null,
        showFormandWrkflw : false,
        FormData : null,
        CustomForm:null,
        CustomFlowChart:null,
        FlowChart : null,
        user: this.props.userObj.username,
        selectedTitle : "",
      };
      console.log(this.state);
  }
  
  getID(){
    let timestamp = new Date().getUTCMilliseconds();
    console.log(timestamp)
    return timestamp
  }  


  initPath(){

        let flowchart = this.state.FlowChart
	let Path = []
        let nodesList = []
        for(var node in flowchart){
	    if(flowchart[node].type.localeCompare("Start")==0){
	       Path = [...nodesList, node]
	       break;
	    }
            
       }
	// Plz write send request function
        //sendRequest(flowchart[Path[0].approvers])

	return Path

  }
	

  postRequest = () =>{
    //TODO: Create post request to db.json
    if(!this.state.FormData)
    {
      alert("Please Submit the Form First");
    }
    else if(!this.state.FlowChart)
    {
      alert("Please Save the FlowChart First");
    }


    else{
      
      let payload = {

        "FormData" : this.state.FormData,
        "FlowChart" : this.state.FlowChart,
        "Comments" : [],
	"Path": this.initPath(),
	"chooseNextNodes":[],
	"Signatures":[],
        "approvedBy": [],
        "isSigned" : false,
        "User":this.state.user,
        "Title": this.state.selectedTitle,
	"id" : this.getID()

      }
      console.log("The Payload")
      console.log(payload);




      api.workflow("Workflow").post(payload).then(res =>{
        console.log(res);
        this.props.history.push("/status?title="+this.state.selectedTitle)
      })

    }
    
    
  }

  saveCustomForm = (Form) => {

    console.log("The form",Form)

    if(this.state.customWorkflow.localeCompare("Empty")== 0){
      alert("Please Give the name of your Custom WorkFlow");
    }
    else{
     Form.title = this.state.customWorkflow

     Form.id = this.getID()
     Form.schema.title = this.state.customWorkflow
      console.log("Saving Form",Form)

      this.setState({
        CustomForm: Form
      })

    }
    

  }

  saveCustomFlowChart = (FlowChart) =>{

    console.log("Saving FlowChart")

    if(this.state.customWorkflow.localeCompare("Empty")== 0){
      alert("Please Give the name of your Custom WorkFlow");
    }
    else{

      let NewFlowChart = {
        "id":1,
        "title":"FlowChart",
        "chart":null,
      }
      NewFlowChart.title = this.state.customWorkflow

      NewFlowChart.id = this.getID()
      NewFlowChart.chart = FlowChart
      console.log("Saving FlowChart ",NewFlowChart)

      this.setState({
        CustomFlowChart:NewFlowChart
      })
     
     

    }
  }

  saveCustomWorkFlow = () =>{

    if(this.state.customWorkflow.localeCompare("Empty")== 0){
      alert("Please Give the name of your Custom WorkFlow")
    }
    else if(!this.state.CustomForm){
      alert("Please save your Custom Form");
    }
    else if(!this.state.CustomFlowChart){
      alert("Please save your Custom Flow Chart");

    }
    else{

      api.saveCustomForm("Forms").post(this.state.CustomForm).then(res =>{
        console.log(res);
        
      })

      api.saveCustomFlowChart("FlowChart").post(this.state.CustomFlowChart).then(res =>{
        console.log(res);
        
      })




      console.log("Original Menu",this.state.menu)
      this.state.menu.contents.Custom = [...this.state.menu.contents.Custom , {id: this.getID(),title:this.state.customWorkflow}]
      console.log("Saving new menu",this.state.menu)
      console.log(this.state.menu.id)
      api.saveMenu("menu",this.state.menu.id).put(this.state.menu).then(res =>{
        console.log(res);
        this.setState({
          showFormandWrkflw: false
        })
      })

    }

    
    
  }


  saveFormData = (FormData) =>
  {
    console.log("Saving Form")
    console.log(FormData);
    this.setState({
      FormData : FormData
    })
  }
  


  saveFlowChartData = (chart) =>
  {
    console.log("Saving FlowChart")
    console.log(chart)

    chart = ReformatWorkFlow.reformat(chart)
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

  handleChange = (e) =>{
      this.state.customWorkflow = e.target.value;
  }

  handleClose = () => {
    this.setState({anchorEl : null});
    console.log(this.props)
    //this.props.history.push('/viewDocs')
  };


  renderWorkFlow(){

      console.log("the state ")
      console.log(this.state)

      if(this.state.showFormandWrkflw){

        if(this.state.selectedTitle.localeCompare("Start a Custom WorkFlow") == 0){
            return (<div>
     
         <TextField required id="standard-required" label="Required" helperText="Enter Procedure Name: Ex Library Registraion" fullWidth

           onChange = {this.handleChange}
         />
         

          <CustomForm  save ={this.saveCustomForm}/>   

          <DisplayWorkflow title="Custom FlowChart" save={this.saveCustomFlowChart}/>   

              <br/>
              <br/>
              <br/>

              <Button
              variant="contained"
              color="primary"
              onClick = {this.saveCustomWorkFlow}>
            
              Save WorkFlow
            </Button>   

         

            </div>)
        }
        else{
          console.log("Returning academic cancellation")
          return( <div>
            
            <FormComponent title={this.state.selectedTitle} save={this.saveFormData} />

            <br/>

            <DisplayWorkflow title={this.state.selectedTitle} save={this.saveFlowChartData}/>
         <br/>
            <Button
              variant="contained"
              color="primary"
              onClick = {this.postRequest}>
            
              Start WorkFlow
            </Button>
          </div>
          )
        }
      }
      else{
       
        return (<div>{this.state.menu ?<NestedList menu = {this.state.menu} Click={this.handleClick}/>:<div>
              <h5>Initializing menu</h5>
            </div>}
            </div>
            )
      }
  }

  render(){

    return(
          
      <div>
        <h1 id="title">API CALLS</h1>
        <Container maxWidth="lg">

        
        { this.renderWorkFlow()} 
          
        </Container>
        
        
      </div>
          
    )
  }
}

const mapStatetoProps = (state) =>{

  return{
    userObj: state.auth.userObj,
    loggedIn : state.auth.loggedIn
  }
}
export default connect(mapStatetoProps, null)(StartWrkflwComponent);
