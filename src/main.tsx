import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';

// Simple error handling
try {
  const rootElement = document.getElementById('root');
  
  if (!rootElement) {
    document.body.innerHTML = '<div style="padding: 20px; text-align: center;"><h1>CyberCorrect Privacy Portal</h1><p>Loading...</p></div>';
    throw new Error('Root element not found');
  }

  createRoot(rootElement).render(
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  );

} catch (error) {
  console.error('Failed to initialize app:', error);
  const rootElement = document.getElementById('root');
  if (rootElement) {
    rootElement.innerHTML = '<div style="padding: 20px; text-align: center;"><h1>CyberCorrect Privacy Portal</h1><p>Loading error. Please refresh the page.</p></div>';
  }
}