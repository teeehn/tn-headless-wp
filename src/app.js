import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Router from './components/Router';
import App from './components/App';

import './scss/main.scss';

ReactDOM.render(
  <Router foo={'bar'}>
    <App />
  </Router>,
  document.getElementById('root')
);
