import { Page, Locator, expect } from "@playwright/test";

export class Account {

    readonly accountMenu: Locator;
    readonly addAddress: Locator;
    readonly addStreetAddress: Locator;
    readonly addCityState: Locator;
    readonly zip: Locator;
    readonly saveAddress: Locator;

    constructor(private readonly page: Page) {
        this.accountMenu = page.getByRole('button', { name: 'Account' });
        this.addAddress = page.getByRole('button', { name: '+ Add New' });
        this.addStreetAddress = page.locator('#addr-street');
        this.addCityState = page.locator("xpath=//label[normalize-space()='City, State']//following-sibling::input")
        this.zip = page.locator("//label[normalize-space()='Zip']//following-sibling::input")
        this.saveAddress = page.getByRole("button", { name: 'Save Address' })
    }

    async addAdressInAddressBook(streeAddress: string, cityStateName: string, zipCode: string): Promise<void> {
        await this.addAddress.click()
        await this.addStreetAddress.fill(streeAddress)
        await this.addCityState.fill(cityStateName)
        await this.zip.fill(zipCode)
        await this.saveAddress.click()
        const addressToBeDisplayedAs: string = streeAddress + ", " + cityStateName + ", " + zipCode
        expect(await this.page.locator('.address-card').textContent()).toBe(addressToBeDisplayedAs)
    }



}