# Simple project overview

## Slide 1 - Goal

Test the Automation Exercise demo store with 10 easy-to-follow Playwright tests.

## Slide 2 - How a test is organized

1. `page.goto()` opens the application.
2. A locator finds a button, link, or field.
3. `.fill()` or `.click()` performs an action.
4. `expect()` checks the result.

Tests use Playwright's built-in `page` fixture. Small page objects keep repeated account actions together, like the Page Object Model used in Selenium.

## Slide 3 - Coverage

- Account signup, login, logout, and deletion
- Product search, cart removal, and checkout
- Contact form and invalid login
- Product details
- Mock API, accessibility, and screenshot checks

## Slide 4 - Running and debugging

Run `npm test` to run the 10 cases in Chromium. Use `npm run test:report` to open the HTML report. Screenshots and traces are saved when a test fails.

## Slide 5 - Decisions and next steps

The application URL and browser are set directly in `playwright.config.ts`. The demo site has a known orange-link contrast issue, so the accessibility example checks the rest of the header.
