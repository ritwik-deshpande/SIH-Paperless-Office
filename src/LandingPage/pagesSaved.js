import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {
    FacebookShareButton,
    TwitterShareButton,
    TwitterIcon,
    FacebookIcon,
    WhatsappIcon,
    WhatsappShareButton,
  } from "react-share";
const useStyles = makeStyles({
});

export default function PagesSaved(props) {

    const classes = useStyles();
    const workingDays = 5;
    const TreeFormula = (31.2/(500*7))
    const CO2Formula = (1.6/(500*7))
    const numberOfPages = (props.number*workingDays)
    const numberOfTrees = (props.number*workingDays*TreeFormula)
    const CO2Emission = (props.number*workingDays*CO2Formula)
    return (
        <Card elevation={2}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    alt="Trees Saved"
                    height="140"
                    image="../../pageSaved.jpg"
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography variant="h6" color="textSecondary" component="p">
                        Pages saved using DigiDocs
          </Typography>
                    <Typography gutterBottom variant="h2" component="h1">
                        {numberOfPages}                    
          </Typography>
                    <Typography variant="h6" color="textSecondary" component="p">
                        Trees saved
            </Typography>
                    <Typography gutterBottom variant="h2" component="h1">
                        {numberOfTrees.toFixed(2)}
          </Typography>
                    <Typography variant="h6" color="textSecondary" component="p">
                        CO2 Emission Prevented
            </Typography>
                    <Typography gutterBottom variant="h2" component="h1">
                        {CO2Emission.toFixed(2)}&nbsp;<h6 style={{display :'inline-block'}}>tonnes</h6>
          </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <TwitterShareButton
                    url='DigiDocs'
                    title= {`I saved ${Math.round(numberOfTrees,2)} trees using`}
                    className="Demo__some-network__share-button"
                >
                    <TwitterIcon size={32} round />
                </TwitterShareButton>
                <FacebookShareButton
                    url='DigiDocs'
                    title= {`I saved ${Math.round(numberOfTrees,2)} trees using`}
                    className="Demo__some-network__share-button"
                >
                    <FacebookIcon size={32} round />
                </FacebookShareButton>
                <WhatsappShareButton
                    url='DigiDocs'
                    title= {`I saved ${Math.round(numberOfTrees,2)} trees using`}
                    className="Demo__some-network__share-button"
                >
                    <WhatsappIcon size={32} round />
                </WhatsappShareButton>
            </CardActions>
        </Card>
    );
}
