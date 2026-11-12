export type TestAccount = {
  name: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export const testAccount = {
  name: 'Playwright Learner',
  password: 'BeginnerTest123!',
  firstName: 'Playwright',
  lastName: 'Learner',
};

export function createUniqueEmail(): string {
  return `playwright-${Date.now()}@example.com`;
}
