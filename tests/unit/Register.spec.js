
import { mount } from '@vue/test-utils'
import Register from '@/pages/Register.vue' // ✅ Use alias path
import RegistrationForm from '@/components/RegistrationForm.vue'
import { vi } from 'vitest'

describe('Register.vue', () => {
  let wrapper

  beforeEach(() => {
    vi.clearAllMocks()
    wrapper = mount(Register)
  })

  it('renders the registration form component', () => {
    expect(wrapper.findComponent(RegistrationForm).exists()).toBe(true)
  })

  it('displays the register heading', () => {
    expect(wrapper.text()).toContain('Register')
  })
})
