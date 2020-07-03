import React from "react";
import {
  PDFViewer,
  Document,
  Page,
  Text,
  View,
  Image,
  Link,
  StyleSheet,
  PDFDownloadLink
} from "@react-pdf/renderer";
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Input from '@material-ui/core/Input'
import GetAppIcon from '@material-ui/icons/GetApp';
import AddCommentIcon from '@material-ui/icons/AddComment';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import Header from './PDFComponents/Header';
import api from '../utils/api'
import Comments from '../utils/Comments';
import AddComments from "./Comments";
import axios from 'axios'
import ShowPDF from "./ShowPDF";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));


const json ={

  listitems : [{id:1, name:'Dustin Henderson', message: 'never ending story. turn around and look at what tyou see.<br/>In her face something never ending story. turn around and look at what tyou see.<br/>In her face something'},
            {id:2, name: 'Will Byers', message: 'Approved by Chief PD'},
            {id:3, name: 'Mike Wheeler', message: 'Threatened by the party'},
            {id:4, name:'Dustin Henderson', message: 'never ending story'},
            {id:5, name: 'Will Byers', message: 'Approved by Chief PD'},
            {id:6, name: 'Mike Wheeler', message: 'Threatened by the party'}
            ]
}

class CreatePDF extends React.Component{

  constructor(props){
    super(props);
    this.state = {
    isSigned: false,
    isApproved : false,
    comments : null,
    flowchart : null,
    formdata : null
    // comments : [{id:1, name:'Dustin Henderson', message: 'never ending story. turn around and look at what tyou see.<br/>In her face something never ending story. turn around and look at what tyou see.<br/>In her face something'},
    // {id:2, name: 'Will Byers', message: 'Approved by Chief PD'},
    // {id:3, name: 'Mike Wheeler', message: 'Threatened by the party'},
    // {id:4, name:'Dustin Henderson', message: 'never ending story'},
    // {id:5, name: 'Will Byers', message: 'Approved by Chief PD'},
    // {id:6, name: 'Mike Wheeler', message: 'Threatened by the party'}
    // ]
    };
    console.log("in Create PDF")
  }

  componentDidMount(){
    axios.get(api.getWorkFlow("workflow").getByid(this.props.item.wrkflwid))
        .then(res => {
          console.log('The data received is',res.data[0])
          if(res.data && res.data[0])
          {this.setState({
            flowchart : res.data[0].FlowChart,
            formdata : res.data[0].FormData,
            comments : res.data[0].Comments,

          })}

        })

  }

  handleAddComment = (comment) => {
    console.log(comment)
    this.setState({ comments: [...this.state.comments, {id:this.state.comments.length, name: this.props.userObj.name,message:comment}] })
    
  }

  handleChangeinComment = (e) => {
    console.log(e.target.value);
    this.setState({comment: e.target.value})
  }

  handleSignClick = () => {

    // add the content for approval.
    // check if all have approved at the same level.
    //broadcast to the next level.
    // at the end send update message to server along with the required arrays.
    this.setState({isSigned : true,
    isApproved : true})
    console.log("in handlesignClick")
  }

  handleRejectClick = () => {

    // add the content for Rejection.
    //notifies the owner.
    this.setState({isSigned : true,
    isApproved : true})
    console.log("in handlesignClick")
  }

  render(){
    //const classes = useStyles();
    return(
      <div>
        {
          this.state.comments?
          (<>
          <ShowPDF userObj={this.props.userObj} isSigned={this.state.isSigned}/>
            <br/>
            
            <AddComments json={{listitems : this.state.comments}} handleAddComment={this.handleAddComment}/>
            <br/>

        <br/>
        {this.state.isApproved? null :<> 
        <Button
              variant="contained"
              color="primary"
              //className={classes.button}
              startIcon={<ThumbUpIcon />}
              onClick = {this.handleSignClick}
            >
          Approve and add e-signature
        </Button>
        <Button
        variant="contained"
        color="primary"
        //className={classes.button}
        startIcon={<ThumbDownIcon />}
        onClick = {this.handleRejectClick}
      >
    Reject with feedback
  </Button></>}
            </>):
            null
        }
        
        
      </div>
      
    );
  }
}

const mapStatetoProps = (state) =>{

  return{
    userObj: state.auth.userObj,
    loggedIn : state.auth.loggedIn
  }
}
export default connect(mapStatetoProps, null)(CreatePDF);