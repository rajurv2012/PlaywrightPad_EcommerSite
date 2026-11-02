import {test as base,expect} from '@playwright/test'
import { HomePage } from '../pages/homepage'
import { Account } from '../pages/account'
import { WishList } from '../pages/wishlist'
import {ShoppingCartAndCheckout} from '../pages/shoppingcartandcheckout'

type PageObject = {
    homepage:HomePage,
    accountPage:Account,
    wishListPage:WishList,
    cartAndCheckout:ShoppingCartAndCheckout
}

export const test = base.extend<PageObject>({
    
homepage: async({page},use) =>{
    await use(new HomePage(page));
},

accountPage:async({page},use)=>{
    await use(new Account(page))
},

wishListPage:async({page},use)=>{
    await use(new WishList(page))
},
cartAndCheckout:async({page},use)=>{
    await use(new ShoppingCartAndCheckout(page))
}

});

export { expect };
