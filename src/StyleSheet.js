import { Hidden } from "@material-ui/core";
import CalendarPhoto from './images/headers/spring.jpg'
import SearchPhoto from './images/headers/search.jpg'
import ProfilePhoto from './images/headers/myprofileheader.jpg'
import WorkflowsPhoto from './images/headers/myworkflows.jpg'
import StartWorkflowPhoto from './images/headers/startworkflow.jpg'
import ApprovalsPhoto from './images/headers/approve.jpg'
import AnalyticsPhoto from './images/headers/analytics.jpg'
const drawerWidth = 300;
const style = theme => ({
    root: {
        display: "flex"
    },
    drawer: {
        height: "100vh",
        [theme.breakpoints.up("sm")]: {
            flexShrink: 0,
            whiteSpace: "nowrap",
        }
    },
    drawerClose: {
        overflowX: "hidden",
        width: theme.spacing(8),
        height: "100vh",
        backgroundColor: theme.palette.background.navBarListBg,
        color: theme.palette.getContrastText(theme.palette.background.navBarListBg),
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: theme.palette.common.white,
        color: theme.palette.getContrastText(theme.palette.common.white)
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    // necessary for content to be below app bar
    appBarSpacer: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        // padding: theme.spacing(1)
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
    toolbarIcon: {
		display: "flex",
		alignItems: "center",
		justifyContent: "flex-end",
		padding: "0 6px",
        ...theme.mixins.toolbar,
        backgroundColor: theme.palette.primary.main,
	},
    navBarProfile: {
        height: 200,
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.getContrastText(theme.palette.primary.main),
    },
    navBarLists: {
        backgroundColor: theme.palette.background.navBarListBg,
        color: theme.palette.getContrastText(theme.palette.background.navBarListBg),
        overflowX: "hidden",
        overflowY: "auto",
    },
    navBarListItems: {
        "& .Mui-selected": {
            borderRadius: "1px 50px 50px 1px", 
          },
          "& .MuiListItem-root:not(.Mui-selected):hover": {
            borderRadius: "1px 50px 50px 1px",
            backgroundColor: "#182f37",
        }
    },
    navBarIcons: {
        color: theme.palette.getContrastText(theme.palette.background.navBarListBg)
    },
    navBarProfileLogo: {
        marginTop: theme.spacing(2),
        width: theme.spacing(12),
        height: theme.spacing(12),
        padding: theme.spacing(1),
        backgroundColor: "#0e1c21",
        borderRadius: "50%",
    },
    headerBox: {
        width: '100%',
        height: '110px', 
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.getContrastText(theme.palette.primary.main),
    },
    headerTitle: {
        marginLeft: theme.spacing(2),
        // align: "flex-end",
        flexShrink: 1,
        textTransform: "capitalize",
    },
    headerSearchBox: {
        padding: theme.spacing(2),
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.getContrastText(theme.palette.primary.main),
    },
    gridCard: {
		margin: 'auto',
		width: "100%",
		height: "100%",
    },
    media: {
		height: 100,
    },
    closeButton: {
		position: "absolute",
		right: theme.spacing(1),
		top: theme.spacing(1),
		color: theme.palette.grey[500],
    },
    tableStyle: {
		width: "100%",
		padding: theme.spacing(2),
		margin: "auto",
    },
    
    calendarHeader: {
        width: '100%',
        height: '150px', 
        backgroundImage: `url(${CalendarPhoto})`,
        backgroundPosition: '0 20%',
        backgroundSize: '1000px',
        color: theme.palette.getContrastText(theme.palette.primary.main),
    },
    calendarIcon: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(1),
        float: 'left',  
        fontSize: 40
    },

    SearchheaderBox: {
        width: '100%',
        height: '175px', 
        backgroundImage: `url(${SearchPhoto})`,
        backgroundPosition: '0 40%',
        color: theme.palette.getContrastText(theme.palette.primary.main),
    },
    searchheaderTitle: {
        // marginLeft: theme.spacing(2),
        // align: 'center',
        // flexShrink: 1,
        textTransform: "capitalize",
    },
    myProfileHeader:{
    width: '100%',
    height: '175px', 
    backgroundImage: `url(${ProfilePhoto})`,
    backgroundPosition: '0 20%',
    backgroundSize: '1000px',
    color: theme.palette.getContrastText(theme.palette.primary.main),
    },
    myWorkflowsHeader:{
    width: '100%',
    height: '175px', 
    backgroundImage: `url(${WorkflowsPhoto})`,
    backgroundPosition: '0 30%',
    backgroundSize: '1200px',
    color: theme.palette.getContrastText(theme.palette.primary.main),
    },
    startWorkflowHeader: {
        width: '100%',
        height: '175px', 
        backgroundImage: `url(${StartWorkflowPhoto})`,
        backgroundPosition: '0 55%',
        backgroundSize: '900px',
        color: theme.palette.getContrastText(theme.palette.primary.main),
        },
        approvalsHeader: {
            width: '100%',
            height: '175px', 
            backgroundImage: `url(${ApprovalsPhoto})`,
            backgroundPosition: '0 35%',
            backgroundSize: '1200px',
            color: theme.palette.getContrastText(theme.palette.primary.main),
        },
        analyticsHeader: {
            width: '100%',
            height: '175px', 
            backgroundImage: `url(${AnalyticsPhoto})`,
            backgroundPosition: '0 45%',
            backgroundSize: '1200px',
            color: theme.palette.getContrastText(theme.palette.primary.main),
        }
 });

export default style;