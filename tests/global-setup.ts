// Global setup for Playwright tests
import { chromium, FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  console.log('🚀 Starting global test setup...');
  
  // Launch browser for setup
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  
  try {
    // Wait for the application to be ready
    await page.goto(config.projects[0].use.baseURL || 'http://127.0.0.1:4173');
    
    // Wait for the app to fully load
    await page.waitForSelector('body', { timeout: 30000 });
    
    // Check if the app is working
    const title = await page.title();
    console.log(`✅ Application loaded successfully. Title: ${title}`);
    
    // You can add more setup here like:
    // - Creating test users
    // - Setting up test data
    // - Warming up the application
    
  } catch (error) {
    console.error('❌ Global setup failed:', error);
    throw error;
  } finally {
    await context.close();
    await browser.close();
  }
  
  console.log('✅ Global setup completed');
}

export default globalSetup;