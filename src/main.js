import Vue from 'vue';
import { store } from './store/store.js';
import App from './App.vue';
import router from './routes.js';
import Axios from 'axios';
import Dialogue from './dialogue.js';
import appSettings from '../appSettings.json';

Vue.use(Dialogue);

Axios.defaults.baseURL = appSettings.apiDefaultBaseUrl;
Axios.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem('token');

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
