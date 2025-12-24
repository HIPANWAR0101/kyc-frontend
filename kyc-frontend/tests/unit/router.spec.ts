import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import { nextTick } from 'vue'

// Import components
import Home from '../../src/pages/Home.vue'
import ContactPage from '../../src/pages/ContactPage.vue'
import Welcome from '../../src/components/Welcome.vue'
import Register from '../../src/pages/Register.vue'
import Dashboard from '../../src/pages/Dashboard.vue'
import BankDashboard from '../../src/pages/BankDashboard.vue'

// Define routes
const routes = [
  { path: '/', component: Home },
  { path: '/register', component: Register },
  { path: '/dashboard', component: Dashboard },
  { path: '/bank-dashboard', component: BankDashboard },
  { path: '/contact', component: ContactPage }
]

// Create router
const router = createRouter({
  history: createWebHistory(),
  routes
})

// Dummy App component to mount router-view
const App = {
  template: '<router-view />'
}

describe('Vue Router', () => {
  beforeEach(async () => {
    router.push('/')
    await router.isReady()
  })

  it.each([
    ['/', Home],
    ['/register', Register],
    ['/dashboard', Dashboard],
    ['/bank-dashboard', BankDashboard],
    ['/contact', ContactPage]
  ])('navigates to %s and renders correct component', async (path, component) => {
    router.push(path)
    await router.isReady()

    const wrapper = mount(App, {
      global: {
        plugins: [router]
      }
    })

    await nextTick()
    expect(wrapper.findComponent(component).exists()).toBe(true)
  })
})
