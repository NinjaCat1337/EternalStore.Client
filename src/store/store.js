import Vue from 'vue';
import Vuex from 'vuex';
import Axios from "../axios-auth.js";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    token: null
  },

  getters: {

  },

  mutations: {
    authorizeUser(state, authData) {
      state.token = authData.token;
    }
  },

  actions: {
    login({ commit }, authData) {
      Axios
        .post("login", authData)
        .then(response => {
          console.log(response);
          commit('authorizeUser', { token: response.data.token })
        })
        .catch(error => console.log(error));
    },
    register({ commit }, authData) {
      Axios
        .post("register", authData)
        .then(response => {
          console.log(response);
          commit('authorizeUser', { token: response.data.token })
        })
        .catch(error => console.log(error));
    }
  },
});