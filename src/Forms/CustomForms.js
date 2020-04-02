import { FormContainer, ToolBox } from 'react-drag-drop-form-builder';
import ContainerComponent from './ContainerComponent'
import PreviewComponent from './PreviewComponent'
import React from 'react'
const myCustoms = [
    {
        container : < ContainerComponent/>,
        preview : < PreviewComponent/>,
        toolbox : {
            title : 'Component',
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
    render(){
        return(
        /* Simply pass myCustoms to */
        <div className="app">
            
            <div className="col">
                <div className="col-8">
                    <FormContainer
                        debug={false} // turn on debuging mode
                        updateOnMount={true} // update on mount
                        updateForm={this.updateForm} 
                        onSave={this.save} 
                        custom={ myCustoms } />
                </div>
                <div className="col-8">
                    < ToolBox custom={ myCustoms } />
                 </div>
            </div>
        </div>
        )
    }
    
    save(form){
        // you will receive form
        console.log(form);
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