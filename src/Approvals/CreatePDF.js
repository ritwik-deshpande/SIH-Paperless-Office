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

import Header from './PDFComponents/Header';

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

const MyDocument = (
  <Document>
    <Page style={styles.page} size="A4">
      <Header/>
      <View style={styles.centerImage}>
        <Image style={styles.image} src="https://react-pdf.org/static/images/luke.jpg" />
      </View>
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
  </Document>
);

// Render the PDF using React DOM
export default function CreatePDF(){
return(
  <div height='200px'>
  <PDFViewer height='200px' width='200%'>
    {MyDocument }
  </PDFViewer>
  <PDFDownloadLink document={MyDocument} fileName='output.pdf'>Download</PDFDownloadLink>
  </div>
  
);
}