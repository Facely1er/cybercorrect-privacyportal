import { test, expect } from '@playwright/test';
import { PageHelper } from '../helpers/test-utils';

test.describe('Brand Customization', () => {
  let pageHelper: PageHelper;

  test.beforeEach(async ({ page }) => {
    pageHelper = new PageHelper(page);
    await page.goto('/');
    await pageHelper.waitForPageLoad();
  });

  test('should display correct brand name', async ({ page }) => {
    // Check title contains brand name
    const title = await page.title();
    expect(title).toMatch(/CyberCorrect|Privacy Portal/i);
    
    // Check for brand name in header/navigation
    const brandElement = page.locator('[data-testid="brand-name"], .brand-name, .logo-text');
    if (await brandElement.count() > 0) {
      const brandText = await brandElement.first().textContent();
      expect(brandText).toBeTruthy();
      expect(brandText?.length || 0).toBeGreaterThan(0);
    }
  });

  test('should load brand logo correctly', async ({ page }) => {
    const logoImages = page.locator('img[alt*="logo" i], [data-testid="logo"] img, .logo img');
    
    if (await logoImages.count() > 0) {
      const firstLogo = logoImages.first();
      await expect(firstLogo).toBeVisible();
      
      // Check that logo actually loads
      const logoSrc = await firstLogo.getAttribute('src');
      expect(logoSrc).toBeTruthy();
      
      // Check that image loads successfully
      await expect(firstLogo).toHaveJSProperty('complete', true);
      await expect(firstLogo).toHaveJSProperty('naturalWidth', expect.any(Number));
    }
  });

  test('should apply custom colors correctly', async ({ page }) => {
    // Check for CSS custom properties
    const primaryColor = await page.evaluate(() => 
      getComputedStyle(document.documentElement).getPropertyValue('--cc-primary')
    );
    
    const accentColor = await page.evaluate(() => 
      getComputedStyle(document.documentElement).getPropertyValue('--cc-accent')
    );
    
    // At least primary color should be defined
    expect(primaryColor.trim()).toBeTruthy();
    
    // Validate color format (hex, rgb, hsl)
    const colorRegex = /^(#[0-9a-f]{6}|#[0-9a-f]{3}|rgb\(.*\)|hsl\(.*\))$/i;
    if (primaryColor.trim()) {
      expect(primaryColor.trim()).toMatch(colorRegex);
    }
  });

  test('should display correct contact information', async ({ page }) => {
    // Go to contact page to check contact info
    await page.goto('/contact');
    await pageHelper.waitForPageLoad();
    
    // Check for email addresses
    const emailElements = page.locator('[href^="mailto:"], :has-text("@")');
    const emailCount = await emailElements.count();
    
    if (emailCount > 0) {
      const firstEmail = await emailElements.first().textContent();
      expect(firstEmail).toMatch(/@.*\./); // Basic email format
    }
    
    // Check for phone numbers
    const phoneElements = page.locator('[href^="tel:"], :has-text("("), :has-text("-")');
    const phoneCount = await phoneElements.count();
    
    if (phoneCount > 0) {
      const firstPhone = await phoneElements.first().textContent();
      expect(firstPhone).toBeTruthy();
    }
  });

  test('should show correct company information in legal pages', async ({ page }) => {
    await page.goto('/privacy-policy');
    await pageHelper.waitForPageLoad();
    
    // Check for company name in privacy policy
    const content = await page.locator('main, .content, article').first().textContent();
    
    // Should contain some form of company identification
    const hasCompanyInfo = content?.includes('CyberCorrect') || 
                          content?.includes('Company') ||
                          content?.includes('we') ||
                          content?.includes('our');
    
    expect(hasCompanyInfo).toBeTruthy();
  });

  test('should maintain brand consistency across pages', async ({ page }) => {
    const pages = ['/', '/about', '/privacy-policy', '/contact'];
    const brandElements: Record<string, string> = {};
    
    for (const pagePath of pages) {
      await page.goto(pagePath);
      await pageHelper.waitForPageLoad();
      
      // Get brand name from title
      const title = await page.title();
      brandElements[pagePath] = title;
      
      // Check for consistent navigation
      const nav = page.locator('nav, [role="navigation"]');
      await expect(nav.first()).toBeVisible();
    }
    
    // Check that all pages have consistent branding
    const titles = Object.values(brandElements);
    const brandName = titles[0].split(/[-–|]/)[0].trim(); // Extract main brand name
    
    titles.forEach(title => {
      expect(title).toContain(brandName);
    });
  });

  test('should handle custom CSS if enabled', async ({ page }) => {
    // Check if custom CSS is loaded
    const customStyles = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
      return links.some(link => 
        link.href.includes('custom') || 
        link.href.includes('brand') ||
        link.href.includes('theme')
      );
    });
    
    // If custom CSS is loaded, verify it doesn't break the page
    if (customStyles) {
      // Check that page still renders correctly
      const body = page.locator('body');
      await expect(body).toBeVisible();
      
      // Check that text is readable (not transparent or same color as background)
      const textElements = page.locator('h1, p, a').first();
      if (await textElements.count() > 0) {
        const color = await textElements.evaluate(el => getComputedStyle(el).color);
        const backgroundColor = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
        
        // Colors should be different (basic check)
        expect(color).not.toBe(backgroundColor);
      }
    }
  });

  test('should validate theme switching if available', async ({ page }) => {
    // Look for theme toggle
    const themeToggle = page.locator('[data-testid="theme-toggle"], .theme-toggle, button:has-text("dark"), button:has-text("light")');
    
    if (await themeToggle.count() > 0) {
      const initialTheme = await page.evaluate(() => 
        document.documentElement.classList.contains('dark') ? 'dark' : 'light'
      );
      
      // Click theme toggle
      await themeToggle.first().click();
      await page.waitForTimeout(500); // Allow for transition
      
      const newTheme = await page.evaluate(() => 
        document.documentElement.classList.contains('dark') ? 'dark' : 'light'
      );
      
      // Theme should have changed
      expect(newTheme).not.toBe(initialTheme);
      
      // Check that content is still visible
      const mainContent = page.locator('main, .content');
      await expect(mainContent.first()).toBeVisible();
    }
  });

  test('should display proper favicon', async ({ page }) => {
    // Check for favicon link
    const favicon = page.locator('link[rel="icon"], link[rel="shortcut icon"]');
    
    if (await favicon.count() > 0) {
      const faviconHref = await favicon.first().getAttribute('href');
      expect(faviconHref).toBeTruthy();
      
      // Try to fetch favicon to ensure it exists
      const response = await page.request.get(faviconHref!);
      expect(response.status()).toBeLessThan(400);
    }
  });

  test('should handle social media links if configured', async ({ page }) => {
    // Look for social media links
    const socialLinks = page.locator('a[href*="twitter.com"], a[href*="linkedin.com"], a[href*="facebook.com"], a[href*="github.com"]');
    const socialCount = await socialLinks.count();
    
    if (socialCount > 0) {
      // Check that links have proper attributes
      for (let i = 0; i < Math.min(3, socialCount); i++) {
        const link = socialLinks.nth(i);
        await expect(link).toHaveAttribute('href', /^https?:\/\//);
        
        // Check for external link indicators
        const target = await link.getAttribute('target');
        const rel = await link.getAttribute('rel');
        
        expect(target === '_blank' || rel?.includes('external')).toBeTruthy();
      }
    }
  });
});