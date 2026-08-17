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

    // Open Menu

    async openMenu() {

        await this.menuButton.click();
    }

    // Logout

    async logout() {

        await this.openMenu();

        await this.logoutLink.click();
    }


    // Verify Login Page

    async isLoginPageDisplayed() {

        return await this.loginButton.isVisible();
    }
}


module.exports = Logout;