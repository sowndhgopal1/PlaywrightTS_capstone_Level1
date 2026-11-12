import { test, expect } from '@playwright/test';
import { ContactPage } from '../pages/ContactPage';

test('Contact Us form rejects an invalid email and accepts valid details', async ({ page }) => {
  const contactPage = new ContactPage(page);

  await contactPage.open();
  await page.waitForFunction(() => 'jQuery' in window);

  const emailField = page.getByPlaceholder('Email', { exact: true });
  await emailField.fill('not-an-email');
  await page.getByPlaceholder('Name').fill('Playwright Learner');
  await page.getByPlaceholder('Subject').fill('Capstone feedback');
  await page.getByPlaceholder('Your Message Here').fill('Testing contact form validation.');
  await page.getByRole('button', { name: 'Submit' }).click();

  const emailIsInvalid = await emailField.evaluate((input: HTMLInputElement) =>
    input.validity.typeMismatch,
  );
  expect(emailIsInvalid).toBe(true);
  await expect(page.locator('#form-section form')).toBeVisible();

  page.once('dialog', async (dialog) => {
    await dialog.accept();
  });
  await contactPage.submitForm(
    'Playwright Learner',
    'learner@example.com',
    'Capstone feedback',
    'This is a test message from the beginner Playwright project.',
  );

  await expect(page.locator('#contact-page .status.alert-success')).toHaveText(
    'Success! Your details have been submitted successfully.',
  );
  await expect(page.locator('#form-section a[href="/"]')).toBeVisible();
});
