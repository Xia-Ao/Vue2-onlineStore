import Vue from 'vue';
import Router from 'vue-router';
import GoodsList from '@/components/goodslist/goodslist';
import Cart from '@/components/cart/cart';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'GoodsList',
      component: GoodsList
    },
    {
      path: '/goodsList',
      name: 'GoodsList',
      component: GoodsList
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    }
  ]
});
