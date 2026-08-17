class Checkout {

    constructor(page) {

        this.page = page;

        // Cart

        this.checkoutButton = page.locator('#checkout');

        // Customer Information

        this.firstNameInput = page.locator('#first-name');

        this.lastNameInput = page.locator('#last-name');

        this.postalCodeInput = page.locator('#postal-code');

        this.continueButton = page.locator('#continue');

        // Checkout Overview

        this.overviewTitle = page.locator('.title');

        this.overviewItems = page.locator(
            '.cart_item'
        );

        this.overviewProductNames = page.locator(
            '.cart_item .inventory_item_name'
        );


        // Price Summary

        this.itemTotal = page.locator(
            '.summary_subtotal_label'
        );

        this.tax = page.locator(
            '.summary_tax_label'
        );

        this.total = page.locator(
            '.summary_total_label'
        );

        // Complete Order

        this.finishButton = page.locator('#finish');

        // Order Confirmation

        this.completeHeader = page.locator(
            '.complete-header'
        );

        this.completeText = page.locator(
            '.complete-text'
        );
    }

    // Start Checkout

    async startCheckout() {

        await this.checkoutButton.click();
    }


    // Enter Customer Information

    async enterCustomerInformation(
        firstName,
        lastName,
        postalCode
    ) {

        await this.firstNameInput.fill(firstName);

        await this.lastNameInput.fill(lastName);

        await this.postalCodeInput.fill(postalCode);
    }

    // Continue to Overview

    async continueToOverview() {

        await this.continueButton.click();
    }


    // Get Overview Product Count

    async getOverviewItemCount() {

        return await this.overviewProductNames.count();
    }


    // Get Overview Product Names

    async getOverviewProductNames() {

        return await this.overviewProductNames
            .allTextContents();
    }

    // Get Item Total

    async getItemTotal() {

        return await this.itemTotal.textContent();
    }


    // Get Tax

    async getTax() {

        return await this.tax.textContent();
    }


    // Get Total


    async getTotal() {

        return await this.total.textContent();
    }


    // Complete Purchase

    async completePurchase() {

        await this.finishButton.click();
    }

    // Get Confirmation Message

    async getConfirmationMessage() {

        return await this.completeHeader.textContent();
    }


    // Get Confirmation Text

    async getConfirmationText() {

        return await this.completeText.textContent();
    }
}


module.exports = Checkout;