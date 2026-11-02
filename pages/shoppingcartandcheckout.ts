import { Page, Locator, expect } from '@playwright/test';

export class ShoppingCartAndCheckout {
    readonly shoppingCartHeader: Locator;
    readonly checkoutButton: Locator;
    readonly shippingAddressFullName: Locator;
    readonly shippingAddressStreetAddress: Locator;
    readonly shippingAddressCityAndState: Locator;
    readonly shippingAddressZipCode: Locator;
    readonly continueToPaymentButton: Locator;
    readonly cardNumber: Locator;
    readonly expiryDate: Locator;
    readonly cvvData: Locator;
    readonly continueToReview: Locator;
    readonly placeOrderButton: Locator;
    readonly viewOrderHistory: Locator;
    readonly viewCart:Locator;

    constructor(private readonly page: Page) {
        this.shoppingCartHeader = page.locator("xpath=//h3[normalize-space()='Shopping Cart']");
        this.checkoutButton = page.getByRole('button', { name: 'Proceed to Checkout' });
        this.shippingAddressFullName = page.locator("#ship-name")
        this.shippingAddressStreetAddress = page.locator("xpath=//label[text()='Street Address']/following-sibling::input")
        this.shippingAddressCityAndState = page.locator("xpath=//label[text()='City & State']/following-sibling::input")
        this.shippingAddressZipCode = page.locator("xpath=//label[text()='Zip Code']/following-sibling::input")
        this.continueToPaymentButton = page.getByRole("button", { name: 'Continue to Payment' })
        this.cardNumber = page.getByPlaceholder('16 digit card number')
        this.expiryDate = page.getByPlaceholder('MM/YY')
        this.cvvData = page.locator("xpath=//label[text()='CVV']/following-sibling::input")
        this.continueToReview = page.getByRole('button', { name: 'Continue to Review' })
        this.placeOrderButton = page.getByRole('button', { name: 'Place Order' })
        this.viewOrderHistory = page.getByRole('button', { name: 'View Order History' })
        this.viewCart=page.getByRole('button', { name: /Cart/i })
    }

    async proceedToCheckoutAndShippingAddress():Promise<void>{
        await this.shoppingCartHeader.isVisible()
        await this.checkoutButton.click()
        await this.shippingAddressFullName.fill('V Ramesh Raju')
        await this.shippingAddressStreetAddress.fill('ABC Academy')
        await this.shippingAddressZipCode.fill('88888')
        await this.shippingAddressCityAndState.fill('India')
        await this.continueToPaymentButton.click()
    }

    async addPaymentDetailsAndPlaceOrder():Promise<void>{
        await this.cardNumber.fill('4111111111111111')
        await this.expiryDate.fill('12/35')
        await this.cvvData.fill('232')
        await this.continueToReview.click()
        await this.placeOrderButton.click()
        expect(this.viewOrderHistory.isVisible()).toBeTruthy()
        console.log("Order placed successfully")
    }



}

