import { test, expect } from '@playwright/test';

test('PSSP has CyberCorrect title and theme', async ({ page }) => {
  await page.goto('/');
  
  // Check title contains CyberCorrect or Privacy Self-Service Portal
  await expect(page).toHaveTitle(/CyberCorrect|Privacy Self-Service Portal/i);
  
  // Check that CSS custom properties are defined
  const primaryColor = await page.evaluate(() => 
    getComputedStyle(document.documentElement).getPropertyValue('--cc-primary')
  );
  expect(primaryColor.trim()).toBeTruthy();
  
  // Check that theme is applied
  const bodyBg = await page.evaluate(() => 
    getComputedStyle(document.body).backgroundColor
  );
  expect(bodyBg).toBeTruthy();
});

test('Privacy portal functionality', async ({ page }) => {
  await page.goto('/privacy');
  
  // Should have privacy dashboard content
  await expect(page.locator('h1')).toContainText(/Privacy|Dashboard/i);
  
  // Should have navigation elements
  await expect(page.locator('nav')).toBeVisible();
});

test('Data rights portal accessibility', async ({ page }) => {
  await page.goto('/data-rights');
  
  // Should have accessible headings
  await expect(page.locator('h1')).toBeVisible();
  
  // Should have proper semantic structure
  await expect(page.locator('main')).toBeVisible();
});