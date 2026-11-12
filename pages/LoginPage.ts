import type { Page } from '@playwright/test';
import type { TestAccount } from '../testdata/account';

export class LoginPage {
  constructor(private readonly page: Page) {}

  async signUp(account: TestAccount): Promise<void> {
    await this.page.locator('input[data-qa="signup-name"]').fill(account.name);
    await this.page.locator('input[data-qa="signup-email"]').fill(account.email);
    await this.page.locator('button[data-qa="signup-button"]').click();

    await this.page.locator('#id_gender1').check();
    await this.page.locator('#password').fill(account.password);
    await this.page.locator('#days').selectOption('10');
    await this.page.locator('#months').selectOption('5');
    await this.page.locator('#years').selectOption('1995');
    await this.page.locator('#first_name').fill(account.firstName);
    await this.page.locator('#last_name').fill(account.lastName);
    await this.page.locator('#address1').fill('123 Test Street');
    await this.page.locator('#country').selectOption({ label: 'Canada' });
    await this.page.locator('#state').fill('Ontario');
    await this.page.locator('#city').fill('Toronto');
    await this.page.locator('#zipcode').fill('M5V 2T6');
    await this.page.locator('#mobile_number').fill('4165550123');
    await this.page.locator('button[data-qa="create-account"]').click();
  }

  async logIn(email: string, password: string): Promise<void> {
    await this.page.locator('input[data-qa="login-email"]').fill(email);
    await this.page.locator('input[data-qa="login-password"]').fill(password);
    await this.page.locator('button[data-qa="login-button"]').click();
  }

  async logOut(): Promise<void> {
    await this.page.getByRole('link', { name: /Logout/ }).click();
  }

  async deleteAccount(): Promise<void> {
    await this.page.getByRole('link', { name: /Delete Account/ }).click();
  }
}
