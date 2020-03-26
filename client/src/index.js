import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ContextProvider } from './Context';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
  <ContextProvider>
    <Router>
      <App />
    </Router>
  </ContextProvider>,
  document.getElementById('root')
);
