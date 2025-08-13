import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';

// Get root element
const rootElement = document.getElementById('root');

if (!rootElement) {
  // Create a basic error display if root element is missing
  document.body.innerHTML = `
    <div style="padding: 40px; text-align: center; font-family: system-ui, -apple-system, sans-serif;">
      <h1>CyberCorrect™ Privacy Portal</h1>
      <p>Application failed to initialize. Please refresh the page.</p>
      <button onclick="window.location.reload()" style="padding: 8px 16px; margin-top: 16px; cursor: pointer;">
        Refresh Page
      </button>
    </div>
  `;
} else {
  // Render the app
  createRoot(rootElement).render(
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  );
}