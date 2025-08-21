import { test, expect } from '@playwright/test';
import { PageHelper, mockData } from '../helpers/test-utils';

test.describe('Privacy Portal', () => {
  let pageHelper: PageHelper;

  test.beforeEach(async ({ page }) => {
    pageHelper = new PageHelper(page);
  });

  test.describe('Data Rights Exercise', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/data-rights');
      await pageHelper.waitForPageLoad();
    });

    test('should load data rights page', async ({ page }) => {
      await expect(page).toHaveTitle(/Data Rights|Privacy/i);
      
      const heading = page.locator('h1');
      await expect(heading).toBeVisible();
      await expect(heading).toContainText(/Data Rights|Exercise|Request/i);
    });

    test('should display available request types', async ({ page }) => {
      // Check for common data rights request types
      const requestTypes = [
        'Access',
        'Correction',
        'Deletion',
        'Portability',
        'Opt-out'
      ];

      for (const type of requestTypes) {
        const typeElement = page.locator(`:has-text("${type}")`, { hasText: new RegExp(type, 'i') });
        await expect(typeElement.first()).toBeVisible();
      }
    });

    test('should have accessible request forms', async ({ page }) => {
      // Look for form elements
      const forms = page.locator('form');
      const formCount = await forms.count();
      
      if (formCount > 0) {
        const firstForm = forms.first();
        
        // Check form has proper labels
        const inputs = firstForm.locator('input, textarea, select');
        const inputCount = await inputs.count();
        
        for (let i = 0; i < inputCount; i++) {
          const input = inputs.nth(i);
          const id = await input.getAttribute('id');
          const ariaLabel = await input.getAttribute('aria-label');
          const ariaLabelledBy = await input.getAttribute('aria-labelledby');
          
          if (id) {
            const label = page.locator(`label[for="${id}"]`);
            const labelExists = await label.count() > 0;
            expect(labelExists || !!ariaLabel || !!ariaLabelledBy).toBeTruthy();
          }
        }
      }
    });

    test('should validate form inputs', async ({ page }) => {
      // Look for email input
      const emailInput = page.locator('input[type="email"], input[name*="email" i]');
      
      if (await emailInput.count() > 0) {
        await emailInput.first().fill('invalid-email');
        
        // Try to submit or trigger validation
        const submitButton = page.locator('button[type="submit"], button:has-text("Submit")');
        if (await submitButton.count() > 0) {
          await submitButton.first().click();
          
          // Check for validation message
          const validationMessage = page.locator('.error, .invalid, [role="alert"]');
          await expect(validationMessage.first()).toBeVisible({ timeout: 5000 });
        }
      }
    });
  });

  test.describe('Privacy Dashboard', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/privacy/dashboard');
      await pageHelper.waitForPageLoad();
    });

    test('should load privacy dashboard', async ({ page }) => {
      // May require authentication, so check for either dashboard or login
      const isDashboard = await page.locator('h1:has-text("Dashboard")').count() > 0;
      const isLogin = await page.locator('h1:has-text("Login"), h1:has-text("Sign In")').count() > 0;
      
      expect(isDashboard || isLogin).toBeTruthy();
      
      if (isDashboard) {
        // Check dashboard elements
        const dashboardCards = page.locator('.card, .dashboard-item, [data-testid*="card"]');
        expect(await dashboardCards.count()).toBeGreaterThan(0);
      }
    });

    test('should display key metrics if authenticated', async ({ page }) => {
      const metricsElements = page.locator('[data-testid*="metric"], .metric, .stat');
      const hasMetrics = await metricsElements.count() > 0;
      
      if (hasMetrics) {
        // Check first metric is visible
        await expect(metricsElements.first()).toBeVisible();
        
        // Check metrics have values
        const firstMetricValue = await metricsElements.first().textContent();
        expect(firstMetricValue).toBeTruthy();
      }
    });
  });

  test.describe('Stakeholder Duties', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/stakeholder-duties');
      await pageHelper.waitForPageLoad();
    });

    test('should load stakeholder duties page', async ({ page }) => {
      await expect(page).toHaveTitle(/Duties|Stakeholder|Privacy/i);
      
      const heading = page.locator('h1');
      await expect(heading).toBeVisible();
    });

    test('should display stakeholder categories', async ({ page }) => {
      const categories = [
        'Students',
        'Families',
        'Staff',
        'Teachers',
        'Administrators',
        'Privacy Officers'
      ];

      let foundCategories = 0;
      for (const category of categories) {
        const categoryElement = page.locator(`:has-text("${category}")`);
        if (await categoryElement.count() > 0) {
          foundCategories++;
        }
      }
      
      // Expect at least some categories to be found
      expect(foundCategories).toBeGreaterThan(0);
    });
  });

  test.describe('Legal Pages', () => {
    const legalPages = [
      { path: '/privacy-policy', title: 'Privacy Policy' },
      { path: '/terms', title: 'Terms' },
      { path: '/legal', title: 'Legal' }
    ];

    legalPages.forEach(({ path, title }) => {
      test(`should load ${title} page`, async ({ page }) => {
        await page.goto(path);
        await pageHelper.waitForPageLoad();
        
        await expect(page).toHaveTitle(new RegExp(title, 'i'));
        
        const heading = page.locator('h1');
        await expect(heading).toBeVisible();
        
        // Check for substantial content
        const content = page.locator('main, .content, article');
        const contentText = await content.first().textContent();
        expect(contentText?.length || 0).toBeGreaterThan(100);
      });
    });
  });

  test.describe('Contact and Support', () => {
    test('should load contact page', async ({ page }) => {
      await page.goto('/contact');
      await pageHelper.waitForPageLoad();
      
      await expect(page).toHaveTitle(/Contact/i);
      
      // Check for contact information
      const contactInfo = page.locator(':has-text("email"), :has-text("phone"), :has-text("address")');
      expect(await contactInfo.count()).toBeGreaterThan(0);
    });

    test('should load FAQ page', async ({ page }) => {
      await page.goto('/faq');
      await pageHelper.waitForPageLoad();
      
      await expect(page).toHaveTitle(/FAQ|Questions/i);
      
      // Check for FAQ structure
      const faqItems = page.locator('.faq-item, details, [data-testid*="faq"]');
      expect(await faqItems.count()).toBeGreaterThan(0);
    });
  });

  test.describe('Error Handling', () => {
    test('should handle 404 pages gracefully', async ({ page }) => {
      const response = await page.goto('/non-existent-page');
      
      // Should either redirect to home or show 404 page
      const currentUrl = page.url();
      const isHome = currentUrl.endsWith('/') || currentUrl.includes('/home');
      const is404 = response?.status() === 404;
      
      if (is404) {
        // Check for user-friendly 404 content
        const errorMessage = page.locator(':has-text("404"), :has-text("not found"), :has-text("page not found")');
        await expect(errorMessage.first()).toBeVisible();
        
        // Check for navigation back home
        const homeLink = page.locator('a[href="/"], a:has-text("home")');
        expect(await homeLink.count()).toBeGreaterThan(0);
      }
      
      expect(isHome || is404).toBeTruthy();
    });

    test('should maintain functionality during slow network', async ({ page, context }) => {
      // Simulate slow network
      await context.route('**/*', async (route) => {
        await new Promise(resolve => setTimeout(resolve, 1000)); // 1 second delay
        await route.continue();
      });
      
      await page.goto('/');
      await pageHelper.waitForPageLoad();
      
      // Check that basic functionality still works
      const navigation = page.locator('nav a').first();
      if (await navigation.count() > 0) {
        await expect(navigation).toBeVisible();
        await expect(navigation).toBeEnabled();
      }
    });
  });
});