import {test,expect} from '../fixtures/ecommerce'
import { ShoppingCartAndCheckout } from '../pages/shoppingcartandcheckout'

test.describe(test.slow)

test.beforeEach("launch the application",async({homepage})=>{
await homepage.open()
}
)


test("Place an order using wishlist @regression ",async({homepage,wishListPage,cartAndCheckout})=>{

await homepage.clickElectronic()
await homepage.addProductToWishList('Wireless Headphones')
await homepage.addProductToWishList('Mechanical Keyboard')
await homepage.addProductToWishList('Smart Fitness Watch')
await wishListPage.navigateToWishList();
await wishListPage.addWishListItem('Wireless Headphones')
await wishListPage.addWishListItem('Mechanical Keyboard')
await wishListPage.addWishListItem('Smart Fitness Watch')

await cartAndCheckout.viewCart.click()
await cartAndCheckout.proceedToCheckoutAndShippingAddress();
await cartAndCheckout.addPaymentDetailsAndPlaceOrder()

})
