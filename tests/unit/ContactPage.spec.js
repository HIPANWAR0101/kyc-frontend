

// import { mount } from '@vue/test-utils'
// import ContactPage from '@/pages/ContactPage.vue' // ✅ Use alias path
// import { useRouter } from 'vue-router'
// import { vi } from 'vitest'

// vi.mock('vue-router', () => ({
//   useRouter: vi.fn()
// }))

// describe('ContactPage.vue', () => {
//   let wrapper

//   beforeEach(() => {
//     vi.clearAllMocks()
//   })

//   it('renders contact information and navigates on button click', async () => {
//     const push = vi.fn()
//     useRouter.mockReturnValue({ push })

//     wrapper = mount(ContactPage)

//     expect(wrapper.text()).toContain('Contact Us')
//     expect(wrapper.text()).toContain('kyc@example.com')
//     expect(wrapper.text()).toContain('1800-123-4567')

//     await wrapper.find('button').trigger('click')

//     expect(push).toHaveBeenCalledWith('/dashboard')
//   })
// })


// tests/ContactPage.spec.js
import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import ContactPage from '@/pages/ContactPage.vue'
import { createRouter, createMemoryHistory } from 'vue-router'

describe('ContactPage.vue', () => {
  const push = vi.fn()

  const router = createRouter({
    history: createMemoryHistory(),
    routes: [{ path: '/dashboard', name: 'Dashboard' }]
  })
  router.push = push

  it('renders contact info and button', async () => {
    const wrapper = mount(ContactPage, {
      global: {
        plugins: [router]
      }
    })

    expect(wrapper.text()).toContain('Contact Us')
    expect(wrapper.text()).toContain('support@kyc.com')
    expect(wrapper.text()).toContain('1800-123-4567')
    expect(wrapper.find('button.back-button').exists()).toBe(true)
  })

  it('navigates to dashboard on button click', async () => {
    const wrapper = mount(ContactPage, {
      global: {
        plugins: [router]
      }
    })

    await wrapper.find('button.back-button').trigger('click')
    expect(push).toHaveBeenCalledWith('/dashboard')
  })
})
