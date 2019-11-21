import Vue from 'vue';
import Vuex from 'vuex';
import Axios from 'axios';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {

  },

  getters: {

  },

  mutations: {
 
  },

  actions: {
    LOAD_CATEGORIES({ commit }) {
      Axios
        .get('https://localhost:44346/api/store/categories')
        .then(r => r.data)
        .then(categories => {
          commit('SET_CATEGORIES', categories)
        })
    },
    LOAD_PRODUCTS({ commit }) {
      this.state.categories.forEach(function (category, index) {
        Axios
          .get('https://localhost:44346/api/store/categories/' + category.id + '/products')
          .then(r => r.data)
          .then(products => {
            commit('SET_PRODUCTS', {products, index})
          });
      });
    }
  },
});