import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
});

export default function PagesSaved() {

    const classes = useStyles();

    return (
        <Card elevation={2}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="140"
                    image="../../pagesSaved.jpg"
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Till date you have saved
          </Typography>
                    <Typography gutterBottom variant="h2" component="h1">
                        86k
          </Typography>
                    <Typography variant="body" color="textSecondary" component="p">
                        Pages by using DigiDocs
            </Typography>
                    <Typography variant="body" color="textSecondary" component="p">
                        and you have saved
          </Typography>
                    <Typography gutterBottom variant="h2" component="h1">
                        20          </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        tress as well
            </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                    Share
        </Button>

            </CardActions>
        </Card>
    );
}
