import authReducer from './authReducer'
import WorkflowReducer from './WorkflowReducer'

import {combineReducers} from 'redux'


const rootReducer = combineReducers({

    auth : authReducer,
    workflow: WorkflowReducer
})

export default rootReducer;