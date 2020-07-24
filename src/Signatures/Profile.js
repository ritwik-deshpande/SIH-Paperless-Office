
import React, { Component } from 'react'
import SignaturePad from 'react-signature-canvas'
import styles from './styles.module.css'
import useStyles from '../Style'
//import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
//import Card from '@material-ui/core/Card';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import Timestamp from '../utils/TimeStamp'
import AvatarImage from '../images/lodu.jpeg'

import {
	Card,
	CardHeader,
	ListGroup,
	ListGroupItem,
	Row,
	Col,
	Button,
	Progress,
	Container
  } from "shards-react";


export default function Profile({userObj}) {
	const classes = useStyles();
	function displayProfile(){
		let fields = []
		for( var key in userObj)
		{
		if(key.localeCompare("esign") && key.localeCompare("notifications") && key.localeCompare("password") && key.localeCompare("pin")){
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

	function displayGeneralInfo(){
		let fields = []
		fields.push(
			<Card small className="mb-4 pt-3">
				<CardHeader className="border-bottom text-center">
		  			<div className="mb-3 mx-auto">
						<img
						className="rounded-circle"
						src={AvatarImage}
			  			// src={userDetails.avatar}
			  			alt={userObj.name}
			  			width="110"
						/>
		  			</div>
		  
		  			<h4 className="mb-0">{userObj.name}</h4>
		  			<span className="text-muted d-block mb-2">@{userObj.username}</span>
		  		</CardHeader>
			
			<ListGroup flush>
			{ !("avg_response_time" in userObj) ? 
			
			null: 
			
			<ListGroupItem className="px-4">
					<div className="progress-wrapper">
			  		<strong className="text-muted d-block mb-2">
					  Average Time for Approval:{Timestamp.conversion(userObj["avg_response_time"])}
			  		</strong>
			  		<Progress
						className="progress-sm"
						value={10}
			  		>
					<span className="progress-value">
				  		{10}%
					</span>
			  		</Progress>
					</div>
		  	</ListGroupItem>}
			  
			  <ListGroupItem className="p-4">
				<Typography variant="h6">
					E-Signature</Typography>
				<img src = {userObj.esign} alt ="Electronic Signature"></img>
		  		</ListGroupItem> 
		</ListGroup>
	  </Card>)
	  return fields;
	}

	function displayFullInfo(){
		let fields = []
		fields.push(<div>
		<Card small className="mb-4">
    		<CardHeader className="border-bottom" style ={{ backgroundColor: '#002a29' }}>
      		<Typography variant="h6" style={{color: '#fff'}}>General Information</Typography>
    		</CardHeader>
    		<ListGroup flush>
      			<ListGroupItem className="p-3">
        		<Row>
          			<Col>
					  	<Row>
                		{/* First Name */}
                			<Col md="6" className="form-group">
                  				<label ><strong>Full Name</strong></label>
							<Typography> {userObj.name}</Typography>
                			</Col>
                		
						{/* Username */}
                			<Col md="6" className="form-group">
                  			<label><strong>Username</strong></label>
                  			<Typography> @{userObj.username}</Typography>
                			</Col>
              			</Row>
					  
					  	<Row>
                		{/* ID Number*/}
                			<Col md="6" className="form-group">
                  				<label ><strong>ID</strong></label>
							<Typography> {userObj.id}</Typography>
                			</Col>
                		
						{/* Branch */}
                			<Col md="6" className="form-group">
                  			<label ><strong>Branch</strong></label>
                  			<Typography> {userObj.branch}</Typography>
                			</Col>
              			</Row>

						<Row>
                		{/* Contact*/}
                			<Col md="6" className="form-group">
                  				<label ><strong>Contact</strong></label>
							<Typography> {userObj.contact}</Typography>
                			</Col>
                		
						{/* Email ID */}
                			<Col md="6" className="form-group">
                  			<label ><strong>Email ID</strong></label>
                  			<Typography> {userObj.emailID}</Typography>
                			</Col>
              			</Row>
						
						<Row>
                		{/* Address*/}
                			<Col md="12" className="form-group">
                  				<label ><strong>Address</strong></label>
							<Typography> {userObj.address}</Typography>
                			</Col>
						</Row>

						<Row>
                		{/* Roles*/}
                			<Col md="12" className="form-group">
                  				<label ><strong>Roles</strong></label>
							<Typography> {
							userObj.roles + " "
							} </Typography>
                			</Col>
						</Row>
				</Col>
        </Row>
      </ListGroupItem>
    </ListGroup>
  </Card>
		</div>)
		return fields
	}

	return (

		<Container fluid className="main-content-container px-4">
			<Row>
      			<Col lg="4">
        			{displayGeneralInfo()}
      			</Col>
      			{<Col lg="8">
        			{displayFullInfo()}
      			</Col>}
    		</Row>
  		</Container>


	//  <div >
    //   	{/* <div className={classes.appBarSpacer} /> */}
	// <List >
	
    //     { displayProfile() }
	// <ListItem>
	// <Typography gutterBottom variant="h5" component="h1" style={{ margin: 20 }}>
	//        ESIGNATURE :
	// </Typography>
        
	// <img src = {userObj.esign} alt ="Electronic Signature"></img>
	// </ListItem>
    // 	</List>
	

	// </div>

	
	)



}
