import Vue from 'vue';
import Vuex from 'vuex';

import auth from './modules/auth.js';
import cart from './modules/cart.js';

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules:
  {
    auth,
    cart
  }
});