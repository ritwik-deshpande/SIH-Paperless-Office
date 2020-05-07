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

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Input from '@material-ui/core/Input'

import Header from './PDFComponents/Header';

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
    width: "50%",
    padding: 10
  },
  centerImage: {
    alignItems: "center",
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

const SignedDocument = (
  <Document>
    { MyContent }
    <Page style={styles.page} size="A4">
    <View style={styles.centerImage}>
      <Image style={styles.image} src={require("../images/lodu.jpeg")} />
    </View>
    <Text style={styles.text}>
      Added Esignature 
    </Text>
    </Page>
  </Document>
);


class CreatePDF extends React.Component{

  constructor(props){
    super(props);
    this.state = {
    isSigned: false,
    isApproved : false,
    comment : "",

    };
  }

  //classes = useStyles();

  handleSignClick = () => {
    this.setState({isSigned : true})
    console.log("in handlesignClick")
  }
  render(){
    //const classes = useStyles();
  return(
    <div>
      <PDFViewer height='200%' width='100%'>
        { this.state.isSigned ? (SignedDocument) : (MyDocument) }
      </PDFViewer>
      <PDFDownloadLink document={ this.state.isSigned ? (SignedDocument) : (MyDocument) }
       fileName='output.pdf'>
        <Button
              variant="contained"
              color="secondary"
              // className={this.classes.button}
              startIcon={<DeleteIcon />}
            >
          Download
        </Button>
      </PDFDownloadLink>

      <Button
            variant="contained"
            color="secondary"
            //className={classes.button}
            startIcon={<DeleteIcon />}
            onClick = {this.handleSignClick}
          >
        Approve and add e-signature
      </Button>
      <br/>
      <form //className={classes.root} 
      noValidate autoComplete="off">
      <Input //className={classes.button} 
      name='comment' 
      placeholder='Add your valuable comments' 
      inputProps={{ 'aria-label': 'description' }} />
      <Button
            variant="contained"
            color="secondary"
            //className={classes.button}
            startIcon={<DeleteIcon />}
          >
        Add comment
      </Button>
      </form>
    </div>
    
  );
  }
}

export default CreatePDF;