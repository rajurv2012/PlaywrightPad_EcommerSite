import {test, expect} from '../fixtures/ecommerce';

test.describe(test.slow)

test.beforeEach('open the site',async({homepage})=>{
await homepage.open();
})

test('open wishlist page and verify empty page  @regression',async({wishListPage})=>{
await wishListPage.navigateToWishList();
await wishListPage.checkEmptyWishlist()
})

test('add products to wishlist page  @regression',async({wishListPage,homepage,page})=>{
await homepage.clickElectronic()
await homepage.addProductToWishList('Wireless Headphones')
await homepage.addProductToWishList('Mechanical Keyboard')
await homepage.addProductToWishList('Smart Fitness Watch')
await homepage.addProductToWishList('Wireless Mouse')
await wishListPage.navigateToWishList();

const wishListItems:string[]= await page.locator('.wishlist-item-card').locator('h4').allTextContents()
const expectedWishListItemsAre=['Wireless Headphones','Mechanical Keyboard','Smart Fitness Watch','Wireless Mouse']
console.log('wishList items are : ',wishListItems)
expect(wishListItems).toEqual(expectedWishListItemsAre)
console.log('number of wishlist items are '+await wishListPage.countNumberOfProductsInWishList())
expect(await wishListPage.countNumberOfProductsInWishList()).toEqual(4)
})

test('add to cart from the wishlist page  @regression', async({wishListPage,homepage,page})=>{

await homepage.clickElectronic()
await homepage.addProductToWishList('Wireless Headphones')
await homepage.addProductToWishList('Mechanical Keyboard')
await homepage.addProductToWishList('Smart Fitness Watch')
await wishListPage.navigateToWishList();
await wishListPage.addWishListItem('Wireless Headphones')
await wishListPage.addWishListItem('Mechanical Keyboard')
await wishListPage.addWishListItem('Smart Fitness Watch')
})
