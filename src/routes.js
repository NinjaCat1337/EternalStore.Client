import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from './components/Home.vue';
import Categories from './components/products/Categories.vue';
import SignIn from './components/authorization/SignIn.vue';
import SignUp from './components/authorization/SignUp.vue';

Vue.use(VueRouter);

export const routes = [
    { path: '/', component: Home },
    { path: '/products', component: Categories },
    { path: '/register', component: SignUp },
    { path: '/login', component: SignIn },
];

export default new VueRouter({mode: 'history', routes})