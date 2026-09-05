# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\logout.spec.js >> Logout Test Case
- Location: tests\logout.spec.js:13:1

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
    44 × waiting for element to be visible, enabled and stable
       - element is not visible
     - retrying click action
       - waiting 500ms
    - waiting for element to be visible, enabled and stable

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
      - generic [ref=e14]:
        - generic [ref=e15]: Products
        - generic [ref=e17] [cursor=pointer]:
          - generic [ref=e18]: Name (A to Z)
          - combobox [ref=e19]:
            - option "Name (A to Z)" [selected]
            - option "Name (Z to A)"
            - option "Price (low to high)"
            - option "Price (high to low)"
    - generic [ref=e23]:
      - generic [ref=e24]:
        - link [ref=e26]:
          - /url: "#"
          - img "Sauce Labs Backpack" [ref=e27]
        - generic [ref=e28]:
          - generic [ref=e29]:
            - link "Sauce Labs Backpack" [ref=e30]:
              - /url: "#"
            - generic [ref=e32]: carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.
          - generic [ref=e33]:
            - generic [ref=e34]: $29.99
            - button "Add to cart" [ref=e35] [cursor=pointer]
      - generic [ref=e36]:
        - link [ref=e38]:
          - /url: "#"
          - img "Sauce Labs Bike Light" [ref=e39]
        - generic [ref=e40]:
          - generic [ref=e41]:
            - link "Sauce Labs Bike Light" [ref=e42]:
              - /url: "#"
            - generic [ref=e44]: A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.
          - generic [ref=e45]:
            - generic [ref=e46]: $9.99
            - button "Add to cart" [ref=e47] [cursor=pointer]
      - generic [ref=e48]:
        - link [ref=e50]:
          - /url: "#"
          - img "Sauce Labs Bolt T-Shirt" [ref=e51]
        - generic [ref=e52]:
          - generic [ref=e53]:
            - link "Sauce Labs Bolt T-Shirt" [ref=e54]:
              - /url: "#"
            - generic [ref=e56]: Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.
          - generic [ref=e57]:
            - generic [ref=e58]: $15.99
            - button "Add to cart" [ref=e59] [cursor=pointer]
      - generic [ref=e60]:
        - link [ref=e62]:
          - /url: "#"
          - img "Sauce Labs Fleece Jacket" [ref=e63]
        - generic [ref=e64]:
          - generic [ref=e65]:
            - link "Sauce Labs Fleece Jacket" [ref=e66]:
              - /url: "#"
            - generic [ref=e68]: It's not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office.
          - generic [ref=e69]:
            - generic [ref=e70]: $49.99
            - button "Add to cart" [ref=e71] [cursor=pointer]
      - generic [ref=e72]:
        - link [ref=e74]:
          - /url: "#"
          - img "Sauce Labs Onesie" [ref=e75]
        - generic [ref=e76]:
          - generic [ref=e77]:
            - link "Sauce Labs Onesie" [ref=e78]:
              - /url: "#"
            - generic [ref=e80]: Rib snap infant onesie for the junior automation engineer in development. Reinforced 3-snap bottom closure, two-needle hemmed sleeved and bottom won't unravel.
          - generic [ref=e81]:
            - generic [ref=e82]: $7.99
            - button "Add to cart" [ref=e83] [cursor=pointer]
      - generic [ref=e84]:
        - link [ref=e86]:
          - /url: "#"
          - img "Test.allTheThings() T-Shirt (Red)" [ref=e87]
        - generic [ref=e88]:
          - generic [ref=e89]:
            - link "Test.allTheThings() T-Shirt (Red)" [ref=e90]:
              - /url: "#"
            - generic [ref=e92]: This classic Sauce Labs t-shirt is perfect to wear when cozying up to your keyboard to automate a few tests. Super-soft and comfy ringspun combed cotton.
          - generic [ref=e93]:
            - generic [ref=e94]: $15.99
            - button "Add to cart" [ref=e95] [cursor=pointer]
  - contentinfo [ref=e96]:
    - list [ref=e97]:
      - listitem [ref=e98]:
        - link "Twitter" [ref=e99]:
          - /url: https://twitter.com/saucelabs
      - listitem [ref=e100]:
        - link "Facebook" [ref=e101]:
          - /url: https://www.facebook.com/saucelabs
      - listitem [ref=e102]:
        - link "LinkedIn" [ref=e103]:
          - /url: https://www.linkedin.com/company/sauce-labs/
    - generic [ref=e104]: © 2026 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy
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