import React from 'react'

import ListItemIcon from '@material-ui/core/ListItemIcon';
import DashboardIcon from '@material-ui/icons/Dashboard';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {connect} from 'react-redux'
import { getInitalData } from './reducers/ReduxStore';

import ShowFiles from './ShowFiles'


class FolderComponent extends React.Component {

    componentDidMount(){
        this.props.getInitalData('ru')
      }
    render(){

        console.log(this.props)
        
    
        return (
            <ShowFiles  posts = {this.props.posts}/>
        )
    }
    
}

const mapStatetoProps = (state)=>{

    return {
      posts:state
    }
}

export default  connect(mapStatetoProps,
    {getInitalData}) (FolderComponent)