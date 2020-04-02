import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Dashboard from './Dashboard'
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux'
import store from './reducers/ReduxStore'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'popper.js/dist/popper.min';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'jquery-ui-dist/jquery-ui.min';
import 'jquery-ui-dist/jquery-ui.min.css';
import 'jquery-ui-timepicker-addon/dist/jquery-ui-timepicker-addon';
import 'jquery-ui-timepicker-addon/dist/jquery-ui-timepicker-addon.css';
import 'font-awesome/css/font-awesome.min.css';
import 'react-bootstrap-slider'

ReactDOM.render(
  <React.StrictMode>
    <Provider store = {store}> <Dashboard /> </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
