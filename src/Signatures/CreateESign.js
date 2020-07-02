import React, { Component } from 'react'
import SignaturePad from 'react-signature-canvas'
import styles from './styles.module.css'
import useStyles from '../Style'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';

export default function CreateESign({userObj, saveSign}) {

  const classes = useStyles();
  let filereader
  let sigPad = {}

  const handleRead = (e) =>{
    console.log("Uploaded Esign is",filereader.result)
    updateESign(filereader.result)

  }

  const handleChange = (file) =>{

    filereader = new FileReader()
    filereader.onloadend = handleRead
    filereader.readAsDataURL(file)
  }

  const clear = () => {

    sigPad.clear()
  }
  
  const updateESign = (sign) =>{

    userObj.esign = sign
    console.log("The new esign is ",userObj.esign)
    console.log("The New User object",userObj.id)
    //dispatch action
    saveSign(userObj)
  }
  const  getSign = () => {
    
    updateESign(sigPad.getCanvas().toDataURL('image/png')) 
  }

  return (
    <div >

      <div className={classes.appBarSpacer} />

        <Grid container spacing={10}>
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
            <Button variant="contained" color="primary" onClick={clear}>
              CLEAR CANVAS
            </Button>

            <br/>
            <br/>

            <Button variant="contained" color="primary"  onClick={getSign}>
              SAVE NEW ESIGNATURE
            </Button>
          </Grid>

          <Grid item xs={5}>
            <Card className={classes.cardDim}>
            {userObj.esign.localeCompare("Empty") == 0 ?  <Typography gutterBottom variant="h5" component="h2">
            ESIGNATURE  : ESIGN NOT CREATED
          </Typography> : <div><Typography gutterBottom variant="h5" component="h2">
            UPDATED ESIGNATURE
          </Typography>
          <img src = {userObj.esign} alt ="Original Signature"></img>
          </div>
          }
            
        </Card>
        </Grid>

      </Grid>

      <div>

      <br/>
        
        <br/>
        <br/>

        <Button variant="contained" color="primary"  >
          UPLOAD AND SAVE ESIGNATURE <input type = "file" accepct =".png" onChange ={e => handleChange(e.target.files[0])}/>
        </Button>
        
        <br/>
        <br/>
     
      </div>
    </div>
  )
}

