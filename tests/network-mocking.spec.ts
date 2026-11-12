import { test, expect } from '@playwright/test';

test('the browser can use a mocked product API response', async ({ page }) => {
  const mockResponse = {
    products: [{ id: 101, name: 'Mock Product', price: 99 }],
  };

  await page.route('**/api/productsList', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(mockResponse),
    });
  });

  await page.goto('/');
  const result = await page.evaluate(async () => {
    const response = await fetch('/api/productsList');
    return response.json();
  });

  expect(result).toEqual(mockResponse);
});
