import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { createUniqueEmail, testAccount } from '../testdata/account';

test('a user can register, log in, log out, and delete their account', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const account = { ...testAccount, email: createUniqueEmail() };

  await page.goto('/');
  await page.getByRole('link', { name: /Signup \/ Login/ }).click();
  await loginPage.signUp(account);

  await expect(page.getByText('Account Created!', { exact: true })).toBeVisible();
  await page.getByRole('link', { name: 'Continue' }).click();
  await expect(page.getByText(`Logged in as ${account.name}`)).toBeVisible();

  await loginPage.logOut();
  await loginPage.logIn(account.email, account.password);
  await expect(page.getByText(`Logged in as ${account.name}`)).toBeVisible();

  await loginPage.deleteAccount();
  await expect(page.getByText('Account Deleted!', { exact: true })).toBeVisible();
});
