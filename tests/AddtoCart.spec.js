const { test, expect } = require('@playwright/test');

const LoginPage = require('../Pages/LoginPage');
const AddtoCart = require('../Pages/AddtoCart');

const LoginData = require('../testdata/LogintestData.json');
const CartData = require('../testdata/AddToCart.json');



// Add Two Products to Cart

test('Add Two Products to Cart', async ({ page }) => {

    // Create Page Objects
    const login = new LoginPage(page);
    const cart = new AddtoCart(page);


    // 1. Login

    const loginUser = LoginData.validUsers[0];

    await login.gotoURL();

    await login.login(
        loginUser.username,
        loginUser.password
    );


    // 2. Verify Products Page

    await expect(page.locator('.title'))
        .toHaveText('Products');


    // 3. Add Products to Cart

    await cart.addMultipleProducts(
        CartData.products
    );


    // 4. Open Cart

    await cart.openCart();

    // 5. Verify Cart Item Count

    const cartCount = await cart.getCartItemCount();

    expect(cartCount)
        .toBe(CartData.expectedCartItemCount);

    // 6. Verify Product Names

    const cartProducts = await cart.getCartItemNames();

    for (const product of CartData.products) {

        expect(cartProducts)
            .toContain(product);
    }

});