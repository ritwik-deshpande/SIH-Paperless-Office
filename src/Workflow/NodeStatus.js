import React from 'react'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider'
import ShowPDF from '../Approvals/CreatePDF'
import useStyles from '../Style'

import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

export default function NodeStatus({node}) {
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
        <div className ={classes.root}>

        
        <div>
{/*             
                <Typography variant="h6" gutterBottom>

                    {node.type}

                
                </Typography> */}
               
                <Grid container spacing={3}>
                <ShowPDF/>
                </Grid>
                <br/>
                <br/>
                <br/>
                <Typography variant="h6" gutterBottom>
                    Approvers Status
                </Typography>
                {
                    getListItems()

                }
                </div>

                <br/>
                <br/>

                {/* <Typography variant="h6" gutterBottom>

                    Initiated at TimeStamp : {node.timestamp}

                
                </Typography> */}
               

       </div>
    )
}
