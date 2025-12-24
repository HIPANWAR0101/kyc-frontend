
import { mount, flushPromises } from '@vue/test-utils'
import Dashboard from '@/pages/Dashboard.vue'
import axios from 'axios'
import { createRouter, createMemoryHistory } from 'vue-router'
import { vi, describe, it, expect, beforeEach } from 'vitest'
import { h } from 'vue'

vi.mock('axios')

describe('Dashboard.vue', () => {
  let wrapper
  let router

  const mockUser = {
    name: 'Hiyashri',
    kycStatus: 'Approved'
  }

  beforeEach(async () => {
    vi.clearAllMocks()

    axios.get.mockResolvedValue({ data: { success: true, user: mockUser } })
    axios.post.mockResolvedValue({ data: { success: true } })

    router = createRouter({
      history: createMemoryHistory(),
      routes: [
        {
          path: '/',
          name: 'Home',
          component: { render: () => h('div', 'Home') } // ✅ dummy component to avoid router warning
        }
      ]
    })

    wrapper = mount(Dashboard, {
      global: {
        plugins: [router]
      }
    })

    vi.useFakeTimers()
    vi.advanceTimersByTime(300)
    await flushPromises()
  })

  it('shows notification panel when bell is clicked', async () => {
    const bellButton = wrapper.findAll('button')[0]
    await bellButton.trigger('click')

    expect(wrapper.find('.notification-panel').exists()).toBe(true)
    expect(wrapper.text()).toContain('KYC Status:')
  })

  it('logs out and redirects to home', async () => {
    const logoutButton = wrapper.findAll('button')[1]
    await logoutButton.trigger('click')

    await flushPromises()
    expect(router.currentRoute.value.fullPath).toBe('/')
  })
})
