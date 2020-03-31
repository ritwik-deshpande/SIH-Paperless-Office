import React from 'react'
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