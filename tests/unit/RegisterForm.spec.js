import { mount } from '@vue/test-utils'
import RegistrationForm from '@/components/RegistrationForm.vue'  // ✅ Correct import
import { vi } from 'vitest'
import axios from 'axios'

vi.mock('axios')

describe('RegistrationForm.vue', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('validates required fields and shows errors', async () => {
    const wrapper = mount(RegistrationForm)
    await wrapper.find('form').trigger('submit.prevent')

    expect(wrapper.text()).toContain('Name is required.')
    expect(wrapper.text()).toContain('Email is required.')
    expect(wrapper.text()).toContain('Password is required.')
  })

  it('submits valid customer registration', async () => {
    axios.post.mockResolvedValue({ data: { success: true } })
    window.alert = vi.fn()

    const wrapper = mount(RegistrationForm)

    await wrapper.find('input[placeholder="Name"]').setValue('John Doe')
    await wrapper.find('input[placeholder="Email"]').setValue('john@example.com')
    await wrapper.find('input[placeholder="Password"]').setValue('password123')
    await wrapper.find('input[placeholder="Address"]').setValue('123 Street')
    await wrapper.find('input[placeholder="Contact"]').setValue('9876543210')

    await wrapper.find('form').trigger('submit.prevent')

    expect(axios.post).toHaveBeenCalled()
    expect(window.alert).toHaveBeenCalledWith('Registration successful!')
  })
})
