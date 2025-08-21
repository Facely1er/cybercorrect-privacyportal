// Test utilities and helpers
import { Page, expect, Locator } from '@playwright/test';

export class PageHelper {
  constructor(public page: Page) {}

  /**
   * Wait for the page to be fully loaded
   */
  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForSelector('body');
  }

  /**
   * Check for accessibility violations
   */
  async checkAccessibility(): Promise<void> {
    // Check for basic accessibility requirements
    const headings = await this.page.locator('h1, h2, h3, h4, h5, h6').count();
    expect(headings).toBeGreaterThan(0);

    // Check for alt text on images
    const images = await this.page.locator('img').all();
    for (const img of images) {
      const alt = await img.getAttribute('alt');
      expect(alt).toBeTruthy();
    }

    // Check for form labels
    const inputs = await this.page.locator('input[type="text"], input[type="email"], input[type="password"], textarea').all();
    for (const input of inputs) {
      const id = await input.getAttribute('id');
      const ariaLabel = await input.getAttribute('aria-label');
      const ariaLabelledBy = await input.getAttribute('aria-labelledby');
      
      if (id) {
        const label = await this.page.locator(`label[for="${id}"]`).count();
        expect(label > 0 || ariaLabel || ariaLabelledBy).toBeTruthy();
      } else {
        expect(ariaLabel || ariaLabelledBy).toBeTruthy();
      }
    }
  }

  /**
   * Check for performance issues
   */
  async checkPerformance(): Promise<void> {
    const performanceEntries = await this.page.evaluate(() => {
      return JSON.parse(JSON.stringify(performance.getEntriesByType('navigation')));
    });

    const navigation = performanceEntries[0] as PerformanceNavigationTiming;
    
    // Check load time (should be under 3 seconds)
    const loadTime = navigation.loadEventEnd - navigation.navigationStart;
    expect(loadTime).toBeLessThan(3000);

    // Check TTFB (should be under 800ms)
    const ttfb = navigation.responseStart - navigation.navigationStart;
    expect(ttfb).toBeLessThan(800);

    // Check DOM content loaded (should be under 2 seconds)
    const domContentLoaded = navigation.domContentLoadedEventEnd - navigation.navigationStart;
    expect(domContentLoaded).toBeLessThan(2000);
  }

  /**
   * Check for console errors
   */
  async checkConsoleErrors(): Promise<void> {
    const errors: string[] = [];
    
    this.page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    // Wait a bit for any console errors to appear
    await this.page.waitForTimeout(1000);
    
    expect(errors).toHaveLength(0);
  }

  /**
   * Take a screenshot with a descriptive name
   */
  async takeScreenshot(name: string): Promise<void> {
    await this.page.screenshot({ 
      path: `test-results/screenshots/${name}-${Date.now()}.png`,
      fullPage: true 
    });
  }

  /**
   * Check if an element is visible and clickable
   */
  async isElementReady(selector: string): Promise<boolean> {
    try {
      const element = this.page.locator(selector);
      await element.waitFor({ state: 'visible', timeout: 5000 });
      return await element.isEnabled();
    } catch {
      return false;
    }
  }

  /**
   * Fill a form field safely
   */
  async fillField(selector: string, value: string): Promise<void> {
    const field = this.page.locator(selector);
    await field.waitFor({ state: 'visible' });
    await field.clear();
    await field.fill(value);
    
    // Verify the value was set
    const actualValue = await field.inputValue();
    expect(actualValue).toBe(value);
  }

  /**
   * Click an element safely
   */
  async clickElement(selector: string): Promise<void> {
    const element = this.page.locator(selector);
    await element.waitFor({ state: 'visible' });
    await element.waitFor({ state: 'attached' });
    await expect(element).toBeEnabled();
    await element.click();
  }

  /**
   * Wait for navigation after an action
   */
  async clickAndWaitForNavigation(selector: string): Promise<void> {
    await Promise.all([
      this.page.waitForNavigation(),
      this.clickElement(selector)
    ]);
  }

  /**
   * Check for specific brand elements
   */
  async checkBrandElements(brandName: string = 'CyberCorrect'): Promise<void> {
    // Check title contains brand name
    const title = await this.page.title();
    expect(title).toContain(brandName);

    // Check for logo presence
    const logo = this.page.locator('[data-testid="logo"], .logo, img[alt*="logo" i]');
    await expect(logo.first()).toBeVisible();

    // Check for brand colors in CSS
    const primaryColor = await this.page.evaluate(() => 
      getComputedStyle(document.documentElement).getPropertyValue('--cc-primary')
    );
    expect(primaryColor.trim()).toBeTruthy();
  }

  /**
   * Test responsive design
   */
  async testResponsiveDesign(): Promise<void> {
    const viewports = [
      { width: 320, height: 568 }, // Mobile
      { width: 768, height: 1024 }, // Tablet
      { width: 1024, height: 768 }, // Desktop small
      { width: 1920, height: 1080 }, // Desktop large
    ];

    for (const viewport of viewports) {
      await this.page.setViewportSize(viewport);
      await this.page.waitForTimeout(500); // Allow for responsive adjustments
      
      // Check that content is still visible and accessible
      const body = this.page.locator('body');
      await expect(body).toBeVisible();
      
      // Check that navigation is accessible
      const nav = this.page.locator('nav, [role="navigation"]');
      if (await nav.count() > 0) {
        await expect(nav.first()).toBeVisible();
      }
    }
  }
}

/**
 * Custom matchers for common assertions
 */
export const customMatchers = {
  async toBeAccessible(locator: Locator) {
    // Check for ARIA attributes
    const role = await locator.getAttribute('role');
    const ariaLabel = await locator.getAttribute('aria-label');
    const ariaLabelledBy = await locator.getAttribute('aria-labelledby');
    
    expect(role || ariaLabel || ariaLabelledBy).toBeTruthy();
    return { pass: true, message: () => 'Element is accessible' };
  },

  async toHaveNoConsoleErrors(page: Page) {
    const errors: string[] = [];
    
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    await page.waitForTimeout(1000);
    
    expect(errors).toHaveLength(0);
    return { pass: true, message: () => 'No console errors found' };
  }
};

/**
 * Mock data for testing
 */
export const mockData = {
  user: {
    email: 'test@example.com',
    password: 'TestPassword123!',
    name: 'Test User',
  },
  
  dataRequest: {
    type: 'access',
    description: 'I would like to access my personal data',
    urgency: 'normal',
  },
  
  incident: {
    title: 'Test Privacy Incident',
    description: 'This is a test incident for automated testing',
    severity: 'low',
    category: 'data_breach',
  }
};

/**
 * Test data cleanup utility
 */
export class TestDataManager {
  private createdItems: Array<{ type: string; id: string }> = [];

  addCreatedItem(type: string, id: string): void {
    this.createdItems.push({ type, id });
  }

  async cleanup(): Promise<void> {
    // Clean up test data in reverse order
    for (const item of this.createdItems.reverse()) {
      try {
        // Implement cleanup logic based on item type
        console.log(`Cleaning up ${item.type} with ID ${item.id}`);
      } catch (error) {
        console.warn(`Failed to clean up ${item.type} ${item.id}:`, error);
      }
    }
    this.createdItems = [];
  }
}