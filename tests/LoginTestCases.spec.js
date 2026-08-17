import { test, expect } from '@playwright/test';

// TC01 - Valid Login
test('TC01 - Valid Login', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    await expect(page.locator('.app_logo')).toHaveText('Swag Labs');
});

// TC02 - Invalid Username
test('TC02 - Invalid Username', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', 'standard_user12');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    await expect(page.locator('[data-test="error"]'))
        .toContainText('Username and password do not match');
});

// TC03 - Invalid Password
test('TC03 - Invalid Password', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce12');
    await page.click('#login-button');

    await expect(page.locator('[data-test="error"]'))
        .toContainText('Username and password do not match');
});

// TC04 - Invalid Username & Password
test('TC04 - Invalid Username and Password', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', 'standard_user1');
    await page.fill('#password', 'secret_sauce1');
    await page.click('#login-button');

    await expect(page.locator('[data-test="error"]'))
        .toContainText('Username and password do not match');
});

// TC05 - Empty Username & Password
test('TC05 - Empty Username and Password', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.click('#login-button');

    await expect(page.locator('[data-test="error"]'))
        .toContainText('Username is required');
});