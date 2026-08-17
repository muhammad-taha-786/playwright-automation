const { test, expect } = require('@playwright/test');

const LoginPage = require('../Pages/LoginPage');
const LoginData = require('../testdata/LogintestData.json');


// 1. Valid Login

test('Login Test Case using Valid User', async ({ page }) => {

    const login = new LoginPage(page);

    const data = LoginData.validUsers[0];

    await login.gotoURL();

    await login.login(
        data.username,
        data.password
    );

    await expect(page.locator('.title'))
        .toHaveText('Products');
});


// 2. Locked Out User

test('Login Test Case using Locked Out User', async ({ page }) => {

    const login = new LoginPage(page);

    const data = LoginData.lockedOutUsers[0];

    await login.gotoURL();

    await login.login(
        data.username,
        data.password
    );

    await expect(login.errorMessage)
        .toContainText(data.expectedMessage);
});


// 3. Invalid Credentials

test('Login Test Case using Invalid Credentials', async ({ page }) => {

    const login = new LoginPage(page);

    const data = LoginData.invalidUsers[0];

    await login.gotoURL();

    await login.login(
        data.username,
        data.password
    );

    await expect(login.errorMessage)
        .toContainText(data.expectedMessage);
});