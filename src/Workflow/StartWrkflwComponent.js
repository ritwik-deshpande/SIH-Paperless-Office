import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import NestedList from './WorkflowComponents/NestedList';
import { makeStyles } from '@material-ui/core/styles';
import FormComponent from '../Forms/FormComponent'
import DisplayWorkflow from './DisplayWorkflowComponent';
import axios from 'axios';
import api from '../utils/api';
import Timestamp from '../utils/TimeStamp';
import TextField from '@material-ui/core/TextField';
import CustomForm from '../Forms/CustomForms'
import Container from '@material-ui/core/Container';
import ReformatWorkFlow from '../utils/ReformatWorkflow'
import { connect } from 'react-redux'
import WorkflowNode from '../utils/WorkflowNode'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import StartWorkflowHeader from '../Headers/StartWorkflowHeader';
import Dialog from "@material-ui/core/Dialog";
import CloseIcon from "@material-ui/icons/Close";
import style from '../StyleSheet'
import Slide from "@material-ui/core/Slide";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import {
	AppBar,
	withStyles,
	Toolbar,
	Typography,
	Box
} from "@material-ui/core";

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
   api.menu().get()
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
        id : Timestamp.getTSID(),
        customWorkflow:"Empty",
        anchorEl:null,
        menu:null,
	openDialog : false,
        showFormandWrkflw : false,
        FormData : null,
        CustomForm:null,
        CustomFlowChart:null,
        FlowChart : null,
	instructions :"",
	uploadDocuments : false,
		priority:false,
        user: this.props.userObj.name,
        selectedTitle : "",
        selectedId : 0,
      };
      console.log(this.state);
  }
  
  


  initPath(){

        let flowchart = this.state.FlowChart
        let Path = []
        let nodesList = []
        for(var node in flowchart){
	      if(flowchart[node].type.localeCompare("Start")===0){
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
      var reqs = [];
      for (var k in this.state.FlowChart){
        console.log(k)
        if(this.state.FlowChart[k].type === "Start")
        {
          reqs = Object.keys(this.state.FlowChart[k].approvedBy)
          // Object.keys(this.state.FlowChart[k].approvedBy)
          console.log(reqs)
          break;
        }
      }
      let payload = {

        "FormData" : this.state.FormData,
        "FlowChart" : this.state.FlowChart,
        "Comments" : [],
        "Path": this.initPath(),
        "nextNodes":[],
        "Signatures":{},
        "status" : "active",
        "begin_timestamp" : Timestamp.getTimestamp(new Date().getTime()),
        "end_timestamp" : "",
        "formId": this.state.selectedId,
        "flowchartId": this.state.selectedId,
        "Feedback" : "",
	      "Feedback_ts": 0,
		"priority": this.state.priority,
        "User":this.state.user,
        "Title": this.state.selectedTitle,

	      "id" : this.state.id + "v0",
        "cancel_requests" : [],
        "send_requests" : reqs

      }
      console.log("The Payload",payload);

      payload.Feedback =  "Workflow Initiated"
      payload.Feedback_ts = Timestamp.getTimestamp(new Date().getTime())


      api.workFlow().post(payload).then(res =>{
      console.log(res);
      alert("Workflow Initiated successfully.\n Your Workflow id is"+payload.id)
      this.props.history.push("/status")
      window.location.reload(true)

      })

    }
    
    
  }
  savePriority = (p) => {
        console.log("The priority is ",p)
	this.state.priority = p
  }
		

  saveCustomForm = (Form) => {

	Form.schema.description = this.state.instructions
    console.log("The form",Form)

    if(this.state.customWorkflow.localeCompare("Empty")=== 0){
      alert("Please Give the name of your Custom WorkFlow");
    }
    else{
     Form.title = this.state.customWorkflow

     Form.id = this.state.id
     Form.schema.title = this.state.customWorkflow
      console.log("Saving Form",Form)
      alert("Saved Custom Form");

      this.state.CustomForm = Form
      

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

      NewFlowChart.id = this.state.id
      NewFlowChart.chart = FlowChart
      console.log("Saving FlowChart ",NewFlowChart)

      this.state.CustomFlowChart = NewFlowChart
     
      alert("Saved Custom FlowChart");

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

      api.forms().post(this.state.CustomForm).then(res =>{
        console.log("res of forms post ",res);
        if(res && res.data)
        {
          api.flowChart().post(this.state.CustomFlowChart).then(res =>{
            console.log("res of flowchart post",res);
            if(res && res.data)
            {
              console.log("Original Menu",this.state.menu)
              this.state.menu.contents.Custom = [...this.state.menu.contents.Custom , {id: this.state.id,title:this.state.customWorkflow}]
              console.log("Saving new menu",this.state.menu)
              console.log(this.state.menu.id)
              api.menu().put(this.state.menu.id,this.state.menu).then(res =>{
                console.log(res);
              alert("Saved Custom Workflow");
                this.setState({
                  showFormandWrkflw: false
                })
              })

            }
          })
        }
      })
    }
  }

  saveFormData = (FormData) =>
  {
    console.log("Saving Form")
    console.log(FormData);
    alert("Saved Form Response")
    this.state.FormData = FormData
  }
  
  saveFlowChartData = (chart) =>
  {
    console.log("Saving FlowChart")
    console.log(chart)
    alert("Saved Flowchart Response")
    chart = ReformatWorkFlow.reformat(chart)
    this.state.FlowChart = chart
  }
  handleBackButton = () =>{

    this.setState({
	showFormandWrkflw :false
	})
 }

  handleClick = (id,title) =>{
    console.log(title);
    this.setState({selectedTitle : title,
      selectedId : id,
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

  handleChangeInstruction = (e) =>{

	this.state.instructions = e.target.value
  }

  handleClose = () => {
    this.setState({anchorEl : null});
    console.log(this.props)
    //this.props.history.push('/viewDocs')
  };


  renderWorkFlow(){

      //console.log("the state ")
      //console.log(this.state)
      const { classes } = this.props;
      const Transition = React.forwardRef(function Transition(props, ref) {
		return <Slide direction="up" ref={ref} {...props} />;
	});

      if(this.state.showFormandWrkflw){
	console.log("this .title", this.state.selectedTitle)
        if(this.state.selectedTitle.localeCompare("SCW") == 0){
		console.log("Inside CUstom component")
            return (<React.Fragment>
		{/* <br/>
     		<h2> BUILD YOUR OWN WORKFLOW </h2>
		<br/>
		<br/>
         <TextField required id="standard-required" label="WorkFlow Name" fullWidth

           onChange = {this.handleChange}
         />
         
		
		

          <CustomForm  uploadDocuments={this.state.uploadDocuments} save ={this.saveCustomForm}/>   
		<br/> */}
          <main>
	  <Dialog
		fullScreen
		open={this.state.showFormandWrkflw}
		onClose={this.handleBackButton}
		TransitionComponent={Transition}>
		<AppBar  className={classes.appBar}>
			<Toolbar >
				<Box display="flex" flexGrow={1}>
					<Button
						edge="start"
						autoFocus
						color="inherit"
						onClick={this.handleBackButton}
						startIcon={<ArrowBackIosIcon />}>
						Back
					</Button>
				</Box>
				 <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
					<Box fontWeight={800} display="inline">BUILD YOUR OWN WORKFLOW</Box>
				      </Typography>
			</Toolbar>
		</AppBar>	
		<br/>
		<br/>
		<br/>
		<br/>

         {/* <Header title="Build Your Own Workflow"/>*/}
          <Container style={{margin: "16px 0px"}}>
          	<TextField required id="standard-required" label="WorkFlow Name" fullWidth onChange = {this.handleChange}/>
		<br/>
		<br/>
		<TextField required id="standard-required" label="General Instructions" fullWidth

		       onChange = {this.handleChangeInstruction}
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
              
                Create WorkFlow
              </Button>   

          </Container>
	  </Dialog>
          </main>
          </React.Fragment>)
        }
        else{
          return( 
            <React.Fragment>
            <main>
	
	     <Dialog
		fullScreen
		open={this.state.showFormandWrkflw}
		onClose={this.handleBackButton}
		TransitionComponent={Transition}>
		<AppBar  className={classes.appBar}>
			<Toolbar >
				<Box display="flex" flexGrow={1}>
					<Button
						edge="start"
						autoFocus
						color="inherit"
						onClick={this.handleBackButton}
						startIcon={<ArrowBackIosIcon />}>
						Back
					</Button>
				</Box>
				 <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
					<Box fontWeight={800} display="inline">START YOUR WORKFLOW</Box>
				      </Typography>
			</Toolbar>
		</AppBar>	

           {/* <Header title="Start Your Workflow"/> */}

	   <br/>
		<br/>
		<br/>
		<br/>
           <Container style={{margin: "16px 0px"}}>
            
            <FormComponent  title={this.state.selectedTitle} id={this.state.selectedId} save={this.saveFormData} />

            <br/>
			
			<br/>

            <DisplayWorkflow label={"Init"} savePriority = {this.savePriority} title={this.state.selectedTitle} id={this.state.selectedId} save={this.saveFlowChartData}/>
         <br/>
            <Button
              variant="contained"
              color="primary"
              onClick = {this.postRequest}>
            
              Start WorkFlow
            </Button>
          </Container>
	 </Dialog>
          </main>
          </React.Fragment>
          )
        }
      }
      else{
       
        return (<React.Fragment>{this.state.menu ?<main><StartWorkflowHeader title="Start A Workflow"/><NestedList menu = {this.state.menu} Click={this.handleClick}/></main>:<div>
              <h5>Initializing menu</h5>
            </div>}
            </React.Fragment>
            )
      }
  }

  render(){

    return(
          
      <div>
        
        {/* <Container maxWidth="lg"> */}

        
        { this.renderWorkFlow()} 
          
        {/* </Container> */}
        
        
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
export default connect(mapStatetoProps, null)(withStyles(style)(StartWrkflwComponent));
