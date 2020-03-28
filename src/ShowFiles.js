import React from 'react'
import Container from '@material-ui/core/Container';
import useStyles from './Style'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

function ShowFiles({posts}) {

    const classes = useStyles();

    console.log('Inside show files',posts)

    const renderdocList = () =>{

      return posts.metadata.data.map( user =>{
      return (
        <Grid item xs={4}>
          <Card className={classes.cardDim}>
      <CardActionArea>
        <CardMedia
          title="Click to View details"
        >
        <Typography align="center">
        <InsertDriveFileIcon className={classes.media}/>
        </Typography>
         
        </CardMedia>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {user.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Created on : 10/02/2020<br/>
            Last updated on : 15/02/2020
          </Typography>
        </CardContent>
      </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Status of Workflow
          </Button>
        </CardActions>
    </Card>
        </Grid>
      )

    })
    }
    

    const renderTable = () => {
        return posts.metadata.data.map((user) => {
          return (
            <tr>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.address.street}</td>
              <td>{user.company.name}</td>
            </tr>
          );
        });
      };
    return (
        <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="lg" className={classes.container}>
            {!posts.isDataInitialized && <div>Initializing data...</div>}
            {posts.isDataInitialized && (
              <div>
                <h1 id="title">My Documents</h1>
                {/* <table id="users">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Address</th>
                      <th>Company</th>
                    </tr>
                  </thead>
                  <tbody>{renderTable()}</tbody>
                </table> */}


                <Grid container spacing={3}>
                  {renderdocList()}
                </Grid>
              </div>


             
            )}
            </Container>
            

    
          </main>



    
    )
}

export default ShowFiles
