import Vue from 'vue';
import VueRouter from 'vue-router';

import Categories from './components/products/Categories.vue';
import CategoryInsertion from './components/products/CategoryInsertion.vue';
import CategoryModification from './components/products/CategoryModification.vue';
import ProductInsertion from './components/products/ProductInsertion.vue';
import ProductModification from './components/products/ProductModification.vue';
import Orders from './components/orders/Orders.vue';
import OrderInsertion from './components/orders/OrderInsertion.vue';
import OrderDetails from './components/orders/OrderDetails.vue';
import SignIn from './components/users/SignIn.vue';
import SignUp from './components/users/SignUp.vue';
import UserProfile from './components/users/UserProfile.vue';
import Scheduler from './components/notifications/Scheduler.vue';
import SchedulerItemInsertion from './components/notifications/SchedulerItemInsertion.vue';
import SchedulerItemModification from './components/notifications/SchedulerItemModification';

Vue.use(VueRouter);

export const routes = [
    { name: "store", path: '/store', component: Categories },
    { name: "addcategory", path: '/store/addcategory', component: CategoryInsertion },
    { name: "editcategory", path: '/store/editcategory/:idCategory', component: CategoryModification },
    { name: "addproduct", path: '/store/:idCategory/addproduct', component: ProductInsertion },
    { name: "editproduct", path: '/store/:idCategory/:idProduct/editproduct', component: ProductModification },
    { name: "orders", path: '/orders', component: Orders },
    { name: "addorder", path: '/orders/addorder', component: OrderInsertion },
    { name: "orderdetails", path: '/orders/:idOrder', component: OrderDetails },
    { name: "register", path: '/register', component: SignUp },
    { name: "login", path: '/login', component: SignIn },
    { name: "profile", path: '/profile', component: UserProfile },
    { name: "scheduler", path: '/scheduler', component: Scheduler },
    { name: "addscheduleritem", path: '/schedulers/additem', component: SchedulerItemInsertion },
    { name: "editscheduleritem", path: '/schedulers/items/:idSchedulerItem', component: SchedulerItemModification },
    { path: '*', redirect: { name: 'store' } }

];

export default new VueRouter({ mode: 'history', routes })