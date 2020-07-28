import React, { Component, PropTypes } from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid'
import AddCommentIcon from "@material-ui/icons/AddComment";
import { Box } from '@material-ui/core';

class AddTodo extends Component {
	
	constructor() {
		super();
		this.onClick = this.onClick.bind(this);
		this.state = {
			inputValue: '',
		}
	}
	handleChange = (e) => {
		console.log(e.target.value);
		this.setState({
			inputValue: e.target.value,
		});
	};
	onClick() {
		var todo = this.state.inputValue;
		if(todo=='') return 
		else 
		{	
			this.props.handleClick(todo);
			this.setState({
			inputValue: ''
			});
		}
	}

	render() {
		const { handleClick } = this.props;
		return(
			<Box>
				<Grid container spacing={2} justify="space-evenly" alignItems="flex-end">
						
					<Grid item xs={8} >
						{/* <Box m={2} p={2}> */}
						<TextField
							value = {this.state.inputValue}
							fullWidth
							variant="outlined"
							size="small"
							label="Add to List"
							onChange={this.handleChange}
						/>
						{/* </Box> */}
					</Grid>
					<Grid item xs={4} >
						{/* <Box m={2} p={2}> */}
						<Button
							fullWidth
							variant="contained"
							color="primary"
							//className={classes.button}
							startIcon={<AddCommentIcon />}
							onClick={this.onClick} >
							ADD 
						</Button>
						{/* </Box> */}
					</Grid>
				</Grid>
			
					
			</Box>
		)
	}
}

export default AddTodo;
