import React, { Component } from 'react'
import WorkFlowStatusUI from './WorkflowStatus'
import api from '../utils/api'
import axios from 'axios'
import { connect } from 'react-redux'

class StatusComponent extends Component {

    state = {
        status:null,
        flowchart : null,
        form : null,
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
            flowchart : res.data[0].FlowChart,
            form : res.data[0].FormData,
            title :res.data[0].Title
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

        let flowchart = this.state.flowchart

        let nodesList = []
        let workflowSteps = []
        for(var node in flowchart){

            if(flowchart[node].type.localeCompare("Start")==0){

                if(this.requestAccepted(flowchart[node].requestAccepted)){

                nodesList = [...nodesList,flowchart[node]]
                workflowSteps = [...workflowSteps,flowchart[node].type]
               
                }
                else{
                    //sendRequest(flowchart[node].requestAccepted)
                }
                 break;
          
            }
        }



        let stop = false
        console.log(nodesList)
        if(nodesList.length == 0){
            var nextNodes = []
        }
        else{
        var nextNodes = nodesList[0].nextNodes
        this.state.status="begin"
        }

        while(!stop){
            let newNode = null
            let breakflag = false
            for(var node in nextNodes){
                newNode = nextNodes[node]
                if(this.requestAccepted(flowchart[nextNodes[node]].requestAccepted)){
                    newNode = flowchart[nextNodes[node]]
                    console.log(newNode)

                    nodesList = [...nodesList,newNode]
                    workflowSteps = [...workflowSteps,newNode.type]
                    nextNodes = flowchart[nextNodes[node]].nextNodes
                    
                    
                    console.log(nextNodes)
                    breakflag = true
                    break
                }
                
            }
            console.log("After for",newNode)
            if(!breakflag){
                    stop = true
                    //sendRequest(newNode.requestAccepted)
            }
            else if(newNode.type.localeCompare("End")==0){
                stop =true
            }


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

        

        this.state.username= this.props.userObj.name

        

        this.state.title = this.props.location.search.split("=")[1]

        console.log(this.state.username,this.state.title)

        console.log(this.state.workflowSteps,this.state.nodesList)


        return (
            <div>  {!this.state.status ? <h1>Sorry WorkFlow not yet initialised</h1>:
            
            
            <WorkFlowStatusUI title = {this.state.title} steps = {this.state.workflowSteps}  nodesList = {this.state.nodesList}/>}
                
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