import React from "react";
import { Grid, TextField, Button, Box} from '@material-ui/core'
import AccountCircle from '@material-ui/icons/AccountCircle'
import { MentionsInput, Mention } from 'react-mentions'
import {swapTags, getUsersFromTags} from './tags'
import './mention-style.css'
import AddCommentIcon from '@material-ui/icons/AddComment';

class CommentForm extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      body: '',
      value: '',
      singleLineValue: '',
      mentionData: null,
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
          name: { first: 'M', last: 'K' }
        }
      ],
      workflows: [
        {
          _id: '32v3',
          name: { first: 'Student Council', last: 'Application' }
        },
        {
          _id: '13v3',
          name: { first: 'Fee', last: 'Remission' }
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
    })
  }

  _handleSubmit(event) {
    event.preventDefault(); // prevents page from reloading on submit
    let author = 'Ritwik';
    let body = this.state.value;
    let date = new Date()
    this.props.addComment(author.value, body, date.toString());
  }
  
  render() {
    const userMentionData = this.state.users.map(myUser => ({
      id: myUser._id,
      display: `${myUser.name.first} ${myUser.name.last}`
    }))

    const workflowMentionData = this.state.workflows.map(myWorkflow => ({
      id: myWorkflow._id,
      display: `${myWorkflow.name.first} ${myWorkflow.name.last}`
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
          markup="@{{__type__||__id__||__display__}}"
          placeholder="Write a comment..."
          className="mentions"
        >
          <Mention
            type="user"
            trigger="@"
            data={userMentionData}
            className="mentions__mention"
          />
          <Mention
            type="workflow"
            trigger="#"
            data={workflowMentionData}
            className="mentions__mention"
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
