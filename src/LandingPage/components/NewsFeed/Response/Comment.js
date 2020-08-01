import React from "react";
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Typography, Box, Divider } from "@material-ui/core";
class Comment extends React.Component {
  render() {
    return (<React.Fragment>
          <ListItem>
          <ListItemIcon>
            <Avatar alt={this.props.author} src="../../../../public/logo512.png" />
          </ListItemIcon>
          <ListItemText 
            > 
            <Typography varaint="h4" display="inline">
                <Box fontWeight="Bold" display="inline">{this.props.author}: </Box>
              </Typography>
              <Typography color="textPrimary" display="inline">
                {this.props.body}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {this.props.time}
              </Typography>
            </ListItemText>
        </ListItem>
        <Divider variant="inset"/>
    </React.Fragment>
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
