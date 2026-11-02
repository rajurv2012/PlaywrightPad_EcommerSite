import { test, expect } from '../fixtures/ecommerce';


test.beforeEach('launch the site', async ({ homepage }) => {
    await homepage.open()
})

test.afterEach("cleanup after test",async({page})=>{
  await page.close()
})
test("validate the homepage menu and sidemenu displays @regression", async ({ homepage }) => {
    await homepage.productSearchKeyWord('Mechanical Keyboard')
    await homepage.clearProductSearch()
    await homepage.clickAccessorires()
    await homepage.addProductToWishList('Developer Coffee Mug')
    await homepage.clickAllProducts()
    await homepage.setPriceRange("10", "50")
    await homepage.sortOrder("Price: Low to High")
})

test("validate the no. of items into the home page  @regression", async ({ page }) => {
    const pageOneItemCount = page.locator('.product-card.card-complex').all()
    const pageHas: number = (await pageOneItemCount).length;
    console.log('page one has ' + pageHas)
    await page.getByRole("button", { name: '2' }).click()
    await page.waitForLoadState('domcontentloaded');
   await page.locator('.product-card.card-complex').first().waitFor({ state: 'visible' });
    const pageTwoItemCount = page.locator('.product-card.card-complex').all()
    const pageTwoHas: number = (await pageTwoItemCount).length;
    console.log('page two has ' + pageTwoHas)
    expect(10, "Total products are displased").toBe(pageHas + pageTwoHas)
})


test("validate the sorting displayed as expected  @regression", async ({ homepage, page }) => {
    await homepage.productSearchKeyWord('All Products')
    await homepage.sortOrder("Price: Low to High")
    const productsCost: number[] = (await page.locator(".product-price").allTextContents()).map(price => Number(price.replace("$", "").trim()))
    const sortCost = [...productsCost].sort((a, b) => a - b);
    expect(productsCost).toEqual(sortCost)
    console.log("--------------------------------")
    await homepage.sortOrder("Price: High to Low")
    const productsCost2: number[] = (await page.locator(".product-price").allTextContents()).map(price => Number(price.replace("$", "").trim()))
    const sortCost2 = [...productsCost2].sort((a, b) => a - b);
    expect(productsCost2).toEqual(sortCost2)
})


