import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { RestfulProvider } from 'restful-react';

const isProductionEnv = process.env.NODE_ENV === 'production';
const devApiUrl = 'http://localhost:8000/api';
const baseApiUrl = isProductionEnv ? process.env.REACT_APP_PRODUCTION_API_URL ?? devApiUrl : devApiUrl;

ReactDOM.render(
    <RestfulProvider base={baseApiUrl}>
        {/* <React.StrictMode> */}
        {/* {!isProductionEnv && <small>You are running this application in <b>{process.env.NODE_ENV}</b> mode.</small>} */}

        <App />

        {/* </React.StrictMode> */}
    </RestfulProvider>,
    document.getElementById('root'),
);
