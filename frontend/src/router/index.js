import { createRouter, createWebHistory } from 'vue-router';

import ClientHome from '../views/client/Home.vue';
import Laptop from "../views/client/Laptop.vue";
import Sparepart from "../views/client/Sparepart.vue";
import Accessories from "../views/client/Accessories.vue";

import AdminLogin from '../views/admin/Authentication.vue';
import Dashboard from '../views/admin/Dashboard.vue';
import Product from "../views/admin/Product.vue";
import ProductSetup from "../views/admin/ProductSetup.vue";
import Settings from "../views/admin/Settings.vue";


import NotFound from "../views/NotFound.vue";
const routes = [
    { path: '/', component: ClientHome },
    { path: '/laptop', component: Laptop },
    { path: '/sparepart', component: Sparepart },
    { path: '/accessories', component: Accessories },

    { path: '/admin/login', component: AdminLogin },
    { path: '/admin/dashboard', component: Dashboard },
    { path: '/admin/product', component: Product     },
    { path: '/admin/product/setup/:id', component: ProductSetup },
    { path: '/admin/settings', component: Settings },

    { path: '/:pathMatch(.*)*', component: NotFound }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
