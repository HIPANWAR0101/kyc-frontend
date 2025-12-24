
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'

import ContactPage from '../pages/ContactPage.vue'

import Welcome from '../components/Welcome.vue'

import Register from '../pages/Register.vue'
import Dashboard from '../pages/Dashboard.vue'
import BankDashboard from '../pages/BankDashboard.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/register', component: Register },
  { path: '/dashboard', component: Dashboard },
  { path: '/bank-dashboard', component: BankDashboard },
  { path: '/contact', component: ContactPage },
  
{ path: '/:pathMatch(.*)*', redirect: '/' }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
