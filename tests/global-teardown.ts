// Global teardown for Playwright tests
import { FullConfig } from '@playwright/test';

async function globalTeardown(config: FullConfig) {
  console.log('🧹 Starting global test teardown...');
  
  try {
    // Clean up any global resources
    // - Remove test data
    // - Clean up test files
    // - Reset application state
    
    console.log('✅ Global teardown completed');
  } catch (error) {
    console.error('❌ Global teardown failed:', error);
    // Don't throw to avoid masking test failures
  }
}

export default globalTeardown;