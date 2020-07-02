import React from "react";
import {
  PDFViewer,
  Document,
  Page,
  Text,
  View,
  Image,
  Link,
  StyleSheet,
  PDFDownloadLink
} from "@react-pdf/renderer";
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Input from '@material-ui/core/Input'
import GetAppIcon from '@material-ui/icons/GetApp';
import AddCommentIcon from '@material-ui/icons/AddComment';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import Header from './PDFComponents/Header';
import api from '../utils/api'
import Comments from '../utils/Comments';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const styles = StyleSheet.create({
  page: {
    flexDirection: "column"
  },
  image: {
    width: "30%",
    alignContent:'center',
    alignItems: 'center',
    padding: 10
  },
  centerImage: {
    alignItems: "left",
    flexGrow: 1
  },
  text: {
    width: "100%",
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 50,
    paddingVertical: 30,
    color: "#212121"
  }
});

const MyContent = (
 
    <Page style={styles.page} size="A4">
      <Header/>
      <Text style={styles.text}>
        PSPDFKit GmbH is the leading cross-platform SDK solution for integrating
        PDF support on all major platforms: iOS, Android, Windows, macOS, and on
        Web (both server-based and standalone via WebAssembly).
      </Text>
      <Text style={styles.text}>
        Our solutions enable customers to seamlessly add powerful PDF viewing,
        editing, annotating, and form filling/signing into their app in under 15
        minutes, saving months of development time and expense.
      </Text>
      <Text style={styles.text}>
        Learn more at <Link src="https://pspdfkit.com/">pspdfkit.com</Link>
      </Text>
    </Page>
  
);

const MyDocument = (
  <Document>
    { MyContent }
  </Document>
);


const json ={

  listitems : [{id:1, name:'Dustin Henderson', message: 'never ending story. turn around and look at what tyou see.<br/>In her face something never ending story. turn around and look at what tyou see.<br/>In her face something'},
            {id:2, name: 'Will Byers', message: 'Approved by Chief PD'},
            {id:3, name: 'Mike Wheeler', message: 'Threatened by the party'},
            {id:4, name:'Dustin Henderson', message: 'never ending story'},
            {id:5, name: 'Will Byers', message: 'Approved by Chief PD'},
            {id:6, name: 'Mike Wheeler', message: 'Threatened by the party'}
            ]
}

class CreatePDF extends React.Component{

  constructor(props){
    super(props);
    this.state = {
    isSigned: false,
    isApproved : false,
    comment : ""
    };
  }


  //classes = useStyles();
  handleAddComment = () => {
    console.log(this.state.comment)
    json.listitems.push({id:7, name:this.props.userObj.name, message:this.state.comment})
    this.setState({comment:""})
  }

  handleChangeinComment = (e) => {
    console.log(e.target.value);
    this.setState({comment: e.target.value})
  }

  handleSignClick = () => {
    this.setState({isSigned : true,
    isApproved : true})
    console.log("in handlesignClick")
  }

  render(){
    //const classes = useStyles();
    return(
      <div>
        
        <PDFViewer width='100%'>
          { this.state.isSigned ? (<Document>
                  { MyContent }
                  <Page style={styles.page} size="A4">
                  <View style={styles.centerImage}>
                    <Image style={styles.image} src={this.props.userObj.esign} />
                  
                  
                  <Text style={styles.text}>
                    Added Esignature 
                  </Text>
                  </View>
                  </Page>
                </Document>) : (MyDocument) }
        </PDFViewer>
        <PDFDownloadLink document={ this.state.isSigned ? 
        (<Document>
          { MyContent }
          <Page style={styles.page} size="A4">
          <View style={styles.centerImage}>
            <Image style={styles.image} src={this.props.userObj.esign} />
          </View>
          <Text style={styles.text}>
            Added Esignature 
          </Text>
          </Page>
        </Document>) 
        
        : (MyDocument) }
        fileName='output.pdf'>
          <br/>
          <Button
                variant="contained"
                color="secondary"
                // className={this.classes.button}
                startIcon={<GetAppIcon />}
              >
            Download
          </Button>
        </PDFDownloadLink>

        <br/>
        <br/>
        <Comments json={json}/>
        <br/> 


        <form //className={classes.root} 
        noValidate autoComplete="off">
        <Input //className={classes.button} 
        onChange = {this.handleChangeinComment}
        value = {this.state.comment}
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
              onClick={this.handleAddComment}
            >
          Add comment
        </Button>
        </form>
        <br/>
        <br/>
        {this.state.isApproved? null : 
        <Button
              variant="contained"
              color="primary"
              //className={classes.button}
              startIcon={<ThumbUpIcon />}
              onClick = {this.handleSignClick}
            >
          Approve and add e-signature
        </Button>}
      </div>
      
    );
  }
}

const mapStatetoProps = (state) =>{

  return{
    userObj: state.auth.userObj,
    loggedIn : state.auth.loggedIn
  }
}
export default connect(mapStatetoProps, null)(CreatePDF);