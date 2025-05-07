import React from 'react';
import ReactDOM from 'react-dom/client';  // Import from 'react-dom/client'
import './index.css';
import App from './App';
import { ProductProvider } from './context';
import * as serviceWorker from './serviceWorker';

// Create the root for React 18
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render your app using the new API
root.render(
  <ProductProvider>
    <App /> {/* No need to wrap App with Router here */}
  </ProductProvider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
