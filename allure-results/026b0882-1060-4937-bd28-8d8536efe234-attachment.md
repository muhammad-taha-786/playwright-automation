# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\HomePage.spec.js >> Verify Home Products Page
- Location: tests\HomePage.spec.js:10:1

# Error details

```
TypeError: LoginPage is not a constructor
```

# Test source

```ts
  1   | const { test, expect } = require('@playwright/test');
  2   | 
  3   | const LoginPage = require('../Pages/LoginPage');
  4   | const HomePage = require('../Pages/HomePage');
  5   | 
  6   | const LoginData = require('../testdata/LogintestData.json');
  7   | const HomeData = require('../testdata/HomePage.json');
  8   | 
  9   | 
  10  | test('Verify Home Products Page', async ({ page }) => {
  11  | 
  12  |     // Create Page Objects
> 13  |     const login = new LoginPage(page);
      |                   ^ TypeError: LoginPage is not a constructor
  14  |     const home = new HomePage(page);
  15  | 
  16  | 
  17  |     // ==========================================
  18  |     // 1. Login
  19  |     // ==========================================
  20  | 
  21  |     const loginUser = LoginData.validUsers[0];
  22  | 
  23  |     await login.gotoLoginPage();
  24  | 
  25  |     await login.login(
  26  |         loginUser.username,
  27  |         loginUser.password
  28  |     );
  29  | 
  30  | 
  31  |     // Screenshot after login
  32  |     await home.attachScreenshot(
  33  |         '01 - Home Page Opened'
  34  |     );
  35  | 
  36  | 
  37  |     // ==========================================
  38  |     // 2. Verify Products Page Title
  39  |     // ==========================================
  40  | 
  41  |     await expect(home.productsTitle)
  42  |         .toHaveText(
  43  |             HomeData.expectedTitle
  44  |         );
  45  | 
  46  | 
  47  |     // Screenshot after verifying title
  48  |     await home.attachScreenshot(
  49  |         '02 - Products Page Title Verified'
  50  |     );
  51  | 
  52  | 
  53  |     // ==========================================
  54  |     // 3. Verify Products Container
  55  |     // ==========================================
  56  | 
  57  |     const productsVisible =
  58  |         await home.isProductsContainerVisible();
  59  | 
  60  |     expect(productsVisible)
  61  |         .toBe(true);
  62  | 
  63  | 
  64  |     // Screenshot after verifying products container
  65  |     await home.attachScreenshot(
  66  |         '03 - Products Container Verified'
  67  |     );
  68  | 
  69  | 
  70  |     // ==========================================
  71  |     // 4. Verify Product Count
  72  |     // ==========================================
  73  | 
  74  |     const productCount =
  75  |         await home.getProductCount();
  76  | 
  77  |     expect(productCount)
  78  |         .toBeGreaterThanOrEqual(
  79  |             HomeData.minimumProducts
  80  |         );
  81  | 
  82  | 
  83  |     // Screenshot after verifying product count
  84  |     await home.attachScreenshot(
  85  |         '04 - Product Count Verified'
  86  |     );
  87  | 
  88  | 
  89  |     // ==========================================
  90  |     // 5. Verify Product Names
  91  |     // ==========================================
  92  | 
  93  |     const productNames =
  94  |         await home.getProductNames();
  95  | 
  96  | 
  97  |     for (const product of HomeData.expectedProducts) {
  98  | 
  99  |         expect(productNames)
  100 |             .toContain(product);
  101 | 
  102 |     }
  103 | 
  104 | 
  105 |     // Screenshot after verifying product names
  106 |     await home.attachScreenshot(
  107 |         '05 - Product Names Verified'
  108 |     );
  109 | 
  110 | 
  111 |     // ==========================================
  112 |     // 6. Verify Cart Icon
  113 |     // ==========================================
```