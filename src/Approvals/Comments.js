import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Input from '@material-ui/core/Input'
import GetAppIcon from '@material-ui/icons/GetApp';
import AddCommentIcon from '@material-ui/icons/AddComment';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import Header from './PDFComponents/Header';
import api from '../utils/api'
import Comments from '../utils/Comments';


export default function AddComments({json,handleAddComment}){

    const [comment, setComment] = useState("")
    
    const handleChange = (e) =>
    {
        console.log(e.target.value)
        setComment(e.target.value)
    }
    return(<>
    <br/>
        <Comments json={json}/>
        <br/> 


        <form //className={classes.root} 
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
        </form>
        </>)
}