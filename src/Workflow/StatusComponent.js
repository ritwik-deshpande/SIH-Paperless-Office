import React, { Component } from 'react'
import WorkFlowStatusUI from './WorkflowStatus'
import api from './utils/api'
import Axios from 'axios'


export default class StatusComponent extends Component {

    state = {
        flowchart : null,
        form : null,
        nodesList = []
    }

    componentDidMount(){
        Axios.get((api.getWorkFlow.get(username,title))
        .then(res => {
          console.log('The data received is',res.data[0])
          this.setState({
            flowchart : res.data[0].FlowChart,
            form : res.data[0].FormData
          })
        }))

    }

    init(){

        for(var node in this.state.flowchart){

            if(flowchart[node].type.localeCompare("Start")==0){
                this.nodesList = [...this.nodesList,flowchart[node]]
                break;
          
            }
           }

    }

//    let url = http://localhost:3030/workflow?User=rd&&Title=Application%20for%20Sports%20Secretary
    render() {

        

        let username= api.getUser().username

        console.log(this.props)

        let title = this.props.location.search.split("=")[1]





        return (
            <div>  {this.state.form ? <h1>Initializing WorkFlow</h1>:
            
            
            <WorkFlowStatusUI title = {title} steps = {workflowsteps}  nodesList = {nodesList}/>}
                
            </div>
        )
    }
}
