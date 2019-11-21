import Home from './components/Home.vue';
import Categories from './components/products/Categories.vue';

export const routes = [
    { path: '/', component: Home },
    { path: '/products', component: Categories }
];