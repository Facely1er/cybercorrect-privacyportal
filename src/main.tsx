import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import { environment } from './config/environment';
import { errorReportingService } from './services/errorReportingService';
import { monitoringService } from './services/monitoringService';

// Initialize monitoring and error reporting
if (environment.production) {
  // Set up global error handlers for production
  window.addEventListener('error', (event) => {
    errorReportingService.logError(event.error || new Error(event.message), {
      componentStack: event.filename ? `at ${event.filename}:${event.lineno}:${event.colno}` : undefined
    });
    
    monitoringService.trackError(
      event.error || new Error(event.message),
      'high'
    );
  });

  window.addEventListener('unhandledrejection', (event) => {
    const error = new Error(`Unhandled Promise Rejection: ${event.reason}`);
    errorReportingService.logError(error, { componentStack: 'Promise rejection' });
    monitoringService.trackError(error, 'high');
  });

  // Track page load
  window.addEventListener('load', () => {
    monitoringService.trackPageView(window.location.pathname, document.title);
  });

  // Track page visibility changes
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      monitoringService.trackEvent('page_visibility', 'user_behavior', 'visible');
    } else {
      monitoringService.trackEvent('page_visibility', 'user_behavior', 'hidden');
    }
  });
}

// Get root element
const rootElement = document.getElementById('root');

if (!rootElement) {
  const errorMessage = 'Root element not found';
  
  if (environment.development || environment.debugMode) {
    console.error(errorMessage);
  }
  
  document.body.innerHTML = `
    <div style="padding: 40px; text-align: center; font-family: system-ui;">
      <h1>Privacy Portal</h1>
      <p>Application failed to initialize. Please refresh the page.</p>
      <button onclick="window.location.reload()" style="padding: 8px 16px; margin-top: 16px; cursor: pointer; background: #1e40af; color: white; border: none; border-radius: 4px;">
        Refresh Page
      </button>
    </div>
  `;
} else {
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
}