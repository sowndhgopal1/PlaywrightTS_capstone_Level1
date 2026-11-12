import type { Locator, Page } from '@playwright/test';

export class ProductsPage {
  constructor(private readonly page: Page) {}

  async open(): Promise<void> {
    await this.page.goto('/products');
  }

  async openProductDetails(productId: number): Promise<void> {
    await this.page.goto(`/product_details/${productId}`);
  }

  async searchFor(productName: string): Promise<void> {
    await this.page.getByPlaceholder('Search Product').fill(productName);
    await this.page.locator('#submit_search').click();
  }

  productCard(productName: string): Locator {
    return this.page.locator('.product-image-wrapper').filter({ hasText: productName }).first();
  }

  async addFirstProductToCart(): Promise<void> {
    await this.page.locator('.product-image-wrapper').first().locator('a.add-to-cart').first().click();
    await this.page.locator('#cartModal.show').waitFor({ state: 'visible' });
  }

  async openCartFromConfirmation(): Promise<void> {
    await this.page.getByRole('link', { name: 'View Cart' }).click();
  }
}
