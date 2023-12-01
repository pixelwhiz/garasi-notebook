import { createRouter, createWebHistory } from 'vue-router';

import ClientHome from '../views/client/Home.vue';
import ItemList from "../views/client/ItemList.vue";
import Item from "../views/client/Item.vue";

import AdminLogin from '../views/admin/Authentication.vue';
import Dashboard from '../views/admin/Dashboard.vue';
import Product from "../views/admin/Product.vue";
import ProductSetup from "../views/admin/ProductSetup.vue";
import ProductCreate from "../views/admin/ProductCreate.vue";
import Settings from "../views/admin/Settings.vue";

import NotFound from "../views/NotFound.vue";
import Store from "../store/index.js";
import ProductEdit from "../views/admin/ProductEdit.vue";
const routes = [
    { path: '/', component: ClientHome },
    { path: '/p/:categoryId', component: ItemList },
    { path: '/p/:categoryId/q/:productId', component: Item },
    { path: '/admin/login', component: AdminLogin, meta: { authAdmin: false } },
    { path: '/admin/dashboard', component: Dashboard, meta: { authAdmin: true } },
    { path: '/admin/product', component: Product, meta: { authAdmin: true } },
    { path: '/admin/product/setup/:categoryId', component: ProductSetup, meta: { authAdmin: true } },
    { path: '/admin/product/setup/:categoryId/create', component: ProductCreate, meta: { authAdmin: true } },
    { path: '/admin/product/setup/:categoryId/edit/:productId', component: ProductEdit, meta: { authAdmin: true } },
    { path: '/admin/settings', component: Settings, meta: { authAdmin: true } },

    { path: '/:pathMatch(.*)*', component: NotFound }
];

const router = createRouter({
    history: createWebHistory(""),
    routes,
});

router.beforeEach((to, from, next) => {
    const isLoggedInAdmin = Store.getters.isLoggedInAdmin;
    if (to.matched.some(record => record.meta.authAdmin)) {
        if (!isLoggedInAdmin) {
            next('/admin/login');
        } else {
            next();
        }
    } else if (isLoggedInAdmin && (to.path === '/admin/login')) {
        next('/admin/dashboard');
    } else {
        next();
    }
});

export default router;
