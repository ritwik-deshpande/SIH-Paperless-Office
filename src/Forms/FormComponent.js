import React, { Component } from "react";
import './FormComponent.css'
import axios from 'axios';
import Form from "react-jsonschema-form";
import api from '../utils/api';



class FormComponent extends Component{

  
    constructor(props){
      super(props);
      this.state = {
          schema : {"title": "A registration form",
          "description": "A simple form example.",
          "type": "object",
          
          "properties": {
            "firstName": {
              "type": "string",
              "title": "First name",
              "default": "Chuck"
            }
          }
          },
          uiSchema : {}   
    }
  }
 


  onSubmit = ({formData}, e) => {
  
    formData["Instructions"] = this.state.schema.description
    console.log("Data submitted: ",  formData);
    this.props.save(formData)
  }
    componentDidMount(){
      api.forms().getByid(this.props.id)
      .then(res => {
        this.setState({
          schema : res.data.schema,
          uiSchema : res.data.uiSchema
        })
      })
    }
    render(){
        
        let log = (type) => console.log.bind(console, type);

        return(
            <div>
             
                <Form schema={this.state.schema}
                    uiSchema={this.state.uiSchema}
                    onChange={log("changed")}
                    onSubmit={this.onSubmit}
                    onError={log("errors")} />

		
		
            </div>
        )
    }

}
export default FormComponent
