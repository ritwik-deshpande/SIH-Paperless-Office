import React from "react";
import AccountCircle from '@material-ui/icons/AccountCircle'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
class Comment extends React.Component {
  render() {
    return (<div>
          <ListItem>
          <ListItemIcon>
            <AccountCircle />
          </ListItemIcon>
          <ListItemText>@{this.props.author}: {this.props.body + "\t\t"} at {this.props.time}</ListItemText>
        </ListItem>
    </div>
      // <div className="commaent">
      //   <p className="comment-header">@{this.props.author}: {this.props.body}</p>
      //   {/* <div className="comment-footer">
      //     <a
      //       href="www.google.com"
      //       className="comment-footer-delete"
      //       onClick={this._deleteComment}
      //     >
      //       Delete Comment
      //     </a>
      //   </div> */}
      // </div>
    );
  }
  _deleteComment() {
    alert("-- DELETE Comment Functionality COMMING SOON...");
  }
}

export default Comment;
