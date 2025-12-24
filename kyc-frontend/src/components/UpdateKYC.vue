
<template>
  <form class="kyc-form" @submit.prevent="handleSubmit">
    <h2>Update KYC</h2>
    <div class="form-container">
      <div class="upload-section">
        <div>
          <label>Aadhaar Image:</label>
          <input type="file" @change="handleFile($event, 'aadhaarFile')" accept="image/*" required />
        </div>
        <div>
          <label>PAN Image:</label>
          <input type="file" @change="handleFile($event, 'panFile')" accept="image/*" required />
        </div>
        <div>
          <label>Address Proof Image:</label>
          <input type="file" @change="handleFile($event, 'addressProof')" accept="image/*" required />
        </div>
        <div>
          <label>Photo:</label>
          <input type="file" @change="handleFile($event, 'photo')" accept="image/*" required />
        </div>
      </div>

      <div class="details-section">
        <div>
          <input v-model="form.name" @input="validateField('name')" placeholder="Full Name" required />
          <span class="error" v-if="errors.name">{{ errors.name }}</span>
        </div>
        <div>
          <input v-model="form.fatherName" @input="validateField('fatherName')" placeholder="Father's Name" required />
          <span class="error" v-if="errors.fatherName">{{ errors.fatherName }}</span>
        </div>
        <div>
          <select v-model="form.gender" @change="validateField('gender')" required>
            <option disabled value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
          <span class="error" v-if="errors.gender">{{ errors.gender }}</span>
        </div>
        <div>
          <select v-model="form.maritalStatus" @change="validateField('maritalStatus')" required>
            <option disabled value="">Marital Status</option>
            <option>Married</option>
            <option>Unmarried</option>
          </select>
          <span class="error" v-if="errors.maritalStatus">{{ errors.maritalStatus }}</span>
        </div>
        <div>
          <input v-model="form.address" @input="validateField('address')" placeholder="Address" required />
          <span class="error" v-if="errors.address">{{ errors.address }}</span>
        </div>
        <div>
          <input v-model="form.mobile" @input="validateField('mobile')" placeholder="Mobile Number" required />
          <span class="error" v-if="errors.mobile">{{ errors.mobile }}</span>
        </div>
        <div>
          <input v-model="form.aadhaar" @input="validateField('aadhaar')" placeholder="Aadhaar Number" required />
          <span class="error" v-if="errors.aadhaar">{{ errors.aadhaar }}</span>
        </div>
        <div>
          <input v-model="form.pan" @input="validateField('pan')" placeholder="PAN Card Number" required />
          <span class="error" v-if="errors.pan">{{ errors.pan }}</span>
        </div>
      </div>
    </div>

    <div v-if="loading" class="loading-container">
      <div class="spinner"></div>
      <div class="progress-bar">
        <div class="progress" :style="{ width: progress + '%' }"></div>
      </div>
    </div>

    <button type="submit">Save KYC</button>
  </form>
</template>

<script setup>
import { reactive, ref } from 'vue'
import axios from 'axios'
import Tesseract from 'tesseract.js'

const form = reactive({
  name: '',
  fatherName: '',
  gender: '',
  maritalStatus: '',
  address: '',
  mobile: '',
  aadhaar: '',
  pan: '',
  aadhaarFile: null,
  panFile: null,
  addressProof: null,
  photo: null
})

const errors = reactive({
  name: '',
  fatherName: '',
  gender: '',
  maritalStatus: '',
  address: '',
  mobile: '',
  aadhaar: '',
  pan: ''
})

const loading = ref(false)
const progress = ref(0)

const validateField = (field) => {
  const value = form[field]
  switch (field) {
    case 'name':
    case 'fatherName':
      errors[field] = /^[A-Za-z ]+$/.test(value) ? '' : 'Only letters and spaces allowed'
      break
    case 'gender':
    case 'maritalStatus':
    case 'address':
      errors[field] = value ? '' : 'This field is required'
      break
    case 'mobile':
      errors.mobile = /^[6-9][0-9]{9}$/.test(value) ? '' : 'Enter a valid 10-digit mobile number'
      break
    case 'aadhaar':
      errors.aadhaar = /^[0-9]{12}$/.test(value) ? '' : 'Aadhaar must be 12 digits'
      break
    case 'pan':
      errors.pan = /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(value) ? '' : 'Invalid PAN format'
      break
  }
}

const isFormValid = () => {
  Object.keys(errors).forEach(validateField)
  return Object.values(errors).every(e => e === '')
}

const handleSubmit = async () => {
  if (!isFormValid()) {
    alert('Please fix the errors before submitting.')
    return
  }

  try {
   // const response = await axios.post('http://localhost:3000/api/dashboard/customer/update-kyc', form, {
    const response = await axios.post('/api/dashboard/customer/update-kyc', form, {
      withCredentials: true
    })
    if (response.data.success) {
      alert('KYC updated successfully!')
    }
  } catch (err) {
    alert('Failed to update KYC')
    console.error(err)
  }
}

const handleFile = (event, key) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = () => {
      form[key] = reader.result
      runOCR(reader.result, key)
    }
    reader.readAsDataURL(file)
  }
}

const runOCR = async (imageDataUrl, key) => {
  loading.value = true
  progress.value = 0
  try {
    const result = await Tesseract.recognize(imageDataUrl, 'eng', {
      logger: m => {
        if (m.status === 'recognizing text') {
          progress.value = Math.round(m.progress * 100)
        }
      }
    })
    extractDetails(result.data.text, key)
  } catch (err) {
    console.error('OCR failed:', err)
  } finally {
    loading.value = false
  }
}

const extractDetails = (text, key) => {
  const aadhaarMatch = text.match(/\b\d{4}\s\d{4}\s\d{4}\b/)
  const panMatch = text.match(/\b[A-Z]{5}\d{4}[A-Z]\b/)
  const nameMatch = text.match(/(?:Name|NAME)[:\s]*([A-Z][a-zA-Z]+\s+[A-Z][a-zA-Z]+)/)
  const mobileMatch = text.match(/\b[6-9]\d{9}\b/)
  const addressMatch = text.match(/(?:Address|ADDRESS)[:\s]*([\s\S]{10,500})/)
  const genderMatch = text.match(/\b(Male|Female|Other|Transgender)\b/i)
  const fatherMatch = text.match(/(?:S\/O|F\/O|Father's Name|Son of)[:\s]*([A-Z][a-zA-Z]+\s+[A-Z][a-zA-Z]+)/i)
  const maritalMatch = text.match(/\b(Married|Single|Widowed|Divorced)\b/i)

  if (key === 'aadhaarFile' && aadhaarMatch) form.aadhaar = aadhaarMatch[0].replace(/\s/g, '')
  if (key === 'panFile' && panMatch) form.pan = panMatch[0]
  if ((key === 'aadhaarFile' || key === 'panFile') && nameMatch) form.name = nameMatch[1].trim()
  if (key === 'addressProof' && addressMatch) {
    form.address = addressMatch[1].replace(/\s+/g, ' ').trim()
  }
  if (mobileMatch) form.mobile = mobileMatch[0]
  if (genderMatch) form.gender = genderMatch[1]
  if (fatherMatch) form.fatherName = fatherMatch[1].trim()
  if (maritalMatch) form.maritalStatus = maritalMatch[1]
}
</script>

<style scoped>
.kyc-form {
  background: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 30px;
  border-radius: 12px;
  font-family: 'Segoe UI', sans-serif;
  max-width: 900px;
  margin: 0 auto;
}

.kyc-form h2 {
  text-align: center;
  color: #35495e;
  margin-bottom: 20px;
}

.form-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.upload-section,
.details-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.kyc-form input,
.kyc-form select,
.kyc-form input[type="file"],
.kyc-form textarea {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  width: 100%;
  font-size: 14px;
}

.kyc-form label {
  font-weight: 500;
  color: #333;
  margin-bottom: 4px;
}

.kyc-form button {
  margin-top: 20px;
  padding: 12px;
  background-color: #35495e;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.kyc-form button:hover {
  background-color: #2c3e50;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
}

.spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #35495e;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;
  margin-bottom: 10px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.progress-bar {
  width: 100%;
  background-color: #eee;
  border-radius: 4px;
  overflow: hidden;
  height: 8px;
}

.progress {
  height: 100%;
  background-color: #35495e;
  transition: width 0.3s ease;
}

.error {
  color: red;
  font-size: 0.85rem;
  margin-top: -6px;
  margin-bottom: 6px;
}

@media (max-width: 768px) {
  .form-container {
    grid-template-columns: 1fr;
  }
}
</style>
