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

export default function ShowPDF({formData, signatures }){

    
    /*const MyContent = (
 
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
      
    );*/
	// for loop to add signatures.
	function getSignatures(){
		let signs = []
		for(var person in signatures){
			console.log(signatures[person])
			signs.push(<Page style={styles.page} size="A4">
						<View style={styles.centerImage}>
						  <Image style={styles.image} src={signatures[person]} />
						</View>
						<Text style={styles.text}>
						  Signed by {person}
						</Text>
						</Page>)
		}
		return signs
	}
    

    return(<>
    <PDFViewer style={{ margin: 20, width : "100%", height:500 }}>
    	<Document>
        <Page style={styles.page} size="A4">
          <Header/>
          <Text style={styles.text}>
            Application Form for Sports Secretary
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
            {
            
            getSignatures()
            
            }
          </Document>
  </PDFViewer>
  <PDFDownloadLink document={ 
  	<Document>
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
    {
            
            getSignatures()
            
            }
  </Document> } 
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

    </>)
}

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
  
