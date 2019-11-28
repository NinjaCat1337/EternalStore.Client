import Vue from 'vue';
import { store } from './store/store.js';
import App from './App.vue';
import router from './routes.js';
import Axios from 'axios';
import Dialogue from './dialogue.js';

Vue.use(Dialogue);

Axios.defaults.baseURL = 'https://localhost:44346/api/';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
