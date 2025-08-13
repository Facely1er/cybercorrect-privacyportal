import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import { environment } from './config/environment';
import { brandService } from './services/brandService';

// Debug logging for deployment issues
console.log('CyberCorrect Privacy Portal starting...');

// Error handling for initialization
try {
  // Initialize brand service before rendering
  brandService.initialize();
  console.log('Brand service initialized successfully');
} catch (error) {
  console.error('Brand service initialization failed:', error);
}

// Ensure root element exists
const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error('Root element not found');
  document.body.innerHTML = '<div style="padding: 20px; text-align: center;"><h1>Loading Error</h1><p>Root element not found. Please refresh the page.</p></div>';
} else {
  try {
    createRoot(rootElement).render(
      <StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </StrictMode>
    );
    console.log('App rendered successfully');
  } catch (error) {
    console.error('Failed to render app:', error);
    rootElement.innerHTML = '<div style="padding: 20px; text-align: center;"><h1>CyberCorrect Privacy Portal</h1><p>Loading failed. Please refresh the page.</p><p style="color: red; font-size: 12px;">Error: ' + error + '</p></div>';
  }
}
