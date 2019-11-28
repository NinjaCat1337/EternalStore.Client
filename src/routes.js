import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from './components/Home.vue';
import Categories from './components/products/Categories.vue';
import CategoryInsertion from './components/products/CategoryInsertion.vue';
import CategoryModification from './components/products/CategoryModification.vue';
import ProductInsertion from './components/products/ProductInsertion.vue';
import ProductModification from './components/products/ProductModification.vue';
import SignIn from './components/authorization/SignIn.vue';
import SignUp from './components/authorization/SignUp.vue';

Vue.use(VueRouter);

export const routes = [
    { name: "home", path: '/', component: Home },
    { name: "store", path: '/store', component: Categories },
    { name: "addcategory", path: '/store/addcategory', component: CategoryInsertion },
    { name: "editcategory", path: '/store/editcategory/:idCategory', component: CategoryModification },
    { name: "addproduct", path: '/store/:idCategory/addproduct', component: ProductInsertion },
    { name: "editproduct", path: '/store/:idCategory/:idProduct/editproduct', component: ProductModification },
    { name: "register", path: '/register', component: SignUp },
    { name: "login", path: '/login', component: SignIn },
];

export default new VueRouter({mode: 'history', routes})