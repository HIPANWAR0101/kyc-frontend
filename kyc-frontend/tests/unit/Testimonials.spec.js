
import { mount } from '@vue/test-utils'
import Testimonials from '@/components/Testimonials.vue' // ✅ Use alias path
import { vi } from 'vitest'

describe('Testimonials.vue', () => {
  let wrapper

  beforeEach(() => {
    vi.clearAllMocks()
    wrapper = mount(Testimonials)
  })

  it('renders all testimonial quotes', () => {
    const quotes = [
      'Super easy to use and very secure!',
      'OCR feature saved me so much time.',
      'Highly recommend for any business.'
    ]

    quotes.forEach(text => {
      expect(wrapper.text()).toContain(text)
    })
  })
})

