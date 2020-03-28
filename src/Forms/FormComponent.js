import React, { Component } from "react";
import './FormComponent.css'
import Form from "react-jsonschema-form";


const schema = {
    "title": "A registration form",
    "description": "A simple form example.",
    "type": "object",
    "required": [
      "firstName",
      "lastName"
    ],
    "properties": {
      "firstName": {
        "type": "string",
        "title": "First name",
        "default": "Chuck"
      },
      "lastName": {
        "type": "string",
        "title": "Last name"
      },
      "age": {
        "type": "integer",
        "title": "Age"
      },
      "bio": {
        "type": "string",
        "title": "Bio"
      },
      "password": {
        "type": "string",
        "title": "Password",
        "minLength": 3
      },
      "telephone": {
        "type": "string",
        "title": "Telephone",
        "minLength": 10
      }
    }
  }

  const UiSchema = {
    "password" :{
    "classNames" : "input-field",
    "ui:widget": "password",
    "ui:help": "Hint: Make it strong!",
    "classNames" : "input-field col s12"
    }
    }
  const onSubmit = ({formData}, e) => console.log("Data submitted: ",  formData);

class FormComponent extends Component{

    render(){
        
        let log = (type) => console.log.bind(console, type);

        return(
            <div className="input-field">
                <h1 id="title">{this.props.title}</h1>
                <Form schema={schema}
                    uiSchema={UiSchema}
                    onChange={log("changed")}
                    onSubmit={onSubmit}
                    onError={log("errors")} />
            </div>
        )
    }

}
export default FormComponent