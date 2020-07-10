import React from 'react'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider'
import ShowPDF from '../Approvals/ShowPDF'
import Comments from '../utils/Comments';
import useStyles from '../Style'
import Button from '@material-ui/core/Button';

import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

export default function NodeStatus({workflow, node}) {
    const classes = useStyles();

    const mapIdtoUser={
        'DIR01' : 'Pramod Padole',
        'HOD001' : 'Umesh Deshpande',
        'AP001' : 'Ravindra Keskar',
        'AP002' : 'Anil Mokhade',
        'AP003' : 'Manish Kurhekar',
        
    }
    
    console.log("the Node is",node)
    
    const handleDownload = (uri,index) =>{
        const linkSource = uri;
        const downloadLink = document.createElement("a");
        const fileName = uri.split(';')[1];

        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.click();
    }
    const handleView = (uri) =>{
        let pdfWindow = window.open("")
        pdfWindow.document.write(
        "<iframe width='100%' height='100%' src='" 
     + uri+"'></iframe>"
        )
        
    }

    function getListItems(){
    
        let rows = []

        for(var approver in node.approvedBy){
            if(node.approvedBy[approver]){
                rows.push(<ListItem button>
                    <ListItemIcon>
                    <AccountCircle />
                    </ListItemIcon>
                    <ListItemText primary={mapIdtoUser[approver]} />
                    <ListItemIcon>
                        <CheckCircleIcon />
                    </ListItemIcon>
                    <ListItemText primary={node.timestamp[approver]} />
                    <Divider/>
                </ListItem> )
            }
            else{

                rows.push(<ListItem button>
                    <ListItemIcon>
                    <AccountCircle />
                    </ListItemIcon>
                    <ListItemText primary={mapIdtoUser[approver]} />
                    <ListItemIcon>
                        <HourglassEmptyIcon />
                    </ListItemIcon>
                    <Divider/>
                </ListItem> )

            }
        }
        return rows
    }


    return (
        <div >

        
        <div>    
            <ShowPDF  formData = {workflow.FormData} title = {workflow.Title} signatures = {workflow.Signatures} />
            {(workflow.FormData.Upload_Documents)?(workflow.FormData.Upload_Documents.map((uri,index)=>{
                return(<>
                <br/><br/>
                {index}.{" " + uri.split(';')[1]  + " : "}
                <Button
                variant="contained"
                color="primary"
                onClick={() => handleView(uri)}
                style = {{marginLeft : 10}}
                className={classes.button}>
                View DOCUMENT 
                </Button>

                <Button
                variant="contained"
                color="primary"
                onClick={() => handleDownload(uri,index)}
                style = {{marginLeft : 100}}
                className={classes.button}>
                    Download DOCUMENT
                </Button>
                <br/><br/>
                </>)
                

            })):null}
                  
            <br/><br/><br/>
            <Typography variant="h6">
                Approvers Status
            </Typography>
            {
                getListItems()
            }

            <br/><br/>

		<Comments json={{listitems : workflow.Comments}}/>

	 </div>

       </div>
    )
}
