import { test, expect } from '@playwright/test';
import { PageHelper, mockData } from '../helpers/test-utils';

test.describe('Homepage', () => {
  let pageHelper: PageHelper;

  test.beforeEach(async ({ page }) => {
    pageHelper = new PageHelper(page);
    await page.goto('/');
    await pageHelper.waitForPageLoad();
  });

  test('should load successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/CyberCorrect|Privacy Self-Service Portal/i);
    
    // Check main heading is visible
    const mainHeading = page.locator('h1').first();
    await expect(mainHeading).toBeVisible();
    
    // Check navigation is present
    const nav = page.locator('nav, [role="navigation"]');
    await expect(nav.first()).toBeVisible();
  });

  test('should have proper SEO elements', async ({ page }) => {
    // Check meta description
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute('content', /.+/);
    
    // Check meta keywords if present
    const metaKeywords = page.locator('meta[name="keywords"]');
    if (await metaKeywords.count() > 0) {
      await expect(metaKeywords).toHaveAttribute('content', /.+/);
    }
    
    // Check canonical URL if present
    const canonical = page.locator('link[rel="canonical"]');
    if (await canonical.count() > 0) {
      await expect(canonical).toHaveAttribute('href', /.+/);
    }
  });

  test('should be accessible', async ({ page }) => {
    await pageHelper.checkAccessibility();
  });

  test('should perform well', async ({ page }) => {
    await pageHelper.checkPerformance();
  });

  test('should have no console errors', async ({ page }) => {
    await pageHelper.checkConsoleErrors();
  });

  test('should display brand elements correctly', async ({ page }) => {
    await pageHelper.checkBrandElements();
  });

  test('should be responsive', async ({ page }) => {
    await pageHelper.testResponsiveDesign();
  });

  test('should have working navigation links', async ({ page }) => {
    const navLinks = page.locator('nav a, [role="navigation"] a');
    const linkCount = await navLinks.count();
    
    expect(linkCount).toBeGreaterThan(0);
    
    // Check first few links are clickable
    for (let i = 0; i < Math.min(3, linkCount); i++) {
      const link = navLinks.nth(i);
      await expect(link).toBeVisible();
      await expect(link).toHaveAttribute('href', /.+/);
    }
  });

  test('should have call-to-action buttons', async ({ page }) => {
    // Look for common CTA patterns
    const ctaButtons = page.locator('button:has-text("Get Started"), button:has-text("Sign Up"), button:has-text("Learn More"), a:has-text("Get Started"), a:has-text("Sign Up")');
    
    const buttonCount = await ctaButtons.count();
    expect(buttonCount).toBeGreaterThan(0);
    
    // Check first CTA is visible and clickable
    if (buttonCount > 0) {
      const firstCta = ctaButtons.first();
      await expect(firstCta).toBeVisible();
      await expect(firstCta).toBeEnabled();
    }
  });

  test('should load external resources correctly', async ({ page }) => {
    // Check for failed network requests
    const failedRequests: string[] = [];
    
    page.on('requestfailed', (request) => {
      failedRequests.push(request.url());
    });
    
    await page.reload();
    await pageHelper.waitForPageLoad();
    
    // Allow some time for all resources to load
    await page.waitForTimeout(2000);
    
    // Filter out expected failures (like analytics that might be blocked)
    const criticalFailures = failedRequests.filter(url => 
      !url.includes('google-analytics') && 
      !url.includes('googletagmanager') &&
      !url.includes('facebook') &&
      !url.includes('twitter')
    );
    
    expect(criticalFailures).toHaveLength(0);
  });

  test('should handle offline scenario gracefully', async ({ page, context }) => {
    // Set offline mode
    await context.setOffline(true);
    
    // Try to navigate
    const response = await page.goto('/', { waitUntil: 'networkidle', timeout: 10000 }).catch(() => null);
    
    if (response) {
      // If page loads offline, check for offline indicator
      const offlineIndicator = page.locator('[data-testid="offline-indicator"], .offline-indicator, :has-text("offline" i)');
      
      // Either page should show offline indicator or fail to load
      const hasOfflineIndicator = await offlineIndicator.count() > 0;
      expect(hasOfflineIndicator || response.status() >= 400).toBeTruthy();
    }
    
    // Restore online mode
    await context.setOffline(false);
  });
});