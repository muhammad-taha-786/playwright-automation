const { test } = require('@playwright/test');

class HomePage {

    constructor(page) {

        this.page = page;

        // Products Page
        this.productsTitle = page.locator('.title');

        this.productsContainer = page.locator(
            '.inventory_container'
        );

        this.products = page.locator(
            '.inventory_item'
        );

        this.productNames = page.locator(
            '.inventory_item_name'
        );

        // Cart
        this.cartIcon = page.locator(
            '.shopping_cart_link'
        );
    }


    // Attach Screenshot
    async attachScreenshot(name) {

        await test.info().attach(name, {
            body: await this.page.screenshot(),
            contentType: 'image/png',
        });

    }


    // Get Page Title
    async getPageTitle() {

        return await this.productsTitle.textContent();

    }


    // Get Product Count
    async getProductCount() {

        return await this.products.count();

    }


    // Get Product Names
    async getProductNames() {

        return await this.productNames.allTextContents();

    }


    // Verify Products Container
    async isProductsContainerVisible() {

        return await this.productsContainer.isVisible();

    }


    // Verify Cart Icon
    async isCartIconVisible() {

        return await this.cartIcon.isVisible();

    }

}


module.exports = HomePage;