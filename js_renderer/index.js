import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from "react-redux";

import store from "@redux";
import App from "./pages/App";

import './test.less'


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);