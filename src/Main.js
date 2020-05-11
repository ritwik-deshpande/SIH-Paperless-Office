import React, { Component } from 'react'
import Dashboard from './Dashboard'
import SignIn from './SignIn'

import {Provider} from 'react-redux'
import store from './reducers/ReduxStore'
import api from './utils/api'
import axios from 'axios';
import ReformatWorkFlow from './utils/ReformatWorkflow'

export default class Main extends Component {

    

    SignInFunction = (username,password) =>{



  let WorkFlow = {
    "id": 99,
"title": "Mess Registration",
"chart": {
  "offset": {
    "x": 0,
    "y": 0
  },
  "nodes": {
    "node1": {
      "id": "node1",
      "type": "Start",
      "properties": {
        "approvers": "RB Keskar-Manish Kurehkar"
      },
      "position": {
        "x": 300,
        "y": 100
      },
      "ports": {
        "port1": {
          "id": "port1",
          "type": "output",
          "properties": {
            "value": "yes"
          },
          "position": {
            "x": 94.5,
            "y": 278
          }
        },
        "port2": {
          "id": "port2",
          "type": "output",
          "properties": {
            "value": "no"
          },
          "position": {
            "x": 124.5,
            "y": 278
          }
        }
      },
      "size": {
        "width": 220,
        "height": 277
      }
    },
    "node2": {
      "id": "node2",
      "type": "end",
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
          "type": "input",
          "position": {
            "x": 110,
            "y": 0
          }
        },
        "port2": {
          "id": "port2",
          "type": "output",
          "position": {
            "x": 110,
            "y": 172
          }
        }
      },
      "size": {
        "width": 220,
        "height": 172
      }
    },
    "9e9cdf7d-31b1-4c8f-b1d9-038697a433d7": {
      "id": "9e9cdf7d-31b1-4c8f-b1d9-038697a433d7",
      "position": {
        "x": 528.0173568725586,
        "y": 364.1388931274414
      },
      "orientation": 0,
      "type": "bottom-only",
      "ports": {
        "port1": {
          "id": "port1",
          "type": "bottom",
          "properties": {
            "custom": "property"
          },
          "position": {
            "x": 110,
            "y": 172
          }
        }
      },
      "properties": {
        "approvers": ""
      },
      "size": {
        "width": 220,
        "height": 172
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
    },
    "735b36e5-54e3-42cf-9ac4-c76bbcac55fa": {
      "id": "735b36e5-54e3-42cf-9ac4-c76bbcac55fa",
      "from": {
        "nodeId": "node1",
        "portId": "port2"
      },
      "to": {
        "nodeId": "9e9cdf7d-31b1-4c8f-b1d9-038697a433d7",
        "portId": "port1"
      }
    }
  },
  "selected": {},
  "hovered": {}
}
}



ReformatWorkFlow.reformat(WorkFlow)





        console.log("The username"+username)
        console.log("The password"+password)

        axios.get(api.users("users").get(username)).then(
            res =>{
                console.log("The user",res.data[0])

                if(res.data.length== 0){
                    alert("Invalid Username");
                }
                else if(password.localeCompare(res.data[0].password)==0){

                    api.setUser(res.data[0])
                    api.setSession(true)
                    this.setState({
                        loggedIn:true
                    })
                    console.log("user obj = " + api.getUser())
                }
                else{
                    alert("Invalid Password");
                }
            
            })

        


    }

    state = {
        loggedIn:api.getSession()
    }
    render() {

        return (
            <div>
            {this.state.loggedIn ? <Provider store = {store}> <Dashboard /> </Provider> : <SignIn signin = {this.SignInFunction}/>}
                
            </div>
        )
    }
}
