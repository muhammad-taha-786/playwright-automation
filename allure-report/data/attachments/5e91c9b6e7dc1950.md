# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: SmokeTest\smoketest.spec.js >> Smoke Test - Complete End to End Flow
- Location: SmokeTest\smoketest.spec.js:18:1

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('#logout_sidebar_link')
    - locator resolved to <a href="#" id="logout_sidebar_link" class="bm-item menu-item" data-test="logout-sidebar-link">Logout</a>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is not visible
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is not visible
    - retrying click action
      - waiting 100ms
    34 × waiting for element to be visible, enabled and stable
       - element is not visible
     - retrying click action
       - waiting 500ms

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e4]:
    - generic [ref=e5]:
      - generic [ref=e6]:
        - generic [ref=e7]:
          - button "Open Menu" [ref=e8] [cursor=pointer]
          - img "Open Menu" [ref=e9]
        - generic [ref=e10]: Swag Labs
      - generic [ref=e14]: "Checkout: Complete!"
    - generic [ref=e16]:
      - img "Pony Express" [ref=e17]
      - heading "Thank you for your order!" [level=2] [ref=e18]
      - generic [ref=e19]: Your order has been dispatched, and will arrive just as fast as the pony can get there!
      - generic [ref=e20]:
        - button "Back Home" [ref=e21] [cursor=pointer]
        - button "Generate PDF order" [ref=e22] [cursor=pointer]
  - contentinfo [ref=e23]:
    - list [ref=e24]:
      - listitem [ref=e25]:
        - link "Twitter" [ref=e26]:
          - /url: https://twitter.com/saucelabs
      - listitem [ref=e27]:
        - link "Facebook" [ref=e28]:
          - /url: https://www.facebook.com/saucelabs
      - listitem [ref=e29]:
        - link "LinkedIn" [ref=e30]:
          - /url: https://www.linkedin.com/company/sauce-labs/
    - generic [ref=e31]: © 2026 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy
```

# Test source

```ts
  1  | const { test } = require('@playwright/test');
  2  | 
  3  | class Logout {
  4  | 
  5  |     constructor(page) {
  6  | 
  7  |         this.page = page;
  8  | 
  9  |         // Menu
  10 |         this.menuButton = page.locator(
  11 |             '#react-burger-menu-btn'
  12 |         );
  13 | 
  14 |         // Logout
  15 |         this.logoutLink = page.locator(
  16 |             '#logout_sidebar_link'
  17 |         );
  18 | 
  19 |         // Login Page
  20 |         this.loginButton = page.locator(
  21 |             '#login-button'
  22 |         );
  23 | 
  24 |         this.usernameInput = page.locator(
  25 |             '#user-name'
  26 |         );
  27 | 
  28 |         this.passwordInput = page.locator(
  29 |             '#password'
  30 |         );
  31 |     }
  32 | 
  33 | 
  34 |     // Attach Screenshot
  35 | 
  36 |     async attachScreenshot(name) {
  37 | 
  38 |         await test.info().attach(name, {
  39 |             body: await this.page.screenshot(),
  40 |             contentType: 'image/png',
  41 |         });
  42 | 
  43 |     }
  44 | 
  45 | 
  46 |     // Open Menu
  47 | 
  48 |     async openMenu() {
  49 | 
  50 |         await this.menuButton.click();
  51 | 
  52 |         await this.attachScreenshot(
  53 |             '01 - Menu Opened'
  54 |         );
  55 |     }
  56 | 
  57 | 
  58 |     // Logout
  59 | 
  60 |     async logout() {
  61 | 
  62 |         await this.openMenu();
  63 | 
> 64 |         await this.logoutLink.click();
     |                               ^ Error: locator.click: Test timeout of 30000ms exceeded.
  65 | 
  66 |         await this.attachScreenshot(
  67 |             '02 - Logout Completed'
  68 |         );
  69 |     }
  70 | 
  71 | 
  72 |     // Verify Login Page
  73 | 
  74 |     async isLoginPageDisplayed() {
  75 | 
  76 |         return await this.loginButton.isVisible();
  77 | 
  78 |     }
  79 | 
  80 | }
  81 | 
  82 | 
  83 | module.exports = Logout;
```