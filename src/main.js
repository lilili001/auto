import React from 'react';
import ReactDOM from 'react-dom'
import App from './App'

import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

import './assets/main.scss';
import { Provider } from "react-redux"
import store from "./store/store"

ReactDOM.render( <Provider store={store}> <App/></Provider>, document.getElementById('root'));
