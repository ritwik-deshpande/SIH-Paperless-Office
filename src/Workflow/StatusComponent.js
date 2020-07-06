import React, { Component } from 'react'
import WorkFlowStatusUI from './WorkflowStatus'
import api from '../utils/api'
import axios from 'axios'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Input from '@material-ui/core/Input'
import GetAppIcon from '@material-ui/icons/GetApp';
import AddCommentIcon from '@material-ui/icons/AddComment';
import {toast, ToastContainer} from 'react-toastify'
import MyWorkflow from './MyWorkflows'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
class StatusComponent extends Component {

    state = {
        id:null,
        status:null,
        workflow :null,
        nodesList : [],
        workflowSteps : [],
        username :null,
        title:null,
        myWorkflow: false,
    }

    componentDidMount(){
        // axios.get(api.getWorkFlow().get(this.state.username,this.state.title))
        // .then(res => {
        //   console.log('The data received is',res.data[0])
        //   this.setState({
 	    // workflow : res.data[0]
        //   })

        //   this.init()
        // })

    }
    requestAccepted(d){
        for(var key in d){
            if(!d[key]){
              return false
            }
        }
        return true
    }

    init(){

      
        let flowchart = this.state.workflow.FlowChart
        let nodesList = []
        let workflowSteps = []
        let Path = this.state.workflow.Path
        let i = 0

        for(i = 0;i < Path.length; i++){
		let node = Path[i]
		this.state.status = "begin"
		nodesList = [...nodesList, flowchart[node] ]
		workflowSteps = [...workflowSteps,flowchart[node].type]
	}
        // console.log(nodesList)
        // console.log(workflowSteps)

        this.setState({
            nodesList:nodesList,
            workflowSteps:workflowSteps
        })
        toast.success("Workflow Loaded")
        
    }

    handleChange = (e)=>{
        console.log(e.target.value)
        this.setState({
            id:e.target.value
        })
    }

    handleSearch = (id) =>{
        this.setState({id:id})
        api.getWorkFlow().getByid(id).then(res => {
            //console.log('The data received is',res.data)
            if(res && res.data)
            {this.setState({
           workflow : res.data,
           title: res.data.Title,
           username : res.data.User
            })
        this.init()}
        })
    }
    Click = () =>{
        this.setState({myWorkflow:true})
    }
//    let url = http://localhost:3030/workflow?User=rd&&Title=Application%20for%20Sports%20Secretary
    render() {

        // this.state.username = this.props.userObj.username
        // this.state.title = this.props.location.search.split("=")[1]
        // console.log(this.state.username,this.state.title)
        // console.log(this.state.workflowSteps,this.state.nodesList)
        if(!this.state.id && this.props.location.search.localeCompare("") !==0 && this.props.location.search.split("=")[1])
        {
            console.log("in something")
            this.setState({id:this.props.location.search.split("=")[1]})
        }
        return (
            <div>  
               <h1>API test</h1>
                <ToastContainer
                        autoClose={2000}
                        hideProgressBar={true}
                        position={toast.POSITION.BOTTOM_RIGHT}
                    />
                 
                 <ListItem alignItems="flex-start">
        
        <ListItemText primary={ "Show My Workflows"} />
        <IconButton color="primary" onClick={()=>this.Click()}>
                <ExpandMoreIcon style={{ fontSize: 40 }} />
                </IconButton>
      </ListItem>
                 
                {this.state.myWorkflow ? 
                <MyWorkflow userObj={this.props.userObj} handleSubmit={this.handleSearch}/>
                
    :null}
                <br/><br/>
                <h5>Or<br/> Enter a workflow id:</h5>
                <form //className={classes.root} 
                noValidate autoComplete="off">

                <Input //className={classes.button} 
                    onChange = {this.handleChange}
                    value = {this.state.id}
                    name='comment' 
                    fullWidth='true'
                    placeholder='Add the id you wanna search for' 
                    inputProps={{ 'aria-label': 'description' }} />
                
                <br/><br/>
        <Button
              variant="contained"
              color="secondary"
              //className={classes.button}
              startIcon={<AddCommentIcon />}
              onClick={() => {
                  this.handleSearch(this.state.id)
                }}
            >
          Add comment
        </Button>
        </form>
                
        {this.state.id ? 
            (!this.state.status ? <h1>Sorry WorkFlow not yet initialised</h1>
            :
            
            <WorkFlowStatusUI workflow = {this.state.workflow} 
            title = {this.state.title}
            steps = {this.state.workflowSteps} 
            nodesList = {this.state.nodesList}/>)
            
            : null}
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
  export default connect(mapStatetoProps, null)(StatusComponent);
