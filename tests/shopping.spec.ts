import { test, expect } from '@playwright/test';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { createUniqueEmail, testAccount } from '../testdata/account';

const products = [
  { searchTerm: 'Blue Top', productName: 'Blue Top' },
  { searchTerm: 'Men Tshirt', productName: 'Men Tshirt' },
];

for (const product of products) {
  test(`search for ${product.productName} and remove it from the cart`, async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    await productsPage.open();
    await productsPage.searchFor(product.searchTerm);
    await expect(productsPage.productCard(product.productName)).toBeVisible();

    await productsPage.addFirstProductToCart();
    await productsPage.openCartFromConfirmation();
    await expect(cartPage.productRow(product.productName)).toBeVisible();

    await cartPage.removeProduct(product.productName);
    await expect(page.getByText('Cart is empty!')).toBeVisible();
  });
}

test('a signed-in customer can complete a checkout and place an order', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);
  const account = { ...testAccount, email: createUniqueEmail() };

  await page.goto('/');
  await page.getByRole('link', { name: /Signup \/ Login/ }).click();
  await loginPage.signUp(account);
  await page.getByRole('link', { name: 'Continue' }).click();

  await productsPage.open();
  await productsPage.addFirstProductToCart();
  await productsPage.openCartFromConfirmation();
  await cartPage.proceedToCheckout();

  await expect(page.getByText('Address Details')).toBeVisible();
  await checkoutPage.continueToPayment();
  await checkoutPage.placeOrder();

  await expect(page.getByText('Order Placed!', { exact: true })).toBeVisible();
});
