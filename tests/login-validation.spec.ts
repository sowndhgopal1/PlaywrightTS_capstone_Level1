import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('invalid login details show an error message', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await page.goto('/login');
  await loginPage.logIn('not-a-real-user@example.com', 'wrong-password');

  await expect(page.getByText('Your email or password is incorrect!')).toBeVisible();
});
