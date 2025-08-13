import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';

console.log('CyberCorrect Privacy Portal - Starting application...');

// Get root element and handle errors gracefully
const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error('Root element not found');
  document.body.innerHTML = `
    <div style="padding: 40px; text-align: center; font-family: system-ui;">
      <h1>CyberCorrect™ Privacy Portal</h1>
      <p>Application failed to initialize. Please refresh the page.</p>
      <button onclick="window.location.reload()" style="padding: 8px 16px; margin-top: 16px; cursor: pointer; background: #1e40af; color: white; border: none; border-radius: 4px;">
        Refresh Page
      </button>
    </div>
  `;
} else {
  try {
    console.log('Root element found, rendering React app...');
    
    // Hide loading screen
    const loading = document.getElementById('loading');
    if (loading) {
      loading.style.display = 'none';
    }
    
    const root = createRoot(rootElement);
    root.render(
      <StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </StrictMode>
    );
    
    console.log('React app rendered successfully');
  } catch (error) {
    console.error('Error rendering React app:', error);
    
    // Show error message
    rootElement.innerHTML = `
      <div style="padding: 40px; text-align: center; font-family: system-ui;">
        <h1>CyberCorrect™ Privacy Portal</h1>
        <p>Error loading application: ${error.message}</p>
        <button onclick="window.location.reload()" style="padding: 8px 16px; margin-top: 16px; cursor: pointer; background: #1e40af; color: white; border: none; border-radius: 4px;">
          Refresh Page
        </button>
      </div>
    `;
  }
}