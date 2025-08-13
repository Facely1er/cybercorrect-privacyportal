import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import { AuthProvider } from './hooks/useAuth';
import { environment } from './config/environment';
import { brandService } from './services/brandService';

// Debug logging for deployment issues
console.log('CyberCorrect Privacy Portal starting...');
console.log('Environment:', {
  production: environment.production,
  development: environment.development,
  isConfigured: environment.isConfigured,
  hasSupabaseUrl: !!environment.supabaseUrl,
  hasSupabaseKey: !!environment.supabaseAnonKey
});

// Error handling for initialization
try {
  // Initialize brand service before rendering
  brandService.initialize();
  console.log('Brand service initialized successfully');
} catch (error) {
  console.error('Brand service initialization failed:', error);
}

// Service Worker Registration for PWA capabilities
if ('serviceWorker' in navigator && environment.production) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
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
          <AuthProvider>
            <App />
          </AuthProvider>
        </BrowserRouter>
      </StrictMode>
    );
    console.log('App rendered successfully');
  } catch (error) {
    console.error('Failed to render app:', error);
    rootElement.innerHTML = '<div style="padding: 20px; text-align: center;"><h1>CyberCorrect Privacy Portal</h1><p>Loading failed. Please refresh the page.</p><p style="color: red; font-size: 12px;">Error: ' + error + '</p></div>';
  }
}
