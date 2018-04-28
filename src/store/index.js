import Vue from 'vue';
import Vuex from 'vuex';
import cart from './module/cart';
import global from './module/global';


Vue.use(Vuex);
export default new Vuex.Store({
    modules: {
        cart,
        global
    }
});
