# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\Checkout.spec.js >> Complete Product Checkout
- Location: tests\Checkout.spec.js:14:1

# Error details

```
TypeError: LoginPage is not a constructor
```

# Test source

```ts
  1   | const { test, expect } = require('@playwright/test');
  2   | 
  3   | const LoginPage = require('../Pages/LoginPage');
  4   | const AddtoCart = require('../Pages/AddtoCart');
  5   | const Checkout = require('../Pages/Checkout');
  6   | 
  7   | const LoginData = require('../testdata/LogintestData.json');
  8   | const CartData = require('../testdata/AddToCart.json');
  9   | const CheckoutData = require('../testdata/Checkout.json');
  10  | 
  11  | 
  12  | // Complete Product Checkout
  13  | 
  14  | test('Complete Product Checkout', async ({ page }) => {
  15  | 
  16  | 
  17  |     // Create Page Objects
  18  | 
> 19  |     const login = new LoginPage(page);
      |                   ^ TypeError: LoginPage is not a constructor
  20  | 
  21  |     const cart = new AddtoCart(page);
  22  | 
  23  |     const checkout = new Checkout(page);
  24  | 
  25  | 
  26  |     // 1. Login
  27  | 
  28  |     const loginUser = LoginData.validUsers[0];
  29  | 
  30  |     await login.gotoLoginPage();
  31  | 
  32  |     await login.login(
  33  |         loginUser.username,
  34  |         loginUser.password
  35  |     );
  36  | 
  37  | 
  38  |     // 2. Verify Products Page
  39  | 
  40  |     await expect(page.locator('.title'))
  41  |         .toHaveText('Products');
  42  | 
  43  | 
  44  |     // 3. Add Two Products
  45  | 
  46  |     await cart.addMultipleProducts(
  47  |         CartData.products
  48  |     );
  49  | 
  50  | 
  51  |     // 4. Open Cart
  52  | 
  53  |     await cart.openCart();
  54  | 
  55  | 
  56  |     // 5. Verify Cart Items
  57  | 
  58  |     const cartCount =
  59  |         await cart.getCartItemCount();
  60  | 
  61  |     expect(cartCount)
  62  |         .toBe(CartData.expectedCartItemCount);
  63  | 
  64  | 
  65  |     // 6. Start Checkout
  66  | 
  67  |     await checkout.startCheckout();
  68  | 
  69  |     // 7. Enter Customer Information
  70  | 
  71  |     const customer = CheckoutData.customer;
  72  | 
  73  |     await checkout.enterCustomerInformation(
  74  |         customer.firstName,
  75  |         customer.lastName,
  76  |         customer.postalCode
  77  |     );
  78  | 
  79  | 
  80  |     // 8. Continue to Overview
  81  | 
  82  |     await checkout.continueToOverview();
  83  | 
  84  | 
  85  |     // 9. Verify Overview Page
  86  | 
  87  |     await expect(checkout.overviewTitle)
  88  |         .toHaveText(
  89  |             CheckoutData.expectedOverviewTitle
  90  |         );
  91  | 
  92  |     // 10. Verify Overview Product Count
  93  | 
  94  |     const overviewCount =
  95  |         await checkout.getOverviewItemCount();
  96  | 
  97  |     expect(overviewCount)
  98  |         .toBe(
  99  |             CheckoutData.expectedCartItemCount
  100 |         );
  101 | 
  102 | 
  103 |     // 11. Verify Product Names
  104 | 
  105 |     const overviewProducts =
  106 |         await checkout.getOverviewProductNames();
  107 | 
  108 |     for (const product of CartData.products) {
  109 | 
  110 |         expect(overviewProducts)
  111 |             .toContain(product);
  112 |     }
  113 | 
  114 | 
  115 |     // 12. Verify Item Total
  116 | 
  117 |     const itemTotal =
  118 |         await checkout.getItemTotal();
  119 | 
```