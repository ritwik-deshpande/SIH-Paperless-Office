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

    const requestAccepted = true
    console.log("the Node is",node)
    
   

    function getListItems(){
    
        let rows = []

        for(var approver in node.approvedBy){
            if(node.approvedBy[approver]){
                rows.push(<ListItem button>
                    <ListItemIcon>
                    <AccountCircle />
                    </ListItemIcon>
                    <ListItemText primary={approver} />
                    <ListItemIcon>
                        <CheckCircleIcon />
                    </ListItemIcon>
                    <Divider/>
                </ListItem> )
            }
            else{

                rows.push(<ListItem button>
                    <ListItemIcon>
                    <AccountCircle />
                    </ListItemIcon>
                    <ListItemText primary={approver} />
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
                <ShowPDF  formData = {workflow.FormData} signatures = {workflow.Signatures} />
                
                

 		  
                  
                <br/>
 		<br/>
		
                <br/>
                <Typography variant="h6">
                    Approvers Status
                </Typography>
                {
                    getListItems()

                }
      

                <br/>
                <br/>

		 <Typography variant="h6">
		{node.timestamp === "" ? <> Pending Approvals </> :<>

                         Completed on : {node.timestamp}
			</>}
                
                </Typography> 

		<br/>
                <br/>

		<Comments json={{listitems : workflow.Comments}}/>

		

		
		
	 </div>

                
               

       </div>
    )
}
