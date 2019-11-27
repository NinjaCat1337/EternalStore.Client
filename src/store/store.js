import Vue from 'vue';
import Vuex from 'vuex';
import Axios from "../axios-auth.js";

import router from '../routes.js';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    token: null
  },

  getters: {
    isAuthenticated(state) {
      return state.token !== null;
    }
  },

  mutations: {
    authorizeUser(state, authData) {
      state.token = authData.token;
    },
    logoutUser(state) {
      state.token = null;
    }
  },

  actions: {
    login({ commit }, authData) {
      Axios
        .post("login", authData)
        .then(response => {
          commit('authorizeUser', { token: response.data.token });
          store.dispatch('setLogoutTimer', response.data.expiresInMinutes);
          const dateNow = new Date();
          const expirationDate = new Date(dateNow.getTime() + response.data.expiresInMinutes * 60000);
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('expirationDate', expirationDate);
        })
        .catch(error => console.log(error));
      router.replace('/');
    },
    logout({ commit }) {
      commit('logoutUser');
      localStorage.clear();
      router.replace('/login');
    },
    setLogoutTimer({ commit }, expiresInMinutes) {
      setTimeout(() => {
        commit('logoutUser');
      }, expiresInMinutes * 60 * 1000)
    },
    resumeSession({commit}) {
      const token = localStorage.getItem('token');
      if (!token) return;

      const expirationDate = localStorage.getItem('expirationDate');
      const now = new Date();
      if (now >= expirationDate) return;

      commit('authorizeUser', { token })
    }
  },
});