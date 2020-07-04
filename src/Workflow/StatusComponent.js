import React, { Component } from 'react'
import WorkFlowStatusUI from './WorkflowStatus'
import api from '../utils/api'
import axios from 'axios'
import { connect } from 'react-redux'

class StatusComponent extends Component {

    state = {
        status:null,
        workflow :null,
        nodesList : [],
        workflowSteps : [],
        username :null,
        title:null
    }

    componentDidMount(){
        axios.get(api.getWorkFlow("workflow").get(this.state.username,this.state.title))
        .then(res => {
          console.log('The data received is',res.data[0])
          this.setState({
 	    workflow : res.data[0]
          })

          this.init()
        })

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

	


        console.log(nodesList)
        
        console.log(workflowSteps)

        

        this.setState({
            nodesList:nodesList,
            workflowSteps:workflowSteps
        })
        

    }

//    let url = http://localhost:3030/workflow?User=rd&&Title=Application%20for%20Sports%20Secretary
    render() {

        

        this.state.username = this.props.userObj.username

        

        this.state.title = this.props.location.search.split("=")[1]

        console.log(this.state.username,this.state.title)

        console.log(this.state.workflowSteps,this.state.nodesList)


        return (
            <div>  {!this.state.status ? <h1>Sorry WorkFlow not yet initialised</h1>:
            
            
            <WorkFlowStatusUI workflow = {this.state.workflow} title = {this.state.title} steps = {this.state.workflowSteps}  nodesList = {this.state.nodesList}/>}
                
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
