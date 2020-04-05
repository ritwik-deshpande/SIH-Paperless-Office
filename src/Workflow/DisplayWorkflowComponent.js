import React from "react";
import DragAndDropSidebar from "./DragandDropSidebar"
import axios from 'axios';
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
            schema :  null
      //         "offset": {
      //           "x": 0,
      //           "y": 0
      //         },
      //         "nodes": {
      //           "node1": {
      //             "id": "node1", 
      //             "type": "Start",
      //             "properties": {
      //               "approvers": "RB Keskar-Manish Kurehkar"
      //             },
      //             "position": {
      //               "x": 300,
      //               "y": 100
      //             },
      //             "ports": {
      //               "port1": {
      //                 "id": "port1",
      //                 "type": "output",
      //                 "properties": {
      //                   "value": "yes"
      //                 }
      //               },
      //               "port2": {
      //                 "id": "port2",
      //                 "type": "output",
      //                 "properties": {
      //                   "value": "no"
      //                 }
      //               }
      //             }
      //           },
      //           "node2": {
      //             "id": "node2",
      //             "type": "input-output",
      //             "position": {
      //               "x": 300,
      //               "y": 300
      //             },
      //             "properties": {
      //               "approvers": ""
      //             },
      //             "ports": {
      //               "port1": {
      //                 "id": "port1",
      //                 "type": "input"
      //               },
      //               "port2": {
      //                 "id": "port2",
      //                 "type": "output"
      //               }
      //             }
      //           }
      //         },
      //         "links": {
      //           "link1": {
      //             "id": "link1",
      //             "from": {
      //               "nodeId": "node1",
      //               "portId": "port2"
      //             },
      //             "to": {
      //               "nodeId": "node2",
      //               "portId": "port1"
      //             },
      //             "properties": {
      //             "label": "example link label"
      //             }
      //           }
      //       },
      //       "selected": {"id":"node2"},
      //       "hovered": {}
          
           
      }
    }

    componentDidMount(){
      axios.get(api.forms("FlowChart").get(this.props.title))
      .then(res => {
        console.log('The data received is',res.data[0].chart)
        this.setState({
          schema : res.data[0].chart,
        })
      })
    }

  
    render(){
      console.log('The state is',this.state)
      return (
        
        <div >
            <h2 id="title"> WORKFLOW </h2>
            <h3>{this.props.title}</h3>
            <Container maxWidth="lg">
            {this.state.schema ? <DragAndDropSidebar chartSimple={this.state.schema}/>  :<div>
              <h5>Initializing Workflow</h5>
            </div>}
             
            </Container>
        </div>
      );

    }

    
}

export default DisplayWorkflow;
