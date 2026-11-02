import { Page, Locator, expect, test } from '@playwright/test'

export class WishList {
    readonly wishListMenu: Locator;
    readonly emptyWishList: Locator;
    readonly wishListsItemCount: Locator;
    readonly moveToCart: Locator;
    readonly removeFromWishlistButton: Locator;
    readonly shoppingCartClose: Locator;

    constructor(private readonly page: Page) {
        this.wishListMenu = page.getByRole('button', { name: 'Wishlist' })
        this.emptyWishList = page.getByText('Your wishlist is empty')
        this.wishListsItemCount = page.locator('.wishlist-item-card')
        this.moveToCart = page.getByRole('button', { name: 'Move to Cart' })
        this.removeFromWishlistButton = page.locator('button.remove-wishlist-item')

        // this.shoppingCartClose=page.locator("xpath=//h3[normalize-space()='Shopping Cart']/following-sibling::button")
        // or 
        this.shoppingCartClose = page.getByRole('heading', { name: 'Shopping Cart' }).locator("xpath=following-sibling::button")
    }


    async navigateToWishList(): Promise<void> {
        await this.wishListMenu.click();
    }

    async checkEmptyWishlist(): Promise<void> {
        expect(await this.emptyWishList.visible()).toBeTruthy()
    }

    async countNumberOfProductsInWishList(): Promise<number> {
        return this.wishListsItemCount.count();
    }

    async moveToCartMenu(): Promise<void> {
        (await this.moveToCart.all()).forEach(async (cart) => {
            await cart.click()
            await this.shoppingCartClose.click()
        })
    }

    async removeFromWishlistPage(): Promise<void> {
        await test.step('remove from wishlist page ', async () => {
            (await this.removeFromWishlistButton.all()).forEach(async (remove) => {
                await remove.click()
            })
        })
    }

    async addWishListItem(wishListItem: string): Promise<void> {
        await test.step(`add product to wishlist ${wishListItem}`, async () => {
            const moveButton = this.page.locator(`xpath=//h4[normalize-space()='${wishListItem}']/parent::div//button[text()='Move to Cart']`);
            await moveButton.waitFor({ state: 'visible' });
            await moveButton.click();
            await this.shoppingCartClose.click()
            console.log("Added item for: ", wishListItem)
        })
    }

}