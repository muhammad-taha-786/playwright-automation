const { test } = require('@playwright/test');

class Logout {

    constructor(page) {

        this.page = page;

        // Menu
        this.menuButton = page.locator(
            '#react-burger-menu-btn'
        );

        // Logout
        this.logoutLink = page.locator(
            '#logout_sidebar_link'
        );

        // Login Page
        this.loginButton = page.locator(
            '#login-button'
        );

        this.usernameInput = page.locator(
            '#user-name'
        );

        this.passwordInput = page.locator(
            '#password'
        );
    }


    // Attach Screenshot

    async attachScreenshot(name) {

        await test.info().attach(name, {
            body: await this.page.screenshot(),
            contentType: 'image/png',
        });

    }


    // Open Menu

    async openMenu() {

        await this.menuButton.click();

        await this.logoutLink.waitFor({ state: 'visible' });

        // Menu slide-in animation ko poora hone ka time dein
        await this.page.waitForTimeout(500);

        await this.attachScreenshot(
            '01 - Menu Opened'
        );
    }


    // Logout

    async logout() {

        await this.openMenu();

        // force: true - animation ki wajah se "stable" check skip kar dein
        await this.logoutLink.click({ force: true });

        await this.attachScreenshot(
            '02 - Logout Completed'
        );
    }


    // Verify Login Page

    async isLoginPageDisplayed() {

        return await this.loginButton.isVisible();

    }

}


module.exports = Logout;