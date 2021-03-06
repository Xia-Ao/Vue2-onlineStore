// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import VueLazyload from 'vue-lazyload';
import infiniteScroll from 'vue-infinite-scroll';
import 'font-awesome/css/font-awesome.css';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Vuex from 'vuex';
import store from './store';
import {currency} from './util/currency';
import util from './util/util';


Vue.config.productionTip = false;

Vue.use(VueLazyload, {
    // preLoad: 1.3,
    // error: 'dist/error.png',
    loading: '/static/img/loading-svg/loading-bars.svg'
    // attempt: 1
});
Vue.use(Vuex);
Vue.use(ElementUI);
Vue.use(infiniteScroll);
Vue.filter('currency', currency);
Vue.prototype.util = util;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: {App},
    template: '<App/>'
});
