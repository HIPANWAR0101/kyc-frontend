import { createRouter, createWebHistory } from 'vue-router';
// When using TypeScript with Vue SFCs, make sure you have a shim for .vue imports (see below)
import Home from '../pages/Home.vue';
import ContactPage from '../pages/ContactPage.vue';
import Register from '../pages/Register.vue';
import Dashboard from '../pages/Dashboard.vue';
import BankDashboard from '../pages/BankDashboard.vue';
// Strongly typed routes
const routes = [
    { path: '/', component: Home },
    { path: '/register', component: Register },
    { path: '/dashboard', component: Dashboard },
    { path: '/bank-dashboard', component: BankDashboard },
    { path: '/contact', component: ContactPage },
    // 404 / catch-all should stay last
    { path: '/:pathMatch(.*)*', redirect: '/' },
];
const router = createRouter({
    history: createWebHistory(),
    routes,
});
export default router;
