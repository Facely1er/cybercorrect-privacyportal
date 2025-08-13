// Environment configuration

// Environment validation
const requiredEnvVars = {
  VITE_SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
  VITE_SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY,
  VITE_APP_URL: import.meta.env.VITE_APP_URL || window.location.origin,
  VITE_ENVIRONMENT: import.meta.env.VITE_ENVIRONMENT || 'development'
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
    console.warn('Missing required environment variables:', missing);
    console.warn('Some features may not work properly without proper configuration');
    console.warn('App will continue in demo mode with limited functionality');
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
  isConfigured: environmentValid
};

const appConfig = {
  name: 'CyberCorrect™ Privacy Portal',
  version: '1.0.0',
  company: 'CyberCorrect'
};

export { appConfig };