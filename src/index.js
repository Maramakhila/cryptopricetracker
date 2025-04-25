// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client'; // Import the new `react-dom/client`
import { Provider } from 'react-redux';
import { store } from './app/store';
import './index.css';
import App from './App';

// Use createRoot instead of render
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
