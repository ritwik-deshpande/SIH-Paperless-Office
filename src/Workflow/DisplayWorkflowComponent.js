import React from "react";
import DragAndDropSidebar from "./DragandDropSidebar"
import axios from 'axios';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import api from '../utils/api'
import Container from '@material-ui/core/Container';
const chartSimple = {
  
  selected: {id:"node2"},
  hovered: {}
};


class DisplayWorkflow extends React.Component{

      constructor(props){
        super(props);
        this.state = {
	    priority : false,   
            schema : null,
            default_schema : {
              "chart":{
              "offset": {
                "x": 0,
                "y": 0
              },
              "nodes": {
                "node1": {
                  "id": "node1", 
                  "type": "Start",
                  "properties": {
                    "approvers": "AP001-AP002"
                  },
                  "position": {
                    "x": 300,
                    "y": 100
                  },
                  "ports": {
                    
                    "port2": {
                      "id": "port2",
                      "type": "output",
                  
                    }
                  }
                },
                "node2": {
                  "id": "node2",
                  "type": "End",
                  "position": {
                    "x": 100,
                    "y": 400
                  },
                  "properties": {
                    "approvers": ""
                  },
                  "ports": {
                    "port1": {
                      "id": "port1",
                      "type": "input"
                    }
                  }
                }
              },
              "links": {
                "link1": {
                  "id": "link1",
                  "from": {
                    "nodeId": "node1",
                    "portId": "port2"
                  },
                  "to": {
                    "nodeId": "node2",
                    "portId": "port1"
                  }
                }
            },
            "selected": {"id":"node2"},
            "hovered": {}
            }
          }
           
      }
    }
 handleCheckPriority = (e) => {
		this.setState({
			priority: e.target.checked
	}) 	
	this.props.savePriority(e.target.checked)
  }

    componentDidMount(){

      console.log(this.props.title)
      console.log(this.props.title.localeCompare("Custom FlowChart"))

      if(this.props.title.localeCompare("Custom FlowChart")!= 0){
        api.flowChart().getByid(this.props.id)
        .then(res => {
          console.log('The data received is',res.data)
          this.setState({
            schema : res.data.chart,
          })
        })
      }
      else{
        this.setState({
          schema : this.state.default_schema.chart
        })
      }
    }

  
    render(){
      console.log('The state is',this.state)
      return (
        
        <div >
	
	{this.props.label ?
		<FormControlLabel
		    control={<Checkbox checked={this.state.priority} onChange={this.handleCheckPriority}  />}
		    label="High Priority (Urgent Requirement)"
		  /> : <></>
		}			
          <br/>
          <br/>
            <h4>FLOWCHART </h4>
            <br/>
            
            <Container maxWidth="lg">
            {this.state.schema ? <DragAndDropSidebar modify = {this.props.modify} title = {this.props.title} id={this.props.id} save = {this.props.save} chartSimple={this.state.schema}/>  :<div>
              <h5>Initializing Workflow</h5>
            </div>}
             
            </Container>
        </div>
      );

    }

    
}

export default DisplayWorkflow;
