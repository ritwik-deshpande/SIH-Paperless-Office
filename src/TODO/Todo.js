import React, { Component, PropTypes } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid'
import Checkbox from '@material-ui/core/Checkbox';
import Typography from "@material-ui/core/Typography";
import { Box, ButtonGroup, ListItemIcon, ListItemSecondaryAction } from "@material-ui/core";
import ListItemText from "@material-ui/core/ListItemText";

class Todo extends Component{
	
	constructor(props) {
		super(props);
		this.onClick = this.onClick.bind(this);
		this.onCheck = this.onCheck.bind(this);
	}

	onClick(event) {
		this.props.handleRemove(this.props.id)
	}

	onCheck(event) {
		console.log(this.props.id)
		this.props.handleCheck(this.props.id)
	}

	render() {
		 const {
      todo,
    } = this.props;

		return(
			<ListItem dense disableGutters>
				<ListItemIcon>
					<Checkbox
						checked={this.props.checked}
						onChange={this.onCheck}
					/>
				</ListItemIcon>
				<ListItemText  primary={todo} />
				<ListItemSecondaryAction>
					<IconButton onClick={this.onClick} >
						<DeleteIcon/>
					</IconButton>
				</ListItemSecondaryAction>
			</ListItem>
			
		)
	}
} 


export default Todo;
