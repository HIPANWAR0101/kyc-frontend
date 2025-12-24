// tests/unit/App.spec.js
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import App from '@/App.vue'
import Navbar from '@/components/Navbar.vue'

// Dummy route for router-view
const routes = [
  {
    path: '/',
    component: {
      template: '<div class="dummy-view">Dummy View</div>'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

describe('App.vue', () => {
  it('renders the Navbar component', async () => {
    router.push('/')
    await router.isReady()

    const wrapper = mount(App, {
      global: {
        plugins: [router],
        stubs: {
          Navbar
        }
      }
    })

    expect(wrapper.findComponent(Navbar).exists()).toBe(true)
  })

  it('renders the router-view content', async () => {
    router.push('/')
    await router.isReady()

    const wrapper = mount(App, {
      global: {
        plugins: [router]
      }
    })

    expect(wrapper.html()).toContain('Dummy View')
  })
})
