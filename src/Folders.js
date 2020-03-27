import React from 'react'
import useStyles from './Style'
import ListItemIcon from '@material-ui/core/ListItemIcon';
import DashboardIcon from '@material-ui/icons/Dashboard';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {connect} from 'react-redux'
import { getInitalData } from './reducers/ReduxStore';


class FolderComponent extends React.Component {

    componentDidMount(){
        this.props.getInitalData('ru')
      }
    render(){

        console.log(this.props)
        const renderTable = () => {
          return this.props.posts.metadata.data.map(user => {
            return (
              <tr>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.address.street}</td>
                <td>{user.company.name}</td>
              </tr>
            );
          });
        };
    
        return (
          <>
            {!this.props.posts.isDataInitialized && <div>Initializing data...</div>}
            {this.props.posts.isDataInitialized && (
              <div>
                <h1 id="title">API Table</h1>
                <table id="users">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Address</th>
                      <th>Company</th>
                    </tr>
                  </thead>
                  <tbody>{renderTable()}</tbody>
                </table>
              </div>
            )}
          </>
        );
    }
    
}

const mapStatetoProps = (state)=>{

    return {
      posts:state
    }
}

export default  connect(mapStatetoProps,
    {getInitalData}) (FolderComponent)