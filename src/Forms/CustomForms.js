import { FormContainer, ToolBox } from 'react-drag-drop-form-builder';

import React from 'react'
import {Component} from 'react'
import useStyles from '../Style'



class TestComponent extends  Component{
    constructor(props){
        super(props)
        this.state = {
            toolType: 'CUSTOM_COM',
            num1 : 1,
            num2 : 2
        }
    }

    changeValue(value){
        this.setState({
            num1 : value
        })
        setTimeout(() => {
            return this.props.changeState(this.state, this.props.index);
        }, 0)
    }

    render(){
        return (
            <div className="container">
                
                {/* <span className='pull-right cross' onClick={() => this.props.removeField(this.props.index)}>x</span>
                <input onChange={(e) => this.changeValue(e.target.value)} type="text"/> */}
            </div>
        )
    }
}

const TestPreview =()=> {
    
        const classes = useStyles();

    
        return (<div className="container">
                
                <h3>{ this.props.toolType }</h3>
                </div>

                )
    
}



const myCustoms = [
    {
        container : < TestComponent/>,
        preview : < TestPreview/>,
        toolbox : {
            title : 'Test',
            icon : 'fa fa-user',
            name : 'CUSTOM_COM'
        },
        states : {
            toolType: 'CUSTOM_COM',
            num1 : 1,
            num2 : 2
        }
    }
]

class CustomForms extends React.Component {


    state = {
        formAttr :{
            type:"string",
            name:"FirstName"
        },
        form:{id: 7,
        title: "Admission Cancellation",
        schema: {
          title: "Admission Cancellation",
          description: "A Custom Form Created",
          type: "object",
          required: [],
          properties: {
              Upload_Documents: {
                type: "array",
                items: {
                type: "string",
                format: "data-url"
                    },
                }
            }
        }
        }
    }

    constructor(){
        super()
        this.save = this.save.bind(this)
        this.reformatForm = this.reformatForm.bind(this)
    }   

    render(){
        return(
        /* Simply pass myCustoms to */
        <div className="container">
            <div className="row">
                <div className="col-md-7">
                    <FormContainer
                        loader={false}
                        debug={false}
                        updateOnMount={true}
                        updateForm={this.updateForm}
                        onSave={this.save}
                        custom={ myCustoms } />
                </div>
                <div className="col-md-5">
                    <ToolBox custom={ myCustoms } />
                </div>
            </div>
        </div>

        )
    }

    reformatForm = (form) => {


        for(let attribute in form){
            console.log("The atrribute ")

            let formattr = { type:"string",title :form[attribute].title}
            console.log(formattr)
            // let form = [...this.state.form,this.state.formData]
            if(form[attribute].validation.isRequired){
                this.state.form.schema.required = [...this.state.form.schema.required,form[attribute].name]
            }


            console.log(this.state.form)
            this.state.form.schema.properties[form[attribute].name ] = formattr 
            console.log(this.state.form)
        }

        return this.state.form
    }

    
    save(form){
        // you will receive form
        console.log(form);

        

        this.props.save(this.reformatForm(form))
    }
    
    updateForm(callback){
        // fetch form and set it to callback
        console.log('No form to show')
    }
}

export default CustomForms

// React.render(
//     <FormBuilder.ReactFormGenerator
//       form_action="/path/to/form/submit"
//       form_method="POST"
//       task_id={12} // Used to submit a hidden variable with the id to the form from the database.
//       answer_data={JSON_ANSWERS} // Answer data, only used if loading a pre-existing form with values.
//       authenticity_token={AUTH_TOKEN} // If using Rails and need an auth token to submit form.
//       data={JSON_QUESTION_DATA} // Question data
//     />,
//     document.body
//   )