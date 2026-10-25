import React from 'react';
import ReactDOM from 'react-dom/client';
// @ts-expect-error App.jsx does not currently provide TypeScript declarations.
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);