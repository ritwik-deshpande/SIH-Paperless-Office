import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import useStyles from './Style'
import Paper from '@material-ui/core/Paper';

function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
          DigiDocs
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

export default function SignIn({signin}) {

  const state ={
    username:"empty",
    password:"empty",
  }

  const handleChangeUsername = (e) =>{
    state.username = e.target.value;
  }
  const handleChangePassword = (e) =>{
    state.password = e.target.value;
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    // () => { signin(state.username,state.password) }
    signin(state.username,state.password)
  }

  const classes = useStyles();

  return (
    <div className={classes.loginbg}>
    <Container component="main" maxWidth="xs" className={classes.loginBox}>
    <Paper elevation = {10}>
      <div className={classes.paper}>
        {/* <Avatar alt="Remy Sharp" src="../logo192.png">
          DD
        </Avatar> */}
        <img src="../logo512.png" className={classes.loginLogo}/>
        <Typography component="h1" variant="h4" align="center">
          DigiDocs
        </Typography>
        <Box mt={4}>
          <form className={classes.form} onSubmit={handleSubmit} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              size="small"
              id="email"
              label="Username"
              autoComplete="email"
              autoFocus
              onChange = {handleChangeUsername}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              size="small"
              label="Password"
              type='password'
              id="password"
              onChange = {handleChangePassword}
              autoComplete="current-password"
              
            />
          
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              // onClick={() => { signin(state.username,state.password) } } 
              className={classes.submit}
            >
              Sign In
            </Button>
          
          </form>
        </Box>
        <Box mt={8}>
          <Copyright />
        </Box>
      </div>
      
      
      </Paper> 
    </Container>
    </div>
  );
}
//     return (
//       <Container component="main" maxWidth="xs">
//         <CssBaseline />
//         <div className={classes.paper}>
//           <Avatar className={classes.avatar}>
//             <LockOutlinedIcon />
//           </Avatar>
//           <Typography component="h1" variant="h5">
//             Digi Docs
//           </Typography>
//           <form className={classes.form} noValidate>
//             <TextField
//               variant="outlined"
//               margin="normal"
//               required
//               fullWidth
//               id="email"
//               label="Email Address"
//               autoComplete="email"
//               autoFocus
//               onChange = {handleChangeUsername}
//             />
//             <TextField
//               variant="outlined"
//               margin="normal"
//               required
//               fullWidth
//               label="Password"
//               type="password"
//               id="password"
//               onChange = {handleChangePassword}
//               autoComplete="current-password"
//             />
//             <FormControlLabel
//               control={<Checkbox value="remember" color="primary" />}
//               label="Remember me"
//             />
//             <Button
//               fullWidth
//               variant="contained"
//               color="primary"
//               onClick={() => { signin(state.username,state.password) } } 
//               className={classes.submit}
//             >
//               Sign In
//             </Button>
//             <Grid container>
//               <Grid item xs>
//                 <Link href="#" variant="body2">
//                   Forgot password?
//                 </Link>
//               </Grid>
//               <Grid item>
//                 <Link href="#" variant="body2">
//                   {"Don't have an account? Sign Up"}
//                 </Link>
//               </Grid>
//             </Grid>
//           </form>
//         </div>
//         <Box mt={8}>
//           <Copyright />
//         </Box>
//       </Container>
//     );
//   }
