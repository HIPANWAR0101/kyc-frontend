
// import { mount, flushPromises } from '@vue/test-utils'
// import BankDashboard from '@/pages/BankDashboard.vue' // ✅ Use alias path
// import axios from 'axios'
// import { createRouter, createMemoryHistory } from 'vue-router'
// import { vi } from 'vitest'

// vi.mock('axios')

// describe('BankDashboard.vue', () => {
//   let wrapper
//   const mockCustomers = [
//     {
//       name: 'John Doe',
//       email: 'john@example.com',
//       mobile: '1234567890',
//       aadhaar: '1234-5678-9012',
//       pan: 'ABCDE1234F',
//       kycStatus: null
//     }
//   ]

//   const router = createRouter({
//     history: createMemoryHistory(),
//     routes: [{ path: '/', name: 'Home' }]
//   })

//   beforeEach(() => {
//     vi.clearAllMocks()
//     axios.get.mockResolvedValue({
//       data: { success: true, customers: mockCustomers }
//     })
//   })

//   it('fetches and displays customer cards', async () => {
//     wrapper = mount(BankDashboard, {
//       global: { plugins: [router] }
//     })

//     await flushPromises()

//     expect(wrapper.text()).toContain('Customer KYC Requests')
//     expect(wrapper.findAll('.customer-card').length).toBe(1)
//   })

//   it('opens modal on card click and updates status', async () => {
//     axios.post.mockResolvedValue({ data: { success: true } })

//     wrapper = mount(BankDashboard, {
//       global: { plugins: [router] }
//     })

//     await flushPromises()
//     await wrapper.find('.customer-card').trigger('click')

//     expect(wrapper.find('.modal-content').exists()).toBe(true)

//     const approveBtn = wrapper.findAll('button').find(btn => btn.text() === 'Approve')
//     await approveBtn.trigger('click')

//     expect(axios.post).toHaveBeenCalled()
//     expect(wrapper.text()).toContain('Approved')
//   })

//   it('logs out and redirects to home', async () => {
//     wrapper = mount(BankDashboard, {
//       global: { plugins: [router] }
//     })

//     await flushPromises()

//     const logoutBtn = wrapper.find('button')
//     await logoutBtn.trigger('click')

//     expect(router.currentRoute.value.fullPath).toBe('/')
//   })
// })



import { mount, flushPromises } from '@vue/test-utils'
import BankDashboard from '@/pages/BankDashboard.vue'
import axios from 'axios'
import { createRouter, createMemoryHistory } from 'vue-router'
import { vi } from 'vitest'

vi.mock('axios')

describe('BankDashboard.vue', () => {
  let wrapper
  const mockCustomers = [
    {
      name: 'John Doe',
      email: 'john@example.com',
      mobile: '1234567890',
      aadhaar: '1234-5678-9012',
      pan: 'ABCDE1234F',
      kycStatus: null
    }
  ]

  const router = createRouter({
    history: createMemoryHistory(),
    routes: [{ path: '/', name: 'Home' }]
  })

  beforeEach(() => {
    vi.clearAllMocks()
    axios.get.mockResolvedValue({
      data: { success: true, customers: mockCustomers }
    })
  })

  it('fetches and displays customer cards', async () => {
    wrapper = mount(BankDashboard, {
      global: { plugins: [router] }
    })

    await flushPromises()

    expect(wrapper.text()).toContain('Customer KYC Requests')
    expect(wrapper.findAll('.customer-card').length).toBe(1)
  })

  it('logs out and redirects to home', async () => {
    wrapper = mount(BankDashboard, {
      global: { plugins: [router] }
    })

    await flushPromises()

    const logoutBtn = wrapper.find('button')
    await logoutBtn.trigger('click')

    expect(router.currentRoute.value.fullPath).toBe('/')
  })
})


