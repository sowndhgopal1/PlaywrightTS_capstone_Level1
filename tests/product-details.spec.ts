import { test, expect } from '@playwright/test';
import { ProductsPage } from '../pages/ProductsPage';

test('a product details page shows the product name and price', async ({ page }) => {
  const productsPage = new ProductsPage(page);
  await productsPage.openProductDetails(1);

  await expect(page.locator('.product-information h2')).toHaveText('Blue Top');
  await expect(page.locator('.product-information')).toContainText('Rs. 500');
});
