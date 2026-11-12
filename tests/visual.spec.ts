import { test, expect } from '@playwright/test';

test('the home page header matches its visual baseline', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#header')).toHaveScreenshot('home-header.png');
});
