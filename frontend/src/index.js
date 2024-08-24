import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {Provider} from "react-redux";
import store from './store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
/* eslint-disable-next-line react/no-deprecated */
root.render(
  <Provider store={store}>
    <App />
    <ToastContainer />
  </Provider>
);
