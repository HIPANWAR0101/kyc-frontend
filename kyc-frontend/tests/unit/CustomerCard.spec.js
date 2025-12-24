import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils' // ✅ This was missing
import CustomerCard from '@/components/CustomerCard.vue'

const mockCustomer = {
  name: 'John Doe',
  email: 'john@example.com',
  mobile: '9876543210',
  aadhaar: '1234 5678 9012',
  pan: 'ABCDE1234F',
  aadhaarFile: '/aadhaar.jpg',
  panFile: '/pan.jpg',
  addressProof: '/address.jpg',
  photo: '/photo.jpg',
  kycStatus: null
}

describe('CustomerCard.vue', () => {
  it('renders customer name and status', () => {
    const wrapper = mount(CustomerCard, {
      props: { customer: mockCustomer, index: 0 }
    })
    expect(wrapper.text()).toContain('John Doe')
    expect(wrapper.text()).toContain('Status: Pending')
  })

  it('opens modal on click', async () => {
    const wrapper = mount(CustomerCard, {
      props: { customer: mockCustomer, index: 0 }
    })
    await wrapper.trigger('click')
    expect(wrapper.find('.modal-content').exists()).toBe(true)
  })
})
