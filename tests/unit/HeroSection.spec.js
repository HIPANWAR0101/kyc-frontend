
import { mount } from '@vue/test-utils'
import HeroSection from '@/components/HeroSection.vue' // ✅ Use alias path
import { vi } from 'vitest'

describe('HeroSection.vue', () => {
  let wrapper

  beforeEach(() => {
    vi.clearAllMocks()
    wrapper = mount(HeroSection)
  })

  it('renders hero section with heading and paragraph', () => {
    expect(wrapper.find('h1').text()).toBe('Welcome to Our Platform')
    expect(wrapper.find('p').text()).toBe('Modern, secure and seamless KYC management.')
  })
})
