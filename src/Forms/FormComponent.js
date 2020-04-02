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
  
    console.log("Data submitted: ",  formData);
    this.props.save(formData)
  }
    componentDidMount(){
      axios.get(api.forms("Forms").get("Admission Cancellation"))
      .then(res => {
        console.log(res.data[0].schema)
        this.setState({
          schema : res.data[0].schema,
          uiSchema : res.data[0].uiSchema
        })
      })
    }
    render(){
        
        let log = (type) => console.log.bind(console, type);

        return(
            <div className="input-field">
                <h1 id="title">{this.props.title}</h1>
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