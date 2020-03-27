import React from 'react'
import Container from '@material-ui/core/Container';
import useStyles from './Style'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

function ShowFiles({posts}) {

    const classes = useStyles();

    console.log('Inside show files',posts)
    

    const renderTable = () => {
        return posts.metadata.data.map(user => {
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
                <h1 id="title">API Table</h1>
                <table id="users">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Address</th>
                      <th>Company</th>
                    </tr>
                  </thead>
                  <tbody>{renderTable()}</tbody>
                </table>
              </div>
            )}
            </Container>
            <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>xs=12</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>xs=6</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>xs=6</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
      </Grid>
    </div>
          </main>

    
    )
}

export default ShowFiles
