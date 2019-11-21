import Vue from 'vue';
import VueRouter from 'vue-router';
import { routes } from './routes.js';
import { store } from './store/store.js';
import App from './App.vue';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes
});

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
