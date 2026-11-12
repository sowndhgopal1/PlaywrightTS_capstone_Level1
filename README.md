# Beginner Playwright + TypeScript Project

This project tests [Automation Exercise](https://automationexercise.com/) 

## Requirements

- Node.js 18 or newer
- npm

## Run the tests

```bash
npm install
npx playwright install chromium
npm test
```

The project is configured to run exactly 10 tests in Chromium. Each test follows the same basic pattern: open a page, find an element, perform an action, and check the result.

```bash
npm run typecheck
npm run test:headed
npm run test:report
```

The application URL is written directly in `playwright.config.ts` as `baseURL`. To use another site, change that one value.

## The 10 test cases

1. Register, log in, log out, and delete an account — `tests/account.spec.ts`
2. Search for Blue Top and remove it from the cart — `tests/shopping.spec.ts`
3. Search for Men Tshirt and remove it from the cart — `tests/shopping.spec.ts`
4. Complete checkout and place an order — `tests/shopping.spec.ts`
5. Contact Us form rejects an invalid email and accepts valid details — `tests/contact.spec.ts`
6. Mock a product API response — `tests/network-mocking.spec.ts`
7. Check the header for accessibility issues — `tests/accessibility.spec.ts`
8. Compare the header screenshot — `tests/visual.spec.ts`
9. Check the error shown for an invalid login — `tests/login-validation.spec.ts`
10. Check a product's name and price — `tests/product-details.spec.ts`

## A simple Playwright example

```ts
test('invalid login details show an error message', async ({ page }) => {
  await page.goto('/login');
  await page.locator('[data-qa="login-email"]').fill('wrong@example.com');
  await page.locator('[data-qa="login-password"]').fill('wrong-password');
  await page.locator('[data-qa="login-button"]').click();

  await expect(page.getByText('Your email or password is incorrect!')).toBeVisible();
});
```

`page` controls the browser, `locator()` finds an element, `fill()` types into a field, `click()` presses a button, and `expect()` checks the result.

## Where to find things

```text
playwright.config.ts   Test settings, browser, and application URL
pages/                 Page Object Model classes
testdata/account.ts    Example account details
tests/                 The 10 test cases
reports/               HTML report and failure screenshots/traces
```

All 10 test cases are in the `tests` folder. Each test imports Playwright's built-in `page` fixture directly. For example, `await page.goto('/login')` opens the login page, `.fill()` enters text, `.click()` clicks a button, and `expect(...)` checks what happened.

Page objects are small classes used for repeated page actions, like entering account details. Open a file in `pages` to see the Playwright steps behind those actions.

The accessibility test skips color-contrast checking because the demo site's Home link has a known contrast problem. The HTML report opens with `npm run test:report`. If the public demo site says it is under heavy load, wait a little and rerun the tests.

## AI-assisted test creation

Copilot was used as a coding assistant while creating and reviewing this project. It helped draft test ideas and Playwright code, which was then checked and adjusted by running the tests against the website.

This means AI helped us write the tests; it does not mean the tests use AI while they run. The project does not include an AI-powered test, Copilot connection, or MCP integration. Run the tests normally with `npm test`.
