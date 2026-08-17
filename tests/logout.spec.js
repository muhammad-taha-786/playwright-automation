const { test, expect } = require('@playwright/test');

const LoginPage = require('../Pages/LoginPage');
const Logout = require('../Pages/logout');

const LogoutData = require('../testdata/logout.json');


// ========================================
// Logout Test
// ========================================

test('Logout Test Case', async ({ page }) => {


    // ========================================
    // Create Page Objects
    // ========================================

    const login = new LoginPage(page);

    const logout = new Logout(page);


    // ========================================
    // 1. Open SauceDemo
    // ========================================

    await login.gotoURL();


    // ========================================
    // 2. Login
    // ========================================

    await login.login(
        LogoutData.username,
        LogoutData.password
    );


    // ========================================
    // 3. Verify Products Page
    // ========================================

    await expect(page.locator('.title'))
        .toHaveText('Products');


    // ========================================
    // 4. Logout
    // ========================================

    await logout.logout();


    // ========================================
    // 5. Verify Login Page
    // ========================================

    const loginPageDisplayed =
        await logout.isLoginPageDisplayed();

    expect(loginPageDisplayed)
        .toBe(true);

});