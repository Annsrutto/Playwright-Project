import { test, expect } from '@playwright/test';

test('should login successfully with valid credentials', async ({ page }) => {

  await page.goto('https://opensource-demo.orangehrmlive.com/');

  // fill in the username field
  await page.getByPlaceholder('Username').fill('Admin');

  // fill in the password field
  await page.getByPlaceholder('Password').fill('admin123');

  // click the login button
  await page.getByRole('button', { name: 'Login' }).click();

  // verify dashboard is displayed after login
  await expect(page).toHaveURL(/dashboard/);

  // verify dashboard heading is visible
  await expect(page.getByRole('heading', { name: 'Dashboard' }))
    .toBeVisible();
});


test('Invalid login credentials', async ({ page }) => {

  await page.goto('https://opensource-demo.orangehrmlive.com/');

  // fill in the username field
  await page.getByPlaceholder('Username').fill('Admin');

  // fill in the password field with an invalid password
  await page.getByPlaceholder('Password').fill('admin123456');

  // click the login button
  await page.getByRole('button', { name: 'Login' }).click();

  // verify invalid credentials message appears
  await expect(page.getByText('Invalid credentials'))
    .toBeVisible();
});
