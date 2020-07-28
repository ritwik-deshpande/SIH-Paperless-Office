import React, {useEffect, useRef, useState} from 'react';
import {Icon, Typography, Paper, IconButton, Card, CardHeader, CardContent, Box} from '@material-ui/core';
import moment from 'moment';

function TimeWidget()
{
    const [time, setTime] = useState(moment());
    const intervalRef = useRef();

    useEffect(() => {
        intervalRef.current =
            setInterval(update, 1000);
        return () => {
            clearInterval(intervalRef.current);
        };
    });

    function update()
    {
        setTime(moment());
    }

    return (
        <Card elevation={2}>
            <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                     {time.format('dddd, HH:mm:ss')}
                </Typography>
                <Box mt={2} p={2} textAlign="center">
                <Typography variant="h5" color="textSecondary">
                    {time.format('MMMM')}
                </Typography>
                <Typography variant="h2" color="textSecondary">
                    {time.format('D')}
                </Typography>
                <Typography variant="h5" color="textSecondary">
                    {time.format('Y')}
                </Typography>
                </Box> 
            </CardContent>
        </Card>
    );
}

export default React.memo(TimeWidget);
