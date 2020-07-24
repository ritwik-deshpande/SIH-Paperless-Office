import React from 'react'
import { Paper, Typography } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
function Header(props) 
{
    const title = props.title
  return (
    <div>
        <Grid>
      <Paper style={{width: '100%',
    height: '110px', backgroundColor: '#002a29', color:'#fff'}}>
      <Typography component="h4" variant="h4" align="left" style={{ marginLeft :'20px'}}>
				 	    {title}
				 	 </Typography>
      </Paper>
      </Grid>
    </div>
  )
}

export default Header;