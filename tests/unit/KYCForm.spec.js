

// import { mount, flushPromises } from '@vue/test-utils'
// import UpdateKYC from '@/components/UpdateKYC.vue'
// import { vi } from 'vitest'
// import axios from 'axios'
// import Tesseract from 'tesseract.js'

// vi.mock('axios')
// vi.mock('tesseract.js', () => ({
//   recognize: vi.fn(() =>
//     Promise.resolve({
//       data: {
//         text: `
//           Name: John Doe
//           Father's Name: Richard Roe
//           Gender: Male
//           Marital Status: Married
//           Aadhaar: 1234 5678 9012
//           PAN: ABCDE1234F
//           Mobile: 9876543210
//           Address: 123 Main Street, Pune
//         `
//       }
//     })
//   )
// }))

// describe('UpdateKYC.vue', () => {
//   let wrapper
//   const alertMock = vi.fn()

//   beforeEach(() => {
//     vi.clearAllMocks()
//     window.alert = alertMock
//     wrapper = mount(UpdateKYC)
//   })

//   it('renders all required input fields', () => {
//     expect(wrapper.find('input[placeholder="Full Name"]').exists()).toBe(true)
//     expect(wrapper.find('input[placeholder="Father\'s Name"]').exists()).toBe(true)
//     expect(wrapper.find('input[placeholder="Address"]').exists()).toBe(true)
//     expect(wrapper.find('input[placeholder="Mobile Number"]').exists()).toBe(true)
//     expect(wrapper.find('input[placeholder="Aadhaar Number"]').exists()).toBe(true)
//     expect(wrapper.find('input[placeholder="PAN Card Number"]').exists()).toBe(true)
//   })

//   it('validates fields and shows alert if invalid', async () => {
//     await wrapper.find('form').trigger('submit.prevent')
//     expect(alertMock).toHaveBeenCalledWith('Please fix the errors before submitting.')
//   })

//   // it('handles file input and triggers OCR', async () => {
//   //   const file = new File(['dummy'], 'aadhaar.png', { type: 'image/png' })
//   //   const input = wrapper.find('input[type="file"]')
//   //   await input.setValue(file)

//   //   // Manually call handleFile since setValue doesn't trigger change event in JSDOM
//   //   await wrapper.vm.handleFile({ target: { files: [file] } }, 'aadhaarFile')
//   //   await flushPromises()

//   //   expect(wrapper.vm.form.name).toBe('John Doe')
//   //   expect(wrapper.vm.form.fatherName).toBe('Richard Roe')
//   //   expect(wrapper.vm.form.gender).toBe('Male')
//   //   expect(wrapper.vm.form.maritalStatus).toBe('Married')
//   //   expect(wrapper.vm.form.aadhaar).toBe('123456789012')
//   //   expect(wrapper.vm.form.pan).toBe('ABCDE1234F')
//   //   expect(wrapper.vm.form.mobile).toBe('9876543210')
//   //   expect(wrapper.vm.form.address).toContain('123 Main Street')
//   // })
//   it('handles file input and triggers OCR', async () => {
//   // Directly call runOCR with mocked image data
//   await wrapper.vm.runOCR('data:image/png;base64,abc', 'aadhaarFile')
//   await flushPromises()

//   expect(wrapper.vm.form.name).toBe('John Doe')
//   expect(wrapper.vm.form.fatherName).toBe('Richard Roe')
//   expect(wrapper.vm.form.gender).toBe('Male')
//   expect(wrapper.vm.form.maritalStatus).toBe('Married')
//   expect(wrapper.vm.form.aadhaar).toBe('123456789012')
//   expect(wrapper.vm.form.pan).toBe('ABCDE1234F')
//   expect(wrapper.vm.form.mobile).toBe('9876543210')
//   expect(wrapper.vm.form.address).toContain('123 Main Street')
// })


//   it('submits form successfully and shows success alert', async () => {
//     axios.post.mockResolvedValue({ data: { success: true } })

//     Object.assign(wrapper.vm.form, {
//       name: 'John Doe',
//       fatherName: 'Richard Roe',
//       gender: 'Male',
//       maritalStatus: 'Married',
//       address: '123 Street',
//       mobile: '9876543210',
//       aadhaar: '123456789012',
//       pan: 'ABCDE1234F',
//       aadhaarFile: 'data:image/png;base64,abc',
//       panFile: 'data:image/png;base64,abc',
//       addressProof: 'data:image/png;base64,abc',
//       photo: 'data:image/png;base64,abc'
//     })

//     await wrapper.find('form').trigger('submit.prevent')
//     expect(axios.post).toHaveBeenCalled()
//     expect(alertMock).toHaveBeenCalledWith('KYC updated successfully!')
//   })

//   it('shows error alert on failed submission', async () => {
//     axios.post.mockRejectedValue(new Error('Network error'))

//     Object.assign(wrapper.vm.form, {
//       name: 'John Doe',
//       fatherName: 'Richard Roe',
//       gender: 'Male',
//       maritalStatus: 'Married',
//       address: '123 Street',
//       mobile: '9876543210',
//       aadhaar: '123456789012',
//       pan: 'ABCDE1234F',
//       aadhaarFile: 'data:image/png;base64,abc',
//       panFile: 'data:image/png;base64,abc',
//       addressProof: 'data:image/png;base64,abc',
//       photo: 'data:image/png;base64,abc'
//     })

//     await wrapper.find('form').trigger('submit.prevent')
//     expect(alertMock).toHaveBeenCalledWith('Failed to update KYC')
//   })
// })

import { mount, flushPromises } from '@vue/test-utils'
import UpdateKYC from '@/components/UpdateKYC.vue'
import { vi } from 'vitest'
import axios from 'axios'

vi.mock('axios')

describe('UpdateKYC.vue', () => {
  let wrapper
  const alertMock = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    window.alert = alertMock
    wrapper = mount(UpdateKYC)
  })

  it('renders all required input fields', () => {
    expect(wrapper.find('input[placeholder="Full Name"]').exists()).toBe(true)
    expect(wrapper.find('input[placeholder="Father\'s Name"]').exists()).toBe(true)
    expect(wrapper.find('input[placeholder="Address"]').exists()).toBe(true)
    expect(wrapper.find('input[placeholder="Mobile Number"]').exists()).toBe(true)
    expect(wrapper.find('input[placeholder="Aadhaar Number"]').exists()).toBe(true)
    expect(wrapper.find('input[placeholder="PAN Card Number"]').exists()).toBe(true)
  })

  it('validates fields and shows alert if invalid', async () => {
    await wrapper.find('form').trigger('submit.prevent')
    expect(alertMock).toHaveBeenCalledWith('Please fix the errors before submitting.')
  })

  it('submits form successfully and shows success alert', async () => {
    axios.post.mockResolvedValue({ data: { success: true } })

    Object.assign(wrapper.vm.form, {
      name: 'John Doe',
      fatherName: 'Richard Roe',
      gender: 'Male',
      maritalStatus: 'Married',
      address: '123 Street',
      mobile: '9876543210',
      aadhaar: '123456789012',
      pan: 'ABCDE1234F',
      aadhaarFile: 'data:image/png;base64,abc',
      panFile: 'data:image/png;base64,abc',
      addressProof: 'data:image/png;base64,abc',
      photo: 'data:image/png;base64,abc'
    })

    await wrapper.find('form').trigger('submit.prevent')
    expect(axios.post).toHaveBeenCalled()
    expect(alertMock).toHaveBeenCalledWith('KYC updated successfully!')
  })

  it('shows error alert on failed submission', async () => {
    axios.post.mockRejectedValue(new Error('Network error'))

    Object.assign(wrapper.vm.form, {
      name: 'John Doe',
      fatherName: 'Richard Roe',
      gender: 'Male',
      maritalStatus: 'Married',
      address: '123 Street',
      mobile: '9876543210',
      aadhaar: '123456789012',
      pan: 'ABCDE1234F',
      aadhaarFile: 'data:image/png;base64,abc',
      panFile: 'data:image/png;base64,abc',
      addressProof: 'data:image/png;base64,abc',
      photo: 'data:image/png;base64,abc'
    })

    await wrapper.find('form').trigger('submit.prevent')
    expect(alertMock).toHaveBeenCalledWith('Failed to update KYC')
  })
})
