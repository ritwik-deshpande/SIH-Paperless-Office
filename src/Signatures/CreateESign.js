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

export default function CreateESign({userObj, saveUser}) {

  const classes = useStyles();
  let filereader
  let sigPad = {}
  const handleRead = (e) =>{
    console.log("Uploaded Esign is",filereader.result)
    

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
    	if(key.localeCompare("id") != 0  && key.localeCompare("username") && key.localeCompare("esign") && key.localeCompare("notifications") ){
    		let field_key = key
    	
    		fields.push(<TextField
		className={classes.margin}
		id={key}
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
        
        <Button variant="contained" color="primary" onClick = { updateUser } >
          UPDATE PROFILE 
        </Button>

      </Grid>
      
      

      <div>

        
        
	
        
        <br/>
        <br/>
     
      </div>
    </div>
  )
}

