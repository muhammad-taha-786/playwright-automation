const { test, expect } = require('@playwright/test');

const LoginPageImport = require('../Pages/LoginPage');
const HomePageImport = require('../Pages/HomePage');
const AddtoCartImport = require('../Pages/AddtoCart');
const CheckoutImport = require('../Pages/Checkout');
const LogoutImport = require('../Pages/logout');

const LoginPage = LoginPageImport.default || LoginPageImport;
const HomePage = HomePageImport.default || HomePageImport;
const AddtoCart = AddtoCartImport.default || AddtoCartImport;
const Checkout = CheckoutImport.default || CheckoutImport;
const Logout = LogoutImport.default || LogoutImport;

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

    // Verify Products are Available
    const productCount = await home.getProductCount();
    expect(productCount)
        .toBeGreaterThanOrEqual(
            HomeData.minimumProducts
        );

    // Add Two Products to Cart
    await cart.addMultipleProducts(
        CartData.products
    );

    // Open Cart
    await cart.openCart();

    // Verify Cart Items
    const cartCount = await cart.getCartItemCount();
    expect(cartCount)
        .toBe(
            CartData.expectedCartItemCount
        );

    // Verify Cart Product Names
    const cartProducts = await cart.getCartItemNames();
    for (const product of CartData.products) {
        expect(cartProducts)
            .toContain(product);
    }

    // Start Checkout
    await checkout.startCheckout();

    // Enter Customer Information
    const customer = CheckoutData.customer;
    await checkout.enterCustomerInformation(
        customer.firstName,
        customer.lastName,
        customer.postalCode
    );

    // Continue to Checkout Overview
    await checkout.continueToOverview();

    // Verify Checkout Overview
    await expect(checkout.overviewTitle)
        .toHaveText(
            CheckoutData.expectedOverviewTitle
        );

    // Verify Overview Product Count
    const overviewCount = await checkout.getOverviewItemCount();
    expect(overviewCount)
        .toBe(
            CheckoutData.expectedCartItemCount
        );

    // Verify Overview Products
    const overviewProducts = await checkout.getOverviewProductNames();
    for (const product of CartData.products) {
        expect(overviewProducts)
            .toContain(product);
    }

    // Verify Item Total
    const itemTotal = await checkout.getItemTotal();
    expect(itemTotal)
        .toContain('Item total:');

    // Verify Tax
    const tax = await checkout.getTax();
    expect(tax)
        .toContain('Tax:');

    // Verify Total
    const total = await checkout.getTotal();
    expect(total)
        .toContain('Total:');

    // Complete Purchase
    await checkout.completePurchase();

    // Verify Order Confirmation
    await expect(checkout.completeHeader)
        .toHaveText(
            CheckoutData.expectedConfirmation
        );

    // Logout
    await logout.logout();

    // Verify Login Page After Logout
    const loginPageDisplayed = await logout.isLoginPageDisplayed();
    expect(loginPageDisplayed)
        .toBe(true);
});