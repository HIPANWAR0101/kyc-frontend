
import { mount } from '@vue/test-utils'
import FeaturesGrid from '@/components/FeaturesGrid.vue' // ✅ Use alias path
import { vi } from 'vitest'

describe('FeaturesGrid.vue', () => {
  let wrapper

  beforeEach(() => {
    vi.clearAllMocks()
    wrapper = mount(FeaturesGrid)
  })

  it('renders all feature cards with correct titles', () => {
    const featureTitles = ['Secure', 'Fast', 'User-Friendly']

    featureTitles.forEach(title => {
      expect(wrapper.text()).toContain(title)
    })
  })
})
