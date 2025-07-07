import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { store } from './store';
import { loadUserFromStorage } from './store/slices/authSlice';

// Load user from localStorage on app start
store.dispatch(loadUserFromStorage());

const root = ReactDOM.createRoot(
  document.getElementById('root')
);
root.render(
  <App />
); 