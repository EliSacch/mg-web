import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CurrentMessageProvider } from './context/MessageContext';

// styles
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { CurrentUserProvider } from './context/CurrentUserContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //<React.StrictMode>
    <CurrentUserProvider>
      <CurrentMessageProvider>
        <App />
      </CurrentMessageProvider>
    </CurrentUserProvider>
  //</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
