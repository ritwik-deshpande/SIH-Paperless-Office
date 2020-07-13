import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import Input from "@material-ui/core/Input";
import GetAppIcon from "@material-ui/icons/GetApp";
import AddCommentIcon from "@material-ui/icons/AddComment";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import Header from "./PDFComponents/Header";
import api from "../utils/api";
import Comments from "../utils/Comments";
import { Box, Grid, TextField } from "@material-ui/core";

export default function AddComments({ json, handleAddComment }) {
	const [comment, setComment] = useState("");

	const handleChange = (e) => {
		console.log(e.target.value);
		setComment(e.target.value);
	};
	return (
		<div>
			<Comments json={json} />
			<br />

			{/* <form //className={classes.root} 
        noValidate autoComplete="off">

        <Input //className={classes.button} 
        onChange = {handleChange}
        value = {comment}
        name='comment' 
        fullWidth='true'
        placeholder='Add your valuable comments' 
        inputProps={{ 'aria-label': 'description' }} />
        <br/><br/>
        <Button
              variant="contained"
              color="secondary"
              //className={classes.button}
              startIcon={<AddCommentIcon />}
              onClick={() => {handleAddComment(comment)
                setComment("")}}
            >
          Add comment
        </Button>
      </form> */}
			<Box p={1}>
				<Grid container spacing={3}>
					<Grid item xs>
						<TextField
							fullWidth
							variant="outlined"
							size="small"
							value={comment}
							name="comment"
							label="Add your valuable comments"
							onChange={handleChange}
						/>
					</Grid>
					<Grid item>
						<Button
							variant="contained"
							color="primary"
							//className={classes.button}
							startIcon={<AddCommentIcon />}
							onClick={() => {
								handleAddComment(comment);
								setComment("");
							}}>
							Add Comment
						</Button>
					</Grid>
				</Grid>
			</Box>
		</div>
	);
}
