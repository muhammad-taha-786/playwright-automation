const { test, expect } = require('@playwright/test');

const LoginPage = require('../Pages/LoginPage');
const AddtoCart = require('../Pages/AddtoCart');
const Checkout = require('../Pages/Checkout');

const LoginData = require('../testdata/LogintestData.json');
const CartData = require('../testdata/AddToCart.json');
const CheckoutData = require('../testdata/Checkout.json');


// Complete Product Checkout

test('Complete Product Checkout', async ({ page }) => {


    // Create Page Objects

    const login = new LoginPage(page);

    const cart = new AddtoCart(page);

    const checkout = new Checkout(page);


    // 1. Login

    const loginUser = LoginData.validUsers[0];

    await login.gotoLoginPage();

    await login.login(
        loginUser.username,
        loginUser.password
    );


    // 2. Verify Products Page

    await expect(page.locator('.title'))
        .toHaveText('Products');


    // 3. Add Two Products

    await cart.addMultipleProducts(
        CartData.products
    );


    // 4. Open Cart

    await cart.openCart();


    // 5. Verify Cart Items

    const cartCount =
        await cart.getCartItemCount();

    expect(cartCount)
        .toBe(CartData.expectedCartItemCount);


    // 6. Start Checkout

    await checkout.startCheckout();

    // 7. Enter Customer Information

    const customer = CheckoutData.customer;

    await checkout.enterCustomerInformation(
        customer.firstName,
        customer.lastName,
        customer.postalCode
    );


    // 8. Continue to Overview

    await checkout.continueToOverview();


    // 9. Verify Overview Page

    await expect(checkout.overviewTitle)
        .toHaveText(
            CheckoutData.expectedOverviewTitle
        );

    // 10. Verify Overview Product Count

    const overviewCount =
        await checkout.getOverviewItemCount();

    expect(overviewCount)
        .toBe(
            CheckoutData.expectedCartItemCount
        );


    // 11. Verify Product Names

    const overviewProducts =
        await checkout.getOverviewProductNames();

    for (const product of CartData.products) {

        expect(overviewProducts)
            .toContain(product);
    }


    // 12. Verify Item Total

    const itemTotal =
        await checkout.getItemTotal();

    expect(itemTotal)
        .toContain('Item total:');



    // 13. Verify Tax


    const tax =
        await checkout.getTax();

    expect(tax)
        .toContain('Tax:');


    // 14. Verify Total

    const total =
        await checkout.getTotal();

    expect(total)
        .toContain('Total:');


    // 15. Complete Purchase

    await checkout.completePurchase();


    // 16. Verify Order Confirmation

    await expect(checkout.completeHeader)
        .toHaveText(
            CheckoutData.expectedConfirmation
        );

});