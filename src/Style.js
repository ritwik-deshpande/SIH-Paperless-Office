import { makeStyles } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';
import { deepOrange } from '@material-ui/core/colors';

const drawerWidth = 300;
const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    
    toolbar: {
      paddingRight: 24, // keep right padding when drawer closed
    },
    media: {
      height: 90,
      width:90
    },
    cardDim:{
      width: 300,
      height:300,
    },
    toolbarIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 6px',
      ...theme.mixins.toolbar,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    menuButtonHidden: {
      display: 'none',
    },
    title: {
      flexGrow: 1,
    },
    drawerPaper: {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      height: '100vh',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerPaperClose: {
      overflowX: 'hidden',
      height: '100vh',
      flexShrink: 0,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(5),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      height: '100vh',
      overflow: 'auto',
    },
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
      overflow: 'auto',
    },
    paper: {
      padding: theme.spacing(2),
      width : '100%',
      overflow: 'auto',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    stepper: {
      padding: theme.spacing(3, 0, 5),
    },
    layout: {
      width: '100%',
      [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
        width: 'auto',
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
    fixedHeight: {
      height: 240,
    },
    loginbg: {
      width: '100%',
      height: '100vh',
      display: "flex",
      flexGrow: 1,
      // position: 'fixed',
      zIndex: -1,
      // backgroundColor: '#303f9f',
      backgroundImage: 'linear-gradient(-45deg, #E0E0E0 30%, #C0C0C0 90%)',  
      overflow: 'auto',
    },
    loginBox: {
      padding: theme.spacing(5, 3),
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      overflow: 'auto',
    },
    loginLogo: {
      width: theme.spacing(15),
      height: theme.spacing(10),
      display: 'block',
      marginLeft: 'auto',
      marginRight: 'auto',
    }
  }));

  export default useStyles
