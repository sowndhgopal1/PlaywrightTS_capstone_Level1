import type { Page } from '@playwright/test';

export class ContactPage {
  constructor(private readonly page: Page) {}

  async open(): Promise<void> {
    await this.page.goto('/contact_us');
  }

  async submitForm(name: string, email: string, subject: string, message: string): Promise<void> {
    await this.page.getByPlaceholder('Name').fill(name);
    await this.page.getByPlaceholder('Email', { exact: true }).fill(email);
    await this.page.getByPlaceholder('Subject').fill(subject);
    await this.page.getByPlaceholder('Your Message Here').fill(message);
    await this.page.getByRole('button', { name: 'Submit' }).click();
  }
}
