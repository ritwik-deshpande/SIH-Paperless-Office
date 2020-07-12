import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Logo from '../Workflow/WorkflowComponents/grid.jpg';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

const useStyles = makeStyles(theme => ({
    root: {
      width: "150%",
      maxWidth: 300,
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      width: "100%",
      paddingLeft: theme.spacing(4),
    },
    gridList: {
      width: 1150,
      height: 850,
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      transform: 'translateZ(0)',
    },
    media: {
      height: 60,
    },
    number : {
        alignContent : 'center',
        alignItems : 'center',
        height : 100,
    }
  }));
export default function NumberCard({data}) {
    const classes = useStyles();
    return(
        <>
        <h1 style={{marginTop:10}}>test api </h1>
        <GridList cellHeight={500} spacing={30} cols={4} className={classes.gridList}>
        {Object.keys(data).map(key => {
          return (
          <div key={key}>
            <Card>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={Logo}
                title={key}
              />
              <CardContent>
                <Typography variant="h2" className={classes.number} color="textSecondary" component="h2">
                  {data[key]}
                </Typography>
                <Typography variant="body" color="textSecondary" component="p">
                  number of workflows {key}
                </Typography>
              </CardContent>
            </CardActionArea>
             
          </Card>
          </div>

          );
        })}
        </GridList>
        </>
    )
}