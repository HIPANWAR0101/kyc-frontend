
import { mount } from '@vue/test-utils'
import ContactCTA from '@/components/ContactCTA.vue' // ✅ Use alias path
import { useRouter } from 'vue-router'
import { vi } from 'vitest'

vi.mock('vue-router', () => ({
  useRouter: vi.fn()
}))

describe('ContactCTA.vue', () => {
  let wrapper

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the contact section with heading', () => {
    wrapper = mount(ContactCTA)

    expect(wrapper.find('.contact-cta').exists()).toBe(true)
    expect(wrapper.find('h2').text()).toBe('Need Help?')
  })

  it('navigates to contact page when button is clicked', async () => {
    const push = vi.fn()
    useRouter.mockReturnValue({ push })

    wrapper = mount(ContactCTA)

    await wrapper.find('button').trigger('click')

    expect(push).toHaveBeenCalledWith('/contact')
  })
})
