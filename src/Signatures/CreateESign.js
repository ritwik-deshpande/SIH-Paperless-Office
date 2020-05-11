import React, { Component } from 'react'
import SignaturePad from 'react-signature-canvas'
import styles from './styles.module.css'
import api from '../utils/api'
import useStyles from '../Style'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';

import Typography from '@material-ui/core/Typography';

  


export default function CreateESign() {

  const classes = useStyles();
  let filereader

  let userObj = api.getUser()

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
  // function previewFile() {
  //   const preview = document.querySelector('img');
  //   const file = document.querySelector('input[type=file]').files[0];
  //   const reader = new FileReader();
  
  //   reader.addEventListener("load", function () {
  //     // convert image file to base64 string
  //     console.log("The img url",reader.result)

  //     preview.src = reader.result;


  //   }, false);
  
  //   if (file) {
  //     reader.readAsDataURL(file)
  //   }
  // }


const updateESign = (sign) =>{

  userObj.esign = sign
    console.log("The new esign is ",userObj.esign)
    console.log("The New User object",userObj.id)
    api.setUser(userObj)
    api.saveUser("users",userObj.id).put(userObj).then(
      res =>{
        console.log(res)
        console.log("Saved ESIGN")
      }
    )

}
 const  getSign = () => {
    // this.setState({DataURL: })
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



          {/* <input type="file" onchange={previewFile()}/><br/>
       <img src="" height="200" alt="Image preview..."></img> */}

      <br/>
        
        <br/>
        <br/>

        <Button variant="contained" color="primary"  >
          UPLOAD AND SAVE ESIGNATURE <input type = "file" accepct =".png" onChange ={e => handleChange(e.target.files[0])}/>
        </Button>
        
        <br/>
        <br/>
        
        

        

      </div>



      {/* {trimmedDataURL
        ? <img className={styles.sigImage}
          src={trimmedDataURL} />
        : null} */}
    </div>
  )
}

// export default class CreateESign extends Component {
//     render () {
//     let {DataURL} = this.state

//     console.log(DataURL)

//     return 
//   }
// }
