import { Hidden } from "@material-ui/core";

const drawerWidth = 300;
const style = theme => ({
    root: {
        display: "flex"
    },
    drawer: {
        [theme.breakpoints.up("sm")]: {
            flexShrink: 0,
            whiteSpace: "nowrap",
            height: "100vh",
        }
    },
    drawerClose: {
        overflowX: "hidden",
        width: theme.spacing(8),
        height: "100vh",
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
    appBarspacer: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3)
    },
    title: {
        flexGrow: 1,
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
        backgroundColor: "#0e1c21",
        color: theme.palette.getContrastText("#0e1c21"),
        maxHeight: "100vh",
        // paddingTop: theme.spacing(4)
    },
    navBarIcons: {
        color: theme.palette.getContrastText("#0e1c21")
    },
    navBarProfileLogo: {
        marginTop: theme.spacing(4),
        width: theme.spacing(10),
        height: theme.spacing(10),
        padding: theme.spacing(2),
        backgroundColor: "#0e1c21",
        marginLeft: "auto",
        marginRight: "auto"
    },
 });

export default style;