
import { mount } from '@vue/test-utils'
import About from '@/components/About.vue' // ✅ Use alias path
import { vi } from 'vitest'

describe('About.vue', () => {
  let wrapper

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders user profile when user prop is passed', () => {
    const user = {
      email: 'test@example.com',
      type: 'Admin',
      address: '123 Main St',
      contact: '123-456-7890',
      employeeId: 'E123',
      branchCode: 'B001'
    }

    wrapper = mount(About, {
      props: { user }
    })

    expect(wrapper.find('.about-card').exists()).toBe(true)
    expect(wrapper.findAll('.info-row').length).toBeGreaterThan(0)
  })

  it('renders loading message when no user prop is passed', () => {
    wrapper = mount(About)

    expect(wrapper.find('.loading').exists()).toBe(true)
    expect(wrapper.text()).toContain('Loading user data...')
  })

  it('copies email to clipboard when copy button is clicked', async () => {
    const user = { email: 'test@example.com' }

    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockResolvedValue()
      }
    })

    wrapper = mount(About, {
      props: { user }
    })

    await wrapper.find('button').trigger('click')

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('test@example.com')
  })
})
