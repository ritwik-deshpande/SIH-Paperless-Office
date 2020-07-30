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
import { makeStyles } from '@material-ui/core/styles';


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
    id:"empty",
    password:"empty",
  }

  const handleChangeId = (e) =>{
    state.id = e.target.value;
  }
  const handleChangePassword = (e) =>{
    state.password = e.target.value;
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    signin(state.id,state.password)
  }

  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.loginroot}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.loginimage} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.loginpaper}>
          <Avatar className={classes.loginavatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.loginform} onSubmit={handleSubmit} noValidate>
          <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="ID"
              autoComplete="email"
              autoFocus
              onChange = {handleChangeId}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
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
              className={classes.loginsubmit}
            >
              Sign In
            </Button>
            
            {/* <Box mt={5}>
              <Copyright />
            </Box> */}
          </form>
        </div>
        </Grid>
        </Grid>



























  //   <div className={classes.loginbg}>
  //   <Container component="main" maxWidth="xs" className={classes.loginBox}>
  //   <Paper elevation = {10}>
  //     <div className={classes.paper}>
  //       {/* <Avatar alt="Remy Sharp" src="../logo192.png">
  //         DD
  //       </Avatar> */}
  //       <img src="../DigiDocsLogoW.png" className={classes.loginLogo}/>
  //       <Typography component="h1" variant="h4" align="center">
  //         <Box fontWeight={800} display="inline">Digi</Box>
  //         <Box display="inline">Docs</Box>
  //       </Typography>
  //       <Box mt={4}>
  //         <form className={classes.form} onSubmit={handleSubmit} noValidate>
  //           <TextField
  //             variant="outlined"
  //             margin="normal"
  //             required
  //             fullWidth
  //             size="small"
  //             id="email"
  //             label="ID"
  //             autoComplete="email"
  //             autoFocus
  //             onChange = {handleChangeId}
  //           />
  //           <TextField
  //             variant="outlined"
  //             margin="normal"
  //             required
  //             fullWidth
  //             size="small"
  //             label="Password"
  //             type='password'
  //             id="password"
  //             onChange = {handleChangePassword}
  //             autoComplete="current-password"
              
  //           />
          
  //           <Button
  //             type="submit"
  //             fullWidth
  //             variant="contained"
  //             color="primary"
  //             className={classes.submit}
  //           >
  //             Sign In
  //           </Button>
          
  //         </form>
  //       </Box>
  //       <Box mt={4}>
  //         <Copyright />
  //       </Box>
  //     </div>
      
      
  //     </Paper> 
  //   </Container>
  //   </div>
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
//               onChange = {handleChangeId}
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
//               onClick={() => { signin(state.Id,state.password) } } 
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
