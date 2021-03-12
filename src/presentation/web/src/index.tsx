import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RestfulProvider } from "restful-react";

const isProductionEnv = process.env.NODE_ENV === 'production';
const devApiUrl = 'http://localhost:8000/api';
const baseApiUrl = isProductionEnv ? process.env.REACT_APP_PRODUCTION_API_URL ??  devApiUrl : devApiUrl;

ReactDOM.render(
  <RestfulProvider base={baseApiUrl}>
    <React.StrictMode>
      {!isProductionEnv && <small>You are running this application in <b>{process.env.NODE_ENV}</b> mode.</small>}
      <App />
    </React.StrictMode>
  </RestfulProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
