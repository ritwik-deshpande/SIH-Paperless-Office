import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'popper.js/dist/popper.min';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'jquery-ui-dist/jquery-ui.min';
import 'jquery-ui-dist/jquery-ui.min.css';
import 'jquery-ui-timepicker-addon/dist/jquery-ui-timepicker-addon';
import 'jquery-ui-timepicker-addon/dist/jquery-ui-timepicker-addon.css';
import 'font-awesome/css/font-awesome.min.css';
import 'react-bootstrap-slider'
import Main from './Main';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './reducers/rootReducer';
import thunk from 'redux-thunk';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#358873",
      main: "#207567",
      // dark: "#205072",
    },
    secondary: {
      light: "#8DC3A7",
      main: "#6BAF92",
      dark: "#4E9C81",
    },
    action: {
      hover: "#B4D6C1",
      selected: "#8DC3A7",
      focus: "#8DC3A7",
    },
    background:{
      paper: "#DFEAE2"
    }
  },
  typography: {
    fontFamily: "Helvetica",
  },
});


const store = createStore(rootReducer, applyMiddleware(thunk))
ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Main/>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
