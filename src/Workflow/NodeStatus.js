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

export default function NodeStatus() {
    const classes = useStyles();
    const requestAccepted = true
    return (
        <div className ={classes.root}>

        {requestAccepted ? (
        <div>
            
                <Typography variant="h6" gutterBottom>



                
                </Typography>
               
                <Grid container spacing={3}>
                <ShowPDF/>
                </Grid>
                <br/>
                <br/>
                <br/>
                <Typography variant="h6" gutterBottom>
                    Approvers Status
                </Typography>

                <List  aria-label="approvers">
                <ListItem button>
                    <ListItemIcon>
                    <AccountCircle />
                    </ListItemIcon>
                    <ListItemText primary="Ravindra Keskar    (Pending)" />
                    <ListItemIcon>
                        <HourglassEmptyIcon />
                    </ListItemIcon>
                </ListItem>
                <Divider/>
                <ListItem button>
                    <ListItemIcon>
                        <AccountCircle />
                    </ListItemIcon>
                    <ListItemText primary="Manish Kurehkar     (Approved)" />

                    <ListItemIcon>
                        <CheckCircleIcon />
                    </ListItemIcon>
                </ListItem>
                </List>
                </div>
            
       ):(

           <div>
               Approvers have not yet accepted the requests.
           </div>
       )}

       </div>
    )
}
