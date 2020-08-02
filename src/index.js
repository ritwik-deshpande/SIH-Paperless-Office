import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.min.css";
import "popper.js/dist/popper.min";
import "bootstrap/dist/js/bootstrap.min.js";
import "jquery-ui-dist/jquery-ui.min";
import "jquery-ui-dist/jquery-ui.min.css";
import "jquery-ui-timepicker-addon/dist/jquery-ui-timepicker-addon";
import "jquery-ui-timepicker-addon/dist/jquery-ui-timepicker-addon.css";
import "font-awesome/css/font-awesome.min.css";
import "react-bootstrap-slider";
import Main from "./Main";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./reducers/rootReducer";
import thunk from "redux-thunk";
import { createMuiTheme, ThemeProvider, responsiveFontSizes } from "@material-ui/core/styles";

let theme = createMuiTheme({
	palette: {
		primary: {
			// light: "#358873",
			main: "#002A29",
			// dark: "#205072",
		},
		secondary: {
			// light: "#8DC3A7",
			main: "#006A5C",
			// dark: "#4E9C81",
		},
		action: {
			hover: "#0D8172", //"#00A58F",
			selected: "#006A5C",
			// focus: "#8DC3A7",
		},
		background: {
			paper: "#fff",
			default: "#f4f6f8", 
			navBarListBg: "#0e1c21",
			active: "#0288d1",
		},
		pending: {
			backgroundColor: "#ff9800",
		},
	},
	typography: {
		fontFamily: [
			'"Helvetica Neue"',
			'Helvetica'
		  ].join(','),
	},
	overrides: {
		MuiCssBaseline: {
		  '@global': {
			'*': {
			  'scrollbar-width': 'thin',  
			},
			'*::-webkit-scrollbar': {
				width: '6px',
				height: '6px',
			},
			/* Track */
			'*::-webkit-scrollbar-track': {
				backgroundColor: 'rgba(0, 0, 0, 0)',
			},
			
			/* Handle */
			'*::-webkit-scrollbar-thumb': {
				background: "#006A5C", 
				borderRadius: "10px"
			},
			
			/* Handle on hover */
			'*::-webkit-scrollbar-thumb:hover': {
				background: "#005C50",
			},
		  },
		},
	  }
});
theme = responsiveFontSizes(theme);
const store = createStore(rootReducer, applyMiddleware(thunk));
ReactDOM.render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<Provider store={store}>
				<Main />
			</Provider>
		</ThemeProvider>
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
