import { makeStyles } from "@material-ui/core/styles";
import LoginPhoto from './images/loginphoto.jpg'
import { blue } from "@material-ui/core/colors";
import { deepOrange } from "@material-ui/core/colors";

const drawerWidth = 300;
const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		"& .MuiOutlinedInput-root": {
			"& fieldset": {
				borderColor: theme.palette.grey[500],
			},
			"&:hover fieldset": {
				borderColor: theme.palette.primary.light,
				borderWidth: 2,
			},
		},
	},

	toolbar: {
		paddingRight: 24, // keep right padding when drawer closed
		...theme.mixins.toolbar,
	},
	media: {
		height: 90,
		width: 90,
	},
	cardDim: {
		width: 400,
		height: 400,
	},
	toolbarIcon: {
		display: "flex",
		alignItems: "center",
		justifyContent: "flex-end",
		padding: "0 6px",
		...theme.mixins.toolbar,
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	menuButton: {
		marginRight: 36,
	},
	menuButtonHidden: {
		display: "none",
	},
	title: {
		flexGrow: 1,
	},
	subtitle: {
		flexGrow: 1,
		color: theme.palette.primary.light,
		fontWeight: "bold",
		textTransform: "capitalize",
	},
	drawerPaper: {
		position: "relative",
		whiteSpace: "nowrap",
		width: drawerWidth,
		height: "100vh",
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	drawerPaperClose: {
		overflowX: "hidden",
		height: "100vh",
		flexShrink: 0,
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		width: 0,
		[theme.breakpoints.up("md")]: {
			width: theme.spacing(8),
		},
	},
	appBarSpacer: {
		marginTop: theme.spacing(0),
		...theme.mixins.toolbar,
	},
	content: {
		flexGrow: 1,
		height: "100vh",
		overflow: "auto",
	},
	container: {
		paddingTop: theme.spacing(2),
		paddingBottom: theme.spacing(4),
		overflow: "auto",
	},
	paper: {
		padding: theme.spacing(2),
		width: "100%",
		overflow: "auto",
	},
         hierarchyPaper: {
	    position: 'absolute',
	    width: "100%",
	    backgroundColor: theme.palette.background.paper,
	    border: '2px solid #000',
	    boxShadow: theme.shadows[5],
	    padding: theme.spacing(2, 4, 3),
	  },
	avatar: {
		// margin: theme.spacing(1),
		color: theme.palette.getContrastText(theme.palette.grey[600]),
		backgroundColor: theme.palette.grey[600],
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	stepper: {
		// padding: theme.spacing(3),
		background: theme.palette.background.default,
	},
	layout: {
		width: "100%",
		[theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
			width: "auto",
			marginLeft: "auto",
			marginRight: "auto",
		},
	},
	fixedHeight: {
		height: 240,
	},

	tableStyle: {
		width: "100%",
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(2),
		marginLeft: "auto",
		marginRight: "auto",
	},

	nested: {
		width: "100%",
		paddingLeft: theme.spacing(2),
	},
	gridList: {
		width: 1150,
		height: 850,
		// Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
		transform: "translateZ(0)",
	},
	media: {
		height: 100,
	},
	gridCard: {
		margin: 'auto',
		width: "100%",
		height: "100%",
	},
	numCard: {
		display: "flex",
		width: "100%",
		maxHeight: 250,
	},
	numCardDetails: {
		display: 'flex',
		// flexDirection: 'column'
	},
	numCardNumber: {
		margin: "auto",
		// flex: '1 0 auto',
		padding: theme.spacing(1),
		// alignItems: "flex-start",
	},
	numCardContent: {
		textTransform: "capitalize",
		margin: 'auto',
		// justifyContent: 'flex-end',
	},
	toDoListBox: {
		width: "100%",
		height: "100%",
		margin: "auto",
		padding: theme.spacing(1),
		overflow: "auto",
	},
	dialogBox: {
		// margin: 0,
		// padding: theme.spacing(2),
		// background: theme.palette.background.default,
		backgroundColor: "#FFF",
	},
	closeButton: {
		position: "absolute",
		right: theme.spacing(1),
		top: theme.spacing(1),
		color: theme.palette.grey[500],
	},

	//Login Styling items
	loginroot: {
		height: '100vh',
	  },
	  loginimage: {
		backgroundImage: `url(${LoginPhoto})`,
		backgroundRepeat: 'no-repeat',
		backgroundColor:
		  theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
		backgroundSize: 'cover',
		backgroundPosition: 'center',
	  },
	  loginpaper: {
		margin: theme.spacing(8, 4),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	  },
	  loginavatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	  },
	  loginform: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	  },
	  loginsubmit: {
		margin: theme.spacing(3, 0, 2),
	  },


	loginbg: {
		width: "100%",
		height: "100vh",
		display: "flex",
		flexGrow: 1,
		// position: 'fixed',
		zIndex: -1,
		// backgroundColor: '#303f9f',
		backgroundImage: "linear-gradient(-45deg, #E0E0E0 30%, #C0C0C0 90%)",
		overflow: "auto",
	},
	loginBox: {
		padding: theme.spacing(5, 3),
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		overflow: "auto",
	},
	loginLogo: {
		width: theme.spacing(15),
		height: theme.spacing(10),
		display: "block",
		marginLeft: "auto",
		marginRight: "auto",
	},
	myteamavatar: {
		width: 64,
		height: 64,
	},
	myteamname: {
		fontFamily: 'fira sans',
		fontWeight: 'bold',
		fontSize: 14,
		whiteSpace: 'nowrap',
		marginTop: 4,
	},
	myteamposition: {
		verticalAlign: 'super',
	},
}));

export default useStyles;
