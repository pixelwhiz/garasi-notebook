import { createRouter, createWebHistory } from 'vue-router';
import ClientHome from '../views/client/Home.vue';
import ClientRegister from '../views/client/Register.vue';
import ClientLogin from '../views/client/Login.vue';

const routes = [
    { path: '/', component: ClientHome },
    { path: '/accounts/register', component: ClientRegister },
    { path: '/accounts/login', component: ClientLogin },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
