import React from "react";
import { Grid, TextField, Button, Box} from '@material-ui/core'
import AccountCircle from '@material-ui/icons/AccountCircle'
import { MentionsInput, Mention } from 'react-mentions'
import {swapTags, getUsersFromTags} from './tags'
import './mention-style.css'
import AddCommentIcon from '@material-ui/icons/AddComment';
import Timestamp from '../../../../utils/TimeStamp'

class CommentForm extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      body: '',
      value: '',
      singleLineValue: '',
      mentionData: null,
      // plainText: '',
      users: [
        {
          _id: 'AP001',
          name: { first: 'Ravindra', last: 'Keskar' }
        },
        {
          _id: 'AP002',
          name: { first: 'Anil', last: 'Mokhade' }
        },
        {
          _id: 'AP003',
          name: { first: 'Manish', last: 'Kurehkar' }
        },
	{
          _id: 'HOD001',
          name: { first: 'Umesh', last: 'Deshpande' }
        },
	{
          _id: 'DIR01',
          name: { first: 'Pramod', last: 'Padole' }
        }
      ],
      workflows: [
        {
          _id: '32v3',
          name: { first: 'Application_3', last: '' }
        },
        {
          _id: '13v3',
          name: { first: 'Application_2', last: '' }
        },
        {
          _id: '32v3',
          name: { first: 'Application_4', last: '' }
        }
      ],
    };
  }
  handleChange = (event) => {
    this.setState({
      body: event.target.value,
    });
  };

  handleMentionChange = (event, newValue, newPlainTextValue, mentions) => {
    // console.log(newValue, newPlainTextValue, mentions)
    this.setState({
      value: newValue,
      mentionData: {newValue, newPlainTextValue, mentions},
      // plainText: newPlainTextValue
    })
  }

  _handleSubmit(event) {
    event.preventDefault(); // prevents page from reloading on submit

    let author = 'some name';
    let body = this.state.value;
    let date = Timestamp.getTimestamp(new Date().getTime())
    this.props.addComment(author.value, body, date);
    this.setState ({
      value: ""
    })
  }
  
  render() {
    const userMentionData = this.state.users.map(myUser => ({
      id: myUser._id,
      display: `${myUser.name.first}_${myUser.name.last}`
    }))

    const workflowMentionData = this.state.workflows.map(myWorkflow => ({
      id: myWorkflow._id,
      display: `${myWorkflow.name.first}_${myWorkflow.name.last}`
    }))

    const displayText = swapTags(this.state.value)
    const uniqueUsers = getUsersFromTags(this.state.value)
    return (<React.Fragment>
   
      {/* <TextField 
            placeholder="Comment"
            id="input-with-icon-grid" 
            value={this.state.value}
            onChange={this.handleChange}
          >
        </TextField> */}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={7} md={9}>
        
        <MentionsInput
          value={this.state.value}
          onChange={this.handleMentionChange}
          placeholder="Write a comment..."
          className="mentions"
          allowSuggestionsAboveCursor	
        >
          <Mention
            displayTransform={(id,display)=>`@${display}`}
            markup="@__display__"
            regex={/@(\S+)/}
            type="user"
            trigger="@"
            data={userMentionData}
            className="mentions__mention"
            appendSpaceOnAdd
          />
          <Mention
            displayTransform={(id,display)=>`#${display}`}
            markup="#__display__"
            regex={/#(\S+)/}
            type="workflow"
            trigger="#"
            data={workflowMentionData}
            className="mentions__mention"
            appendSpaceOnAdd
          />
        </MentionsInput>
        </Grid>
        <Grid item xs={12} sm={5} md={3}>
          <Button size="small" variant="contained" color="secondary" onClick={this._handleSubmit.bind(this)} startIcon={<AddCommentIcon/>}>Post Comment</Button>
        </Grid>
      </Grid>
    </React.Fragment>
      
    );
  } // end render

  
} // end CommentForm component

export default CommentForm;
