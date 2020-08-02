import React from 'react';
import CreateESign from './CreateESign'
import {connect } from 'react-redux'
import {saveSign} from  '../Actions/UserAction'
import SearchBar from 'material-ui-search-bar'
import api from '../utils/api'
import Button from '@material-ui/core/Button';
import Profile from './Profile'
import Calendar from '../Calendar/Calendar'
import MyProfileHeader from '../Headers/MyProfileHeader'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import style from '../StyleSheet'
import Switch from '@material-ui/core/Switch';

import { withStyles, Tooltip } from '@material-ui/core';
import {
	AppBar,
	Toolbar,
	ButtonGroup,
	Box,
	TextField
} from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close'
import Autocomplete from '@material-ui/lab/Autocomplete';


function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const users = [
	{
		id: "20409",
		name: "Ritwik Deshpande"
	},
	{
		id: "DIR01",
		name: "Pramod Padole"
	},
	{
		id: "AP001",
		name: "Ravindra Keskar"
	},
	{
		id: "AP002",
		name: "Anil Mokhade",
	},
	{
		id: "AP003",
		name: "Manish Kurhekar",
	}
];

class ESignComponent extends React.Component{


	constructor(props){
      super(props);
      this.state = {
        userObj: this.props.userObj,
        updateProfile : false,
        viewProfile: JSON.parse(JSON.stringify(this.props.userObj)),
		value : "",
		cannotUpdate : false,
		checkedA : this.props.userObj.onleave,
		checked : this.props.userObj.onleave,
		openSnackBar: false,
		openDialog: false,
		datefrom: null,
		dateto : null,

      };
      console.log(this.state);
  	}


    updateUser= (userObj) =>{
    
    	console.log("New Object", userObj)
    	
        this.props.saveSign(userObj)
        
    }
    onUpdateClick = () => {

		this.setState({
			updateProfile : true
		})
    }

	handleBackButton = () => {
	
		this.setState({
			updateProfile : false
		})
	
	}
  
    handleSearch = () =>{
        console.log("The userid to search",this.state.value)
        let id = this.state.value
        console.log("The user",this.state.userObj)
        if(id === "")
		{
			alert("User Not Found")
		}
		else{
			 api.users().getByid(id).then( res => {
		    	if (res && res.data){
		    	
		    		console.log(res.data)
		    		this.setState({
		    			viewProfile : res.data
		    		})
		    		
		    		if(id === this.state.userObj.id){
						this.setState({
								cannotUpdate : false,
								userObj : res.data
				
							})
			
						}else{
							this.setState({
								cannotUpdate : true
				
							})
						}  		    	
		    	}
		    
		    })
		    .catch( err =>{
		    	alert("User Not Found")
		    });

		}
	}
	

    handleChange =(newValue) => {

		console.log("The value is", newValue)
		this.setState({
			value : newValue
		})		
  	
	}

	handleLeave = (e) => {

		const payload = {
			onleave: !this.state.checked,
			nominators : [this.state.userObj.id],
			nominee: this.state.userObj.nominee
			}
		if(!e.target.checked){
			api.leave().post(this.state.userObj.id,payload ).then((res)=>{

				if(res && res.data)
				{
					
				}

			})
			this.setState({
				checked : false,
				openDialog : false
			})
		}
		else
		{this.setState({
			checked: !this.state.checked,
			openDialog: this.state.checked ?  false : true,
		})}		
	}

	handleLeaveToggle = () => {
		this.setState({
			checked: !this.state.checked,
			openDialog: this.state.checked ?  false : true,
		})
	}
	handleCloseDialog = () => {
		this.setState({
			openDialog: false,
		})
	}
	handleSubmitLeaveForm = () => {
		/* Submit Logic */
		const payload = {
			onleave: this.state.checked,
			nominators : [this.state.userObj.id],
			nominee : this.state.nominee,
			datefrom: new Date(this.state.datefrom).getTime().toString(),
			dateto : new Date(this.state.dateto).getTime().toString()}
		
		console.log(payload)
		api.leave().post(this.state.userObj.id,payload ).then((res)=>{
			if(res && res.data.allowed)
			{
				this.setState({
					checked: true,
					openSnackBar: true,
				})
			}
			else
			{
				this.setState({
					checked: false,
					
			//openSnackBar: true,
				})
			}
		})
		this.setState({
			openDialog: false,
		})
	}
	handleCloseSnackBar = () => {
		this.setState({
			openSnackBar: false,
		})
	}
    render(){
		const { classes } = this.props 
		
        return(
            <div>
			<MyProfileHeader title="User Profile"/>		
               
			{ this.state.userObj ?

		( this.state.updateProfile ?

		(<><AppBar className={classes.appBar}>
			<Toolbar >
				<Box display="flex" flexGrow={1}>
					<Button
						edge="start"
						autoFocus
						color="inherit"
						onClick={this.handleBackButton}
						startIcon={<ArrowBackIosIcon />}>
						Back
					</Button>
				</Box>
			</Toolbar>
		</AppBar>

		<CreateESign saveUser={this.updateUser} userObj={this.state.userObj}/> </>): 
		
		<div>
			{ !this.state.cannotUpdate ?
			<Box display="flex">
			<Box flexGrow={1}>
			<Button variant="contained" color="primary" onClick = { this.onUpdateClick } style={{margin: "16px 26px"}}>
			UPDATE YOUR PROFILE 
			</Button>
			</Box>
			<FormGroup row style={{margin: "0px 26px"}}>
					<FormControlLabel
						control={
						<Switch
							checked={this.state.checked}
							onChange={this.handleLeave}
							name="checkedOnLeave"
						/>
						}
						label="On Leave"
					/>
				</FormGroup>


				<Dialog open={this.state.openDialog} onClose={this.handleCloseDialog}>
					<DialogTitle id="form-dialog-title">
						Leave Form
						<IconButton aria-label="close" className={classes.closeButton} onClick={this.handleCloseDialog}>
							<CloseIcon />
						</IconButton>
					</DialogTitle>
					<DialogContent dividers>
						<DialogContentText>
						Please fill-in your leave dates and select a Nominee to Approve/Reject Applications on your behalf. 
						</DialogContentText>
						<Box mt={2}>
							{/* <Autocomplete
								id="free-solo-2-demo"
								selectOnFocus
								value = {this.state.nominee}
								onChange={(e) => this.setState({nominee:e.target.value})}
								options={users.map((option) => option.id + " "+option.name)}
								renderInput={(params) => (
								<TextField
									{...params}
									autoFocus
									label="Enter Nominee"
									size="small"
								/>
								)}
							/> */}

						<TextField
							id="nominee"
							label="Enter the nominee name"
							type="text"
							value = {this.state.nominee}
							onChange={(e) => this.setState({nominee:e.target.value})}
							style={{fontSize:"14px"}}
							InputLabelProps={{
								shrink: true
							}}
							fullWidth
							/>
						</Box>
						<Box mt={2}>
							<TextField
							id="fromDate"
							label="Enter the Start Date of Leave:"
							type="date"
							value = {this.state.datefrom}
							onChange={(e) => this.setState({datefrom:e.target.value})}
							style={{fontSize:"14px"}}
							InputLabelProps={{
								shrink: true
							}}
							fullWidth
							/>
						</Box>
						<Box mt={2}>
							<TextField
							id="toDate"
							label="Enter the Last Date of Leave:"
							type="date"
							value = {this.state.dateto}
							onChange={(e) => this.setState({dateto:e.target.value})}
							style={{fontSize:"14px"}}
							InputLabelProps={{
								shrink: true
							}}
							fullWidth
							/>
						</Box>
					</DialogContent>
					<DialogActions>
						<Button onClick={this.handleCloseDialog} color="primary">
							Cancel
						</Button>
						<Button onClick={this.handleSubmitLeaveForm} color="primary">
							Submit
						</Button>
					</DialogActions>
				</Dialog>
				<Snackbar open={this.state.openSnackBar} autoHideDuration={6000} onClose={this.handleCloseSnackBar}>
				<Alert onClose={this.handleCloseSnackBar} severity="success">
					On Leave status updated.
				</Alert>
				</Snackbar>
			{/* <Switch
			checked={this.state.checkedA}
			onChange={this.handleLeave}
			name="checkedA"
			inputProps={{ 'aria-label': 'secondary checkbox' }}
		  /> */}
		  </Box>
		  
			:
			null }
			<Profile userObj = {this.state.viewProfile} />
		{/* <Calendar userObj = {this.state.viewProfile}  /> */}
		

		</div>
		) : 

		<div>
              	<h5>Initializing UserObject</h5>
            	</div>}

	  </div>
            
        )
    }
}

const mapDispatchtoProps = (dispatch) =>{
    return{
      saveSign : (userObj) => dispatch(saveSign(userObj))
      }
}


export default connect(null,mapDispatchtoProps)(withStyles(style,{ withTheme: true})(ESignComponent))
