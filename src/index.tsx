import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import WalletWrapper from "./WalletWrapper";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';

ReactDOM.render(
  <React.StrictMode>
      <ToastContainer />
      <WalletWrapper />
  </React.StrictMode>,
  document.getElementById('root')
);
