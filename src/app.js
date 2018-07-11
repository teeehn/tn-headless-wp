import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Router from './Router';
import App from './components/App';

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);
