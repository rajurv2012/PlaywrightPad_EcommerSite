import { Page, Locator } from '@playwright/test';

export class HomePage {
    readonly productSearch: Locator;
    readonly allProducts: Locator;
    readonly electronic: Locator;
    readonly accessorires: Locator;
    readonly fashion: Locator;
    readonly priceMin: Locator;
    readonly priceMax: Locator
    readonly applyPrice: Locator;
    readonly sortOrderDropdown: Locator;
    readonly shopMenu:Locator;


    constructor(private readonly page: Page) {
        this.productSearch = page.getByPlaceholder('Search keywords...');
        this.allProducts = page.getByRole('button', { name: 'All Products' });
        this.electronic = page.getByRole('button', { name: 'Electronics' });
        this.accessorires = page.getByRole('button', { name: 'Accessories' });
        this.fashion = page.getByRole('button', { name: 'Fashion' });
        this.priceMin = page.getByPlaceholder('Min')
        this.priceMax = page.getByPlaceholder('Max')
        this.applyPrice = page.locator('#apply-price')
        this.sortOrderDropdown = page.locator("#sort-select")
        this.shopMenu=page.getByRole('button',{name:'Shop'})
    }

    async open(): Promise<void> {
        await this.page.goto("https://playwrightpad.com/sandbox/ecommerce")
    }

    async productSearchKeyWord(productName: string): Promise<void> {
        await this.productSearch.fill(productName);
    }

    async clearProductSearch(): Promise<void> {
        //  await this.productSearch.clear();
        await this.productSearch.fill('')
    }

    async clickAllProducts(): Promise<void> {
        await this.allProducts.click()
    }

    async clickElectronic(): Promise<void> {
        await this.electronic.click();
    }

    async clickAccessorires(): Promise<void> {
        await this.accessorires.click();
    }

    async clickFashion(): Promise<void> {
        await this.fashion.click();
    }

    async setPriceRange(min:string, max:string): Promise<void> {
        await this.priceMin.fill(min)
        await this.priceMax.fill(max)
        await this.applyPrice.click()
    }

    async sortOrder(sortAs:string): Promise<void> {
        await this.sortOrderDropdown.selectOption({ label: sortAs });
        //  await this.sortOrderDropdown.selectOption("value: price-low") // not working check later
    }

    async clickOnShop(): Promise<void> {
        await this.shopMenu.click()
    }

    async addProductToWishList(productName:string): Promise<void>{
    const addToWishlist:Locator = this.page.locator(`xpath=//h4[normalize-space()='${productName}']/parent::div//button[1]`)
        await addToWishlist.click()
    }

}