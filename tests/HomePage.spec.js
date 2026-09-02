const { test, expect } = require('@playwright/test');

const LoginPage = require('../Pages/LoginPage');
const HomePage = require('../Pages/HomePage');

const LoginData = require('../testdata/LogintestData.json');
const HomeData = require('../testdata/HomePage.json');


test('Verify Home Products Page', async ({ page }) => {

    // Create Page Objects
    const login = new LoginPage(page);
    const home = new HomePage(page);


    // ==========================================
    // 1. Login
    // ==========================================

    const loginUser = LoginData.validUsers[0];

    await login.gotoLoginPage();

    await login.login(
        loginUser.username,
        loginUser.password
    );


    // Screenshot after login
    await home.attachScreenshot(
        '01 - Home Page Opened'
    );


    // ==========================================
    // 2. Verify Products Page Title
    // ==========================================

    await expect(home.productsTitle)
        .toHaveText(
            HomeData.expectedTitle
        );


    // Screenshot after verifying title
    await home.attachScreenshot(
        '02 - Products Page Title Verified'
    );


    // ==========================================
    // 3. Verify Products Container
    // ==========================================

    const productsVisible =
        await home.isProductsContainerVisible();

    expect(productsVisible)
        .toBe(true);


    // Screenshot after verifying products container
    await home.attachScreenshot(
        '03 - Products Container Verified'
    );


    // ==========================================
    // 4. Verify Product Count
    // ==========================================

    const productCount =
        await home.getProductCount();

    expect(productCount)
        .toBeGreaterThanOrEqual(
            HomeData.minimumProducts
        );


    // Screenshot after verifying product count
    await home.attachScreenshot(
        '04 - Product Count Verified'
    );


    // ==========================================
    // 5. Verify Product Names
    // ==========================================

    const productNames =
        await home.getProductNames();


    for (const product of HomeData.expectedProducts) {

        expect(productNames)
            .toContain(product);

    }


    // Screenshot after verifying product names
    await home.attachScreenshot(
        '05 - Product Names Verified'
    );


    // ==========================================
    // 6. Verify Cart Icon
    // ==========================================

    const cartVisible =
        await home.isCartIconVisible();

    expect(cartVisible)
        .toBe(true);


    // Final Home Page Screenshot
    await home.attachScreenshot(
        '06 - Home Page Test Completed'
    );

});