const { test, expect } = require('@playwright/test');

const LoginPage = require('../Pages/LoginPage');
const HomePage = require('../Pages/HomePage');

const LoginData = require('../testdata/LogintestData.json');
const HomeData = require('../testdata/HomePage.json');


// Home / Products Page Test

test('Verify Home Products Page', async ({ page }) => {


    // Create Page Objects

    const login = new LoginPage(page);

    const home = new HomePage(page);


    // 1. Login

    const loginUser = LoginData.validUsers[0];

    await login.gotoURL();

    await login.login(
        loginUser.username,
        loginUser.password
    );


    // 2. Verify Products Page Title

    await expect(home.productsTitle)
        .toHaveText(
            HomeData.expectedTitle
        );


    // 3. Verify Products Container

    const productsVisible =
        await home.isProductsContainerVisible();

    expect(productsVisible)
        .toBe(true);


    // 4. Verify Product Count

    const productCount =
        await home.getProductCount();

    expect(productCount)
        .toBeGreaterThanOrEqual(
            HomeData.minimumProducts
        );


    // 5. Verify Product Names

    const productNames =
        await home.getProductNames();


    for (const product of HomeData.expectedProducts) {

        expect(productNames)
            .toContain(product);
    }


    // 6. Verify Cart Icon

    const cartVisible =
        await home.isCartIconVisible();

    expect(cartVisible)
        .toBe(true);

});