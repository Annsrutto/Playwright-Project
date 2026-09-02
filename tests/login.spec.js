import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('OrangeHRM login', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Navigate to the login page before each independent test.
    await loginPage.navigateToLoginPage();
  });

  test('should login successfully with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Enter valid credentials and submit the login form.
    await loginPage.login('Admin', 'admin123');

    // Verify the user is redirected to the dashboard.
    await expect(page).toHaveURL(/dashboard/);

    // Verify the dashboard heading is visible after login.
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  });

  test('should show an error for invalid login credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Enter an invalid password and submit the login form.
    await loginPage.login('Admin', 'admin123456');

    // Verify the invalid credentials message is displayed.
    await expect(loginPage.getInvalidCredentialsMessage()).toBeVisible();
  });

  test('should show required errors when credentials are empty', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Submit the empty login form.
    await loginPage.login('', '');

    // Verify both required field messages are displayed.
    await expect(loginPage.getRequiredFieldErrors()).toHaveCount(2);
  });
});
