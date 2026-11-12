import AxeBuilder from '@axe-core/playwright';
import { test, expect } from '@playwright/test';

test('the site header has no accessibility issues except its known contrast issue', async ({ page }) => {
  await page.goto('/');

  const results = await new AxeBuilder({ page })
    .include('#header')
    .disableRules(['color-contrast'])
    .analyze();

  expect(results.violations).toEqual([]);
});
