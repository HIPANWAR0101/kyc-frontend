import { mount } from '@vue/test-utils'
import LoginForm from '@/components/LoginForm.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { vi } from 'vitest'
import axios from 'axios'

vi.mock('axios')

const router = createRouter({
  history: createWebHistory(),
  routes: [] // You can define routes if needed
})

describe('LoginForm.vue', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders form inputs and radio buttons', async () => {
    const wrapper = mount(LoginForm, {
      global: {
        plugins: [router]
      }
    })

    expect(wrapper.find('input[placeholder="Email"]').exists()).toBe(true)
    expect(wrapper.find('input[type="password"]').exists()).toBe(true)
    expect(wrapper.findAll('input[type="radio"]').length).toBe(2)
  })

  it('submits form and redirects on success', async () => {
    axios.post.mockResolvedValue({ data: { success: true } })
    window.alert = vi.fn()

    const wrapper = mount(LoginForm, {
      global: {
        plugins: [router]
      }
    })

    await wrapper.find('input[placeholder="Email"]').setValue('test@example.com')
    await wrapper.find('input[type="password"]').setValue('password123')
    await wrapper.find('form').trigger('submit.prevent')

    expect(axios.post).toHaveBeenCalled()
    // You can also spy on router.push if needed
  })

  it('shows alert on login failure', async () => {
    axios.post.mockRejectedValue({ response: { data: { message: 'Invalid credentials' } } })
    window.alert = vi.fn()

    const wrapper = mount(LoginForm, {
      global: {
        plugins: [router]
      }
    })

    await wrapper.find('input[placeholder="Email"]').setValue('wrong@example.com')
    await wrapper.find('input[type="password"]').setValue('wrongpass')
    await wrapper.find('form').trigger('submit.prevent')

    expect(window.alert).toHaveBeenCalledWith('Invalid credentials')
  })
})
