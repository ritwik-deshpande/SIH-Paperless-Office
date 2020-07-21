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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
var bcrypt = require('bcryptjs');

export default function CreateESign({userObj, saveUser}) {

  const classes = useStyles();
  const [openDialog, setOpenDialog] = React.useState(false);
  let filereader
  let sigPad = {}
  let old_password = ""
  let new_password = ""
  let old_pin = ""
  let new_pin = ""
  
  const handleChangeSecretField = (event,key) =>{
  	if(key.localeCompare("old_pin") === 0) {
  		old_pin = event.target.value
  	}
  	if(key.localeCompare("new_pin") === 0){
  	
  		new_pin = event.target.value
  	}
  	if(key.localeCompare("old_password") === 0){
  		old_password = event.target.value
  	}
  	if(key.localeCompare("new_password") === 0){
  		new_password = event.target.value
  	}
  	
  }
  
  const handleSubmitSecretField = (field) =>{
  
  	if(field.localeCompare("password") === 0 ){
  	
  		var salt = "$2a$04$XkEO9KJolCWvmniNP4VHWe";
  		var hash_old_password =  bcrypt.hashSync(old_password, salt);
        var hash_new_password =  bcrypt.hashSync(new_password, salt);  		
  		console.log("Passwords", old_password,new_password)
  		console.log("Passwords", hash_old_password,hash_new_password)
  		if(hash_old_password.localeCompare(userObj.password) === 0){
  			userObj.password = hash_new_password
  			alert("Saved New Password")
  			
  		}
  		else{
  			alert("Original Password in incorrect!")
  		}
  		
  	}
  	else{
  	
  		var salt = "$2a$04$XkEO9KJolCWvmniNP4VHWe";
  		var hash_old_pin =  bcrypt.hashSync(old_pin, salt);
        var hash_new_pin =  bcrypt.hashSync(new_pin, salt);  		
  		console.log("Passwords", old_pin,new_pin)
  		console.log("Passwords", hash_old_pin,hash_new_pin)
  		if(hash_old_pin.localeCompare(userObj.pin) === 0){
  			userObj.pin = hash_new_pin
  			alert("Saved New Pin")
  			
  		}
  		else{
  			alert("Original Pin in incorrect!")
  		}
  	}
  	
  	setOpenDialog(null)
  	
  }
  
  
  const handleRead = (e) =>{
    console.log("Uploaded Esign is",filereader.result)
    

  }
  const closeDialog = () =>{
  
  	setOpenDialog(null)
  }
  
 

  const handleChange = (file) =>{

    filereader = new FileReader()
    filereader.onloadend = handleRead
    filereader.readAsDataURL(file)
  }
  
  const getSignImage = () =>{
  	updateESign(filereader.result)
  }

  const clear = () => {

    sigPad.clear()
  }
  
  const updateESign = (sign) =>{

    userObj.esign = sign
    console.log("The new esign is ",userObj.esign)
    console.log("The New User object",userObj.id)
    alert("New Esignature Saved")
    //dispatch action
    //saveSign(userObj)
  }
  
  const updateUser = () =>{
  
  	console.log("The updated user is",userObj)
  	saveUser(userObj)
  
  }
  const  getSign = () => {
    
    updateESign(sigPad.getCanvas().toDataURL('image/png')) 
  }
  const handleFieldChange = (event,key) => {
	console.log("The value is",event.target.value,key)
	userObj[key] = event.target.value
 }

 function getFields(){

    let fields = []
    for (var key in userObj){
    	if(key.localeCompare("id") != 0  && key.localeCompare("username") && key.localeCompare("esign") && key.localeCompare("notifications") && key.localeCompare("password") && key.localeCompare("pin")){
    		let field_key = key
    	
    		fields.push(<TextField
		className={classes.margin}
		id={key}
		style={{ margin: 20 }}
		label={key}
		style={{ margin: 20 }}
		fullWidth
          	margin="normal"
		defaultValue={userObj[key]}
		onChange={e => { handleFieldChange(e, field_key) }}
	      />)
    		
    	}
    
    }
    
    return fields
    	



 }

  return (
    <div >

      <div className={classes.appBarSpacer} />
	 <form className={classes.root} >
	<div>
	<Typography gutterBottom variant="h5" component="h1" style={{ margin: 20 }}>
                UPDATE PROFILE
        </Typography>
        
        {getFields()}
 
	
	</div>
	</form>

        <Grid container spacing={10} style={{ margin: 20 }}>
        <Typography gutterBottom variant="h5" component="h5">
                To Update your ESignature you can either Sign on the Canvas or upload an Image of your ESignature
              </Typography>
	
          <Grid item xs={5}>
            <Card className={classes.cardDim}>

		

              <Typography gutterBottom variant="h5" component="h2">
                SIGN ON THE CANVAS
              </Typography>
              <div className={styles.sigContainer}>
              <SignaturePad canvasProps={{className: styles.sigPad}}
                ref={(ref) => { sigPad = ref }} />
              </div>
        
            </Card>
            <br/>
            <Button variant="contained" color="primary" onClick={clear}>
              CLEAR CANVAS
            </Button>

            <br/>
            <br/>

            <Button variant="contained" color="primary"  onClick={getSign}>
              SAVE CANVAS ESIGNATURE
            </Button>
          </Grid>

          <Grid item xs={5}>
            <Card className={classes.cardDim}>
            {userObj.esign.localeCompare("Empty") == 0 ?  <Typography gutterBottom variant="h5" component="h2">
            ESIGNATURE  : ESIGN NOT CREATED
          </Typography> : <div><Typography gutterBottom variant="h5" component="h2">
            CURRENT ESIGNATURE
          </Typography>
          <img src = {userObj.esign} alt ="Original Signature"></img>
          </div>
          }
            
        </Card>
        <input label = "Upload Esignature Image" type = "file" accept =".png" onChange ={e => handleChange(e.target.files[0])}/>
        <br/>
        <Button variant="contained" color="primary"  onClick = {getSignImage} >
          SAVE UPlOADED ESIGNATURE 
        </Button>
        </Grid>
        
       

      </Grid>


		 	<Button variant="contained" color="primary"  onClick={ () => setOpenDialog("password") } style={{ margin: 20 }}>
              UPDATE PASSWORD
            </Button>
            <br/>
			<br/>
			<Button variant="contained" color="primary"  onClick={ () => setOpenDialog("pin") } style={{ margin: 20 }}>
              UPDATE PIN
            </Button>
			<br/>
			<br/>

	<Button variant="contained" color="primary" onClick = { updateUser } style={{ margin: 20 }} >
          SAVE PROFILE 
        </Button>
      

	<Dialog open={openDialog} onClose={closeDialog} aria-labelledby="form-dialog-title">
		{(openDialog && openDialog.localeCompare("password") === 0 )? 
		(<>
		<DialogTitle id="form-dialog-title">Update Password</DialogTitle>
		<DialogContent>
		  <DialogContentText>
			Enter your original Password, first before Updating
		  </DialogContentText>
		  <TextField
			autoFocus
			margin="dense"
			id="name"
			label="Original Password"
			type="password"
			onChange={e =>  handleChangeSecretField(e, "old_password")}
			fullWidth
		  />
		  <TextField
			autoFocus
			margin="dense"
			id="name"
			label="New Password"
			type="text"
			onChange={e =>  handleChangeSecretField(e, "new_password")}
			fullWidth
		  />
		</DialogContent>
		<DialogActions>
		  <Button onClick={closeDialog} color="primary">
			Cancel
		  </Button>
		  <Button onClick={() => handleSubmitSecretField("password")} color="primary">
			SAVE PASSWORD
		  </Button>
		</DialogActions>
		</>) : (<><DialogTitle id="form-dialog-title">Update PIN</DialogTitle>
		<DialogContent>
		  <DialogContentText>
			Enter your original PIN, first before Updating
		  </DialogContentText>
		  <TextField
			autoFocus
			margin="dense"
			id="name"
			label="Original PIN"
			type="password"
			onChange={ e =>  handleChangeSecretField(e, "old_pin") }
			fullWidth
		  />
		   <TextField
			autoFocus
			margin="dense"
			id="name"
			label="New PIN"
			type="text"
			onChange={e =>  handleChangeSecretField(e, "new_pin") }
			fullWidth
		  />
		</DialogContent>
		<DialogActions>
		  <Button onClick={closeDialog} color="primary">
			Cancel
		  </Button>
		  <Button onClick={ () => handleSubmitSecretField("pin")  } color="primary">
			SAVE PIN
		  </Button>
		</DialogActions>
		</>) }
		
		
	  </Dialog>

      

      <div>

        
        
	
        
        <br/>
        <br/>
     
      </div>
    </div>
  )
}

