import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

console.log('Starting React app...');

const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error('Root element not found!');
  document.body.innerHTML = '<div style="padding: 20px; text-align: center;"><h1>Error: Root element not found</h1><p>There was a problem loading the application.</p></div>';
} else {
  console.log('Root element found, creating React app...');
  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(<App />);
    console.log('React app rendered successfully');
  } catch (error) {
    console.error('Error rendering React app:', error);
    document.body.innerHTML = '<div style="padding: 20px; text-align: center;"><h1>Error Loading App</h1><p>Please refresh the page or contact support.</p></div>';
  }
}