import type { Locator, Page } from '@playwright/test';

export class CartPage {
  constructor(private readonly page: Page) {}

  productRow(productName: string): Locator {
    return this.page.locator('#cart_info_table tbody tr').filter({ hasText: productName });
  }

  async removeProduct(productName: string): Promise<void> {
    await this.productRow(productName).locator('.cart_quantity_delete').click();
  }

  async proceedToCheckout(): Promise<void> {
    await this.page.getByText('Proceed To Checkout').click();
  }
}
