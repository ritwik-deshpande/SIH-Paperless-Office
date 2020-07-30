import React from "react";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import Button from '@material-ui/core/Button'
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
      commentNodes = <div className="comment-list">{comments}</div>;
    }

    return (
      <div className="main">
        <CommentForm addComment={this._addComment.bind(this)} />
        <br/>
        <Button size="small" onClick={this._handleClick.bind(this)}>{buttonText}</Button>
        {commentNodes}
      </div>
    );
  } // end render

  _addComment(author, body, date) {
    console.log("new comment " + body + "is going to be added")
    const comment = {
      id: this.state.comments.length + 1,
      name: 'userObj',
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

  _getComments() {
    return this.state.comments.map(comment => {
      return (
        <Comment author={comment.name} body={comment.comment} key={comment.id} time={comment.timestamp} />
      );
    });
  }
}

export default CommentBox;
