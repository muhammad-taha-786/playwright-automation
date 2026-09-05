# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\logout.spec.js >> Logout Test Case
- Location: tests\logout.spec.js:13:1

# Error details

```
TypeError: LoginPage is not a constructor
```

# Test source

```ts
  1  | const { test, expect } = require('@playwright/test');
  2  | 
  3  | const LoginPage = require('../Pages/LoginPage');
  4  | const Logout = require('../Pages/logout');
  5  | 
  6  | const LogoutData = require('../testdata/logout.json');
  7  | 
  8  | 
  9  | // ========================================
  10 | // Logout Test
  11 | // ========================================
  12 | 
  13 | test('Logout Test Case', async ({ page }) => {
  14 | 
  15 | 
  16 |     // ========================================
  17 |     // Create Page Objects
  18 |     // ========================================
  19 | 
> 20 |     const login = new LoginPage(page);
     |                   ^ TypeError: LoginPage is not a constructor
  21 | 
  22 |     const logout = new Logout(page);
  23 | 
  24 | 
  25 |     // ========================================
  26 |     // 1. Open SauceDemo
  27 |     // ========================================
  28 | 
  29 |     await login.gotoLoginPage();
  30 | 
  31 | 
  32 |     // ========================================
  33 |     // 2. Login
  34 |     // ========================================
  35 | 
  36 |     await login.login(
  37 |         LogoutData.username,
  38 |         LogoutData.password
  39 |     );
  40 | 
  41 | 
  42 |     // ========================================
  43 |     // 3. Verify Products Page
  44 |     // ========================================
  45 | 
  46 |     await expect(page.locator('.title'))
  47 |         .toHaveText('Products');
  48 | 
  49 | 
  50 |     // ========================================
  51 |     // 4. Logout
  52 |     // ========================================
  53 | 
  54 |     await logout.logout();
  55 | 
  56 | 
  57 |     // ========================================
  58 |     // 5. Verify Login Page
  59 |     // ========================================
  60 | 
  61 |     const loginPageDisplayed =
  62 |         await logout.isLoginPageDisplayed();
  63 | 
  64 |     expect(loginPageDisplayed)
  65 |         .toBe(true);
  66 | 
  67 | });
```