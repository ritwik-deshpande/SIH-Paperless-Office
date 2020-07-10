import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Card, CardContent, Typography, Switch, FormControlLabel } from '@material-ui/core';
import { messaging } from '../Chat/Config/MyFirebase';

const styles = theme => ({
    card: {
        marginTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 2,
        marginLeft: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 2
    },
    noteTextPos: {
        marginTop: theme.spacing.unit * 2
    }
});

class Notifications extends Component {
    constructor(props) {
        super(props);
    }
    async notificationPermission() {
        let permissionGranted = false;
        try {
            /* request permission if not granted */
            if(Notification.permission !== 'granted') {
                await messaging.requestPermission(); 
            }
            /* get instance token if not available */
            if(localStorage.getItem(INSTANCE_TOKEN) !== null) {
                permissionGranted = true;
            } else {
                const token = await messaging.getToken(); // returns the same token on every invocation until refreshed by browser
                await this.sendTokenToDb(token); 
                localStorage.setItem(INSTANCE_TOKEN, token);
                permissionGranted = true;            
            }       
        } catch(err) {
            console.log(err);
            if(err.hasOwnProperty('code') && err.code === 'messaging/permission-default') this.displayMessage(<span>You need to allow the site to send notifications</span>);
            else if(err.hasOwnProperty('code') && err.code === 'messaging/permission-blocked') this.displayMessage(<span>Currently, the site is blocked from sending notifications. Please unblock the same in your browser settings.</span>);
            else this.displayMessage(<span>Unable to subscribe you to notifications</span>);
        } finally {
            return permissionGranted;
        }
    }
    renderSubscriptionOptions(classes) {
        if(!('serviceWorker' in navigator) && !('PushManager' in window)) {
            return(
                <Typography className={classes.noteTextPos}>
                    Notification feature is supported only in:<br/>
                    Chrome Desktop and Mobile (version 50+)<br/>
                    Firefox Desktop and Mobile (version 44+)<br/>
                    Opera on Mobile (version 37+)
                </Typography>
            );
        } else {
            return (
                <Fragment>
                    <FormControlLabel 
                        control={<Switch />}
                        label="Enable/Disable GNIB(IRP) Appointment Notifications"
                        onChange={this.gnibApptSubscriptionToggle}
                        checked={this.state.gnibApptSubscriptionToggleSwitch}
                    />
                </Fragment>
            );
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <Fragment>
                <Card className={classes.card}>
                    <CardContent>
                        {this.renderSubscriptionOptions(classes)}
                    </CardContent>
                </Card>
            </Fragment>
        );
    }
}

Notifications.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Notifications);