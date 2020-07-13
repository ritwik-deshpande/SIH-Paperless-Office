
import React, { Component } from 'react'
import SignaturePad from 'react-signature-canvas'
import styles from './styles.module.css'
import useStyles from '../Style'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import Timestamp from '../utils/TimeStamp'


export default function Profile({userObj}) {


	const classes = useStyles();
	function displayProfile(){
		let fields = []
		for( var key in userObj){

		if(key.localeCompare("esign") && key.localeCompare("notifications") && key.localeCompare("password") ){
	    		let field_key = key
			if(key.localeCompare("avg_response_time") === 0)
			{
				fields.push(<ListItem>
				<Typography gutterBottom variant="h5" component="h1" style={{ margin: 20 }}>
				       Average Time for Approval:
				</Typography>
				<Typography gutterBottom variant="h5" component="h1" style={{ margin: 20 }}>
					{Timestamp.conversion(userObj[field_key])}
				</Typography>
				</ListItem>
				)

			}
			else{
 

	    	
	    		fields.push(<ListItem>
				<Typography gutterBottom variant="h5" component="h1" style={{ margin: 20 }}>
				       {field_key}:
				</Typography>
				<Typography gutterBottom variant="h5" component="h1" style={{ margin: 20 }}>
					{userObj[field_key]}
				</Typography>
				</ListItem>
				)
			}
			}

		}
		return fields
	}


	return (

	 <div >

      	{/* <div className={classes.appBarSpacer} /> */}


	<Typography gutterBottom variant="h5" component="h1" style={{ margin: 20 }}>
                USER PROFILE
        </Typography>
	<List >
	
        { displayProfile() }
	<ListItem>
	<Typography gutterBottom variant="h5" component="h1" style={{ margin: 20 }}>
	       ESIGNATURE :
	</Typography>
        
	<img src = {userObj.esign} alt ="Electroni Signature"></img>
	</ListItem>
    	</List>
	

	</div>

	
	)



}
