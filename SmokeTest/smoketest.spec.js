const { test, expect } = require('@playwright/test');


const LoginPage = require('../Pages/LoginPage');
const HomePage = require('../Pages/HomePage');
const AddtoCart = require('../Pages/AddtoCart');
const Checkout = require('../Pages/Checkout');
const Logout = require('../Pages/logout');


const LoginData = require('../testdata/LogintestData.json');
const HomeData = require('../testdata/HomePage.json');
const CartData = require('../testdata/AddToCart.json');
const CheckoutData = require('../testdata/Checkout.json');
const LogoutData = require('../testdata/logout.json');


test('Smoke Test - Complete End to End Flow', async ({ page }) => {


    const login = new LoginPage(page);

    const home = new HomePage(page);

    const cart = new AddtoCart(page);

    const checkout = new Checkout(page);

    const logout = new Logout(page);


    await login.gotoLoginPage();


    const loginUser = LoginData.validUsers[0];

    await login.login(
        loginUser.username,
        loginUser.password
    );


    await expect(home.productsTitle)
        .toHaveText(
            HomeData.expectedTitle
        );


    // ========================================
    // 4. Verify Products are Available
    // ========================================

    const productCount =
        await home.getProductCount();

    expect(productCount)
        .toBeGreaterThanOrEqual(
            HomeData.minimumProducts
        );


    // ========================================
    // 5. Add Two Products to Cart
    // ========================================

    await cart.addMultipleProducts(
        CartData.products
    );


    // ========================================
    // 6. Open Cart
    // ========================================

    await cart.openCart();


    // ========================================
    // 7. Verify Cart Items
    // ========================================

    const cartCount =
        await cart.getCartItemCount();

    expect(cartCount)
        .toBe(
            CartData.expectedCartItemCount
        );


    // ========================================
    // 8. Verify Cart Product Names
    // ========================================

    const cartProducts =
        await cart.getCartItemNames();

    for (const product of CartData.products) {

        expect(cartProducts)
            .toContain(product);
    }


    // ========================================
    // 9. Start Checkout
    // ========================================

    await checkout.startCheckout();


    // ========================================
    // 10. Enter Customer Information
    // ========================================

    const customer = CheckoutData.customer;

    await checkout.enterCustomerInformation(
        customer.firstName,
        customer.lastName,
        customer.postalCode
    );


    // ========================================
    // 11. Continue to Checkout Overview
    // ========================================

    await checkout.continueToOverview();


    // ========================================
    // 12. Verify Checkout Overview
    // ========================================

    await expect(checkout.overviewTitle)
        .toHaveText(
            CheckoutData.expectedOverviewTitle
        );


    // ========================================
    // 13. Verify Overview Product Count
    // ========================================

    const overviewCount =
        await checkout.getOverviewItemCount();

    expect(overviewCount)
        .toBe(
            CheckoutData.expectedCartItemCount
        );


    // ========================================
    // 14. Verify Overview Products
    // ========================================

    const overviewProducts =
        await checkout.getOverviewProductNames();

    for (const product of CartData.products) {

        expect(overviewProducts)
            .toContain(product);
    }


    // ========================================
    // 15. Verify Item Total
    // ========================================

    const itemTotal =
        await checkout.getItemTotal();

    expect(itemTotal)
        .toContain('Item total:');


    // ========================================
    // 16. Verify Tax
    // ========================================

    const tax =
        await checkout.getTax();

    expect(tax)
        .toContain('Tax:');


    // ========================================
    // 17. Verify Total
    // ========================================

    const total =
        await checkout.getTotal();

    expect(total)
        .toContain('Total:');


    // ========================================
    // 18. Complete Purchase
    // ========================================

    await checkout.completePurchase();


    // ========================================
    // 19. Verify Order Confirmation
    // ========================================

    await expect(checkout.completeHeader)
        .toHaveText(
            CheckoutData.expectedConfirmation
        );


    // ========================================
    // 20. Logout
    // ========================================

    await logout.logout();


    // ========================================
    // 21. Verify Login Page After Logout
    // ========================================

    const loginPageDisplayed =
        await logout.isLoginPageDisplayed();

    expect(loginPageDisplayed)
        .toBe(true);

});