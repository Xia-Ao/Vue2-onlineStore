import Vue from 'vue';
import Router from 'vue-router';
import GoodsList from '@/components/goodslist/goodslist';
import Cart from '@/components/cart/cart';
import Address from '@/components/address/address';
import Order from '@/components/order/order';
import OrderFinish from '@/components/orderFinish/orderFinish';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: '/',
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
        },
        {
            path: '/order',
            name: 'order',
            component: Order
        },
        {
            path: '/orderFinish',
            name: 'orderFinish',
            component: OrderFinish
        }
    ]
});
