// Environment configuration

// Environment validation
const requiredEnvVars = {
  VITE_SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
  VITE_SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY,
  VITE_APP_URL: import.meta.env.VITE_APP_URL || window.location.origin,
  VITE_ENVIRONMENT: import.meta.env.VITE_ENVIRONMENT || 'development'
};

// Optional environment variables
const optionalEnvVars = {
  VITE_APP_NAME: import.meta.env.VITE_APP_NAME || 'Privacy Portal',
  VITE_COMPANY_NAME: import.meta.env.VITE_COMPANY_NAME || 'CyberCorrect',
  VITE_CUSTOM_CSS_URL: import.meta.env.VITE_CUSTOM_CSS_URL || '',
  VITE_LOGO_URL: import.meta.env.VITE_LOGO_URL || '',
  VITE_FAVICON_URL: import.meta.env.VITE_FAVICON_URL || '',
  VITE_ANALYTICS_ID: import.meta.env.VITE_ANALYTICS_ID || '',
  VITE_SENTRY_DSN: import.meta.env.VITE_SENTRY_DSN || '',
  VITE_ENABLE_ANALYTICS: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  VITE_ENABLE_ERROR_REPORTING: import.meta.env.VITE_ENABLE_ERROR_REPORTING === 'true',
  VITE_DEBUG_MODE: import.meta.env.VITE_DEBUG_MODE === 'true'
};

// Validate required environment variables with graceful fallback
const validateEnvironment = () => {
  const missing: string[] = [];
  
  if (!requiredEnvVars.VITE_SUPABASE_URL) {
    missing.push('VITE_SUPABASE_URL');
  }
  
  if (!requiredEnvVars.VITE_SUPABASE_ANON_KEY) {
    missing.push('VITE_SUPABASE_ANON_KEY');
  }
  
  if (missing.length > 0) {
    // Only log warnings in development or when debug mode is enabled
    if (import.meta.env.DEV || optionalEnvVars.VITE_DEBUG_MODE) {
      console.warn('Missing required environment variables:', missing);
      console.warn('Some features may not work properly without proper configuration');
      console.warn('App will continue in demo mode with limited functionality');
    }
    return false;
  }
  return true;
};

// Check environment variables but don't fail the app
const environmentValid = validateEnvironment();

export const environment = {
  production: import.meta.env.PROD,
  development: import.meta.env.DEV,
  supabaseUrl: requiredEnvVars.VITE_SUPABASE_URL || '',
  supabaseAnonKey: requiredEnvVars.VITE_SUPABASE_ANON_KEY || '',
  appUrl: requiredEnvVars.VITE_APP_URL,
  environment: requiredEnvVars.VITE_ENVIRONMENT,
  isConfigured: environmentValid,
  debugMode: optionalEnvVars.VITE_DEBUG_MODE
};

const appConfig = {
  name: optionalEnvVars.VITE_APP_NAME,
  version: '1.0.0',
  company: optionalEnvVars.VITE_COMPANY_NAME,
  customCssUrl: optionalEnvVars.VITE_CUSTOM_CSS_URL,
  logoUrl: optionalEnvVars.VITE_LOGO_URL,
  faviconUrl: optionalEnvVars.VITE_FAVICON_URL,
  analytics: {
    enabled: optionalEnvVars.VITE_ENABLE_ANALYTICS,
    id: optionalEnvVars.VITE_ANALYTICS_ID
  },
  errorReporting: {
    enabled: optionalEnvVars.VITE_ENABLE_ERROR_REPORTING,
    sentryDsn: optionalEnvVars.VITE_SENTRY_DSN
  }
};

export { appConfig };