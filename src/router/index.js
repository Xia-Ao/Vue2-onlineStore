import Vue from 'vue';
import Router from 'vue-router';
import GoodsList from '@/components/goodslist/goodslist';
import Cart from '@/components/cart/cart';
import Address from '@/components/address/address';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'goodsList',
            component: GoodsList
        },
        {
            path: '/goodsList',
            name: 'goodsList',
            component: GoodsList
        },
        {
            path: '/cart',
            name: 'cart',
            component: Cart
        },
        {
            path: '/address',
            name: 'address',
            component: Address
        }
    ]
});
