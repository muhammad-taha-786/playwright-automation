const { test } = require('@playwright/test');

class AddtoCart {

    constructor(page) {

        this.page = page;

        // Cart
        this.cartIcon = page.locator('.shopping_cart_link');

        // Cart Items
        this.cartItems = page.locator('.cart_item');

        // Product Names inside Cart
        this.cartItemNames = page.locator(
            '.cart_item .inventory_item_name'
        );
    }


    // Attach Screenshot

    async attachScreenshot(name) {

        await test.info().attach(name, {
            body: await this.page.screenshot(),
            contentType: 'image/png',
        });

    }


    // Add Single Product to Cart

    async addProduct(productName) {

        const product = this.page
            .locator('.inventory_item')
            .filter({
                has: this.page.getByText(productName, { exact: true })
            });

        await product
            .getByRole('button', { name: /Add to cart/i })
            .click();

        await this.attachScreenshot(
            `Product Added - ${productName}`
        );
    }


    // Add Multiple Products to Cart

    async addMultipleProducts(productNames) {

        for (const productName of productNames) {

            await this.addProduct(productName);
        }

    }


    // Open Cart

    async openCart() {

        await this.cartIcon.click();

        await this.attachScreenshot(
            'Cart Page Opened'
        );
    }


    // Get Cart Items Count

    async getCartItemCount() {

        return await this.cartItems.count();

    }


    // Get Cart Product Names

    async getCartItemNames() {

        return await this.cartItemNames.allTextContents();

    }

}


module.exports = AddtoCart;