import { FormContainer, ToolBox } from 'react-drag-drop-form-builder';

import React from 'react'
import {Component} from 'react'
import useStyles from '../Style'

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';



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
        },
        states : {
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
          description: "Enter Details",
          type: "object",
          required: [],
          properties: {
             
           }
        },
	uiSchema :{}
      },
      uploadDocuments:false
    }

    constructor(){
        super()
        this.save = this.save.bind(this)
        this.reformatForm = this.reformatForm.bind(this)
    }   
    handleCheck = (e) => {
		this.setState({
			uploadDocuments: e.target.checked
	}) 	

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
                        onSave={this.save} />
                </div>
                <div className="col-md-5">
                    <ToolBox custom={ myCustoms } />
                </div>
            </div>
	   <FormControlLabel
		    control={<Checkbox checked={this.state.uploadDocuments} onChange={this.handleCheck}  />}
		    label="Upload Documents Feature"
		  />
        </div>

        )
    }

    reformatForm = (form) => {

		if(this.state.uploadDocuments){
			this.state.form.schema.properties["Upload_Documents"] =  {
										type: "array",
										items: {
										type: "string",
										format: "data-url"
										},
									     }
		
		}


   		for(let attribute in form){
	       		console.log("The atrribute ")

		    	if( form[attribute].toolType === "CHECK_BOXES"){
			let formattr = { type:"array",title :form[attribute].title, items: { type: "string", enum: [] }, uniqueItems:true}
			
			let i = 0
			
			for(i = 0 ; i< form[attribute].checkBoxes.length; i++)
			{
				formattr.items.enum.push( form[attribute].checkBoxes[i].title )
				
			}
			
			 console.log(formattr)
            
			    if(form[attribute].validation.isRequired){
				this.state.form.schema.required = [...this.state.form.schema.required,form[attribute].name]
			    }
			     this.state.form.schema.properties[form[attribute].name ] = formattr 
			     this.state.form.uiSchema[form[attribute].name] =  {"ui:widget": "checkboxes"}

			}
			if( form[attribute].toolType === "SINGLE_FIELD"){
				let formattr = { type:"string",title :form[attribute].title }
				console.log(formattr)
				
				if(form[attribute].validation.isRequired){
				    this.state.form.schema.required = [...this.state.form.schema.required,form[attribute].name]
				}
				 this.state.form.schema.properties[form[attribute].name ] = formattr


			}
			if( form[attribute].toolType === "PARAGRAPH"){

				let formattr = { type:"string",title :form[attribute].title }
				console.log(formattr)
				
				 this.state.form.schema.properties[form[attribute].name ] = formattr

				this.state.form.uiSchema[form[attribute].name] = {"ui:widget": "textarea","ui:options": {"rows": 5} }

	
			}
			if( form[attribute].toolType === "RADIO_BUTTONS"){
			
			
				let formattr = { type:"string",title :form[attribute].title, enum: [] }
			
				let i = 0
			
				for(i = 0 ; i< form[attribute].radios.length; i++)
				{
					formattr.enum.push( form[attribute].radios[i].title )
				
				}
			
				 console.log(formattr)
		        
				if(form[attribute] && form[attribute].validation.isRequired){
				    this.state.form.schema.required = [...this.state.form.schema.required,form[attribute].name]
				}
				 this.state.form.schema.properties[form[attribute].name ] = formattr 
				 this.state.form.uiSchema[form[attribute].name] =  {"ui:widget": "radio"}


			}
			if ( form[attribute].toolType === "SELECT_FIELD" ){
			
				let formattr = { type:"string",title :form[attribute].title, enum: [] }
			
				let i = 0
			
				for(i = 0 ; i< form[attribute].options.length; i++)
				{
					formattr.enum.push( form[attribute].options[i].title )
				
				}
			
				 console.log(formattr)
		        
				if(form[attribute] && form[attribute].validation.isRequired){
				    this.state.form.schema.required = [...this.state.form.schema.required,form[attribute].name]
				}
				 this.state.form.schema.properties[form[attribute].name ] = formattr 
			
			}
		
           
           
        }
         console.log("The form is  ",this.state.form)

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
