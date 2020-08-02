import React from "react";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import Button from '@material-ui/core/Button'
import { List, Box, Typography, Grid, IconButton } from "@material-ui/core";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close'

class CommentBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showComments: false,
      itemID: this.props.id,
      comments: this.props.comments,
    };
  }

  
  render() {
    
    const comments = this._getComments();
    
    let commentNodes;
    
    let buttonText = "Show All Comments (" + comments.length+")";

    if (this.state.showComments) {
      buttonText = "Hide All Comments";
      commentNodes = <div><List disablePadding>{comments}</List></div>;
    }

    return (
      <div>
        <CommentForm addComment={this._addComment.bind(this)} />
        <Box mt={1}>
        {comments.length > 2 ? 
          (<Button size="small" color="secondary" onClick={this._handleClick.bind(this)}>{buttonText}</Button>)
          : null }
        </Box>
        {/* {commentNodes} */}
        <Dialog open={this.state.showComments} onClose={this._handleClick.bind(this)} fullWidth maxWidth="sm" fullScreen={this.props.fullScreen}>
          <DialogTitle id="form-dialog-title">
            <div>
              <Typography gutterBottom>
                {this.props.title}
              </Typography> 
              <IconButton aria-label="close" style={{position:"absolute",right: "8px", top: "8px",}} onClick={this._handleClick.bind(this)}>
                <CloseIcon />
              </IconButton>
              <Typography color="textSecondary">
                Comments:
              </Typography>
            </div>
          </DialogTitle>
          <DialogContent dividers style={{padding:0}}>
            
            <div>
              {commentNodes}
            </div>
              
          </DialogContent>
          <DialogActions disableSpacing>
            <CommentForm addComment={this._addComment.bind(this)} />
                {/* <Button onClick={this._handleClick.bind(this)} color="primary">
                  Close
                </Button> */}
          </DialogActions>
        </Dialog>
      </div>
    );
  } // end render

  _addComment(author, body, date) {
    console.log("new comment " + body + "is going to be added")
    const comment = {
      id: this.state.comments.length + 1,
      name: this.props.userObj.name,
      comment: body,
      timestamp: date
    };
    this.setState({ comments: this.state.comments.concat([comment]) }); // *new array references help React stay fast, so concat works better than push here.
  }

  _handleClick() {
    this.setState({
      showComments: !this.state.showComments
    });
  }

  _handleEnter() {
    this.scrollToBottom()
  }
  _getComments() {
    return this.state.comments.map(comment => {
          return (
        <Comment author={comment.name} body={comment.comment} key={comment.id} time={comment.timestamp}/>
      );     
    });
  }

  _getLatestComments() {

  }
}

export default CommentBox;
