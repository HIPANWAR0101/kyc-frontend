
import { mount } from '@vue/test-utils'
import CarouselSection from '@/components/CarouselSection.vue' // ✅ Use alias path
import { Carousel, Slide } from 'vue3-carousel'
import { vi } from 'vitest'

describe('CarouselSection.vue', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(CarouselSection)
  })

  it('renders the carousel component', () => {
    expect(wrapper.findComponent(Carousel).exists()).toBe(true)
  })

  it('renders exactly 4 slides including clones', () => {
  const slides = wrapper.findAllComponents(Slide)
  expect(slides.length).toBe(4)
})

})
