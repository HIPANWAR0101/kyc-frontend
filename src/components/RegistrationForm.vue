
<template>
  <form class="auth-form" @submit.prevent="handleRegister">
    <div class="radio-group">
      <label><input type="radio" value="customer" v-model="userType" /> Customer</label>
      <label><input type="radio" value="bank" v-model="userType" /> Bank</label>
    </div>

    <input v-model="name" placeholder="Name" @blur="validateField('name')" @input="validateField('name')" />
    <span v-if="errors.name" class="error">{{ errors.name }}</span>

    <input v-model="email" placeholder="Email" @blur="validateField('email')" @input="validateField('email')" />
    <span v-if="errors.email" class="error">{{ errors.email }}</span>

    <input v-model="password" type="password" placeholder="Password" @blur="validateField('password')" @input="validateField('password')" />
    <span v-if="errors.password" class="error">{{ errors.password }}</span>

    <input v-if="userType === 'customer'" v-model="address" placeholder="Address" @blur="validateField('address')" @input="validateField('address')" />
    <span v-if="userType === 'customer' && errors.address" class="error">{{ errors.address }}</span>

    <input v-if="userType === 'customer'" v-model="contact" placeholder="Contact" @blur="validateField('contact')" @input="validateField('contact')" />
    <span v-if="userType === 'customer' && errors.contact" class="error">{{ errors.contact }}</span>

    <input v-if="userType === 'bank'" v-model="employeeId" placeholder="Employee ID" @blur="validateField('employeeId')" @input="validateField('employeeId')" />
    <span v-if="userType === 'bank' && errors.employeeId" class="error">{{ errors.employeeId }}</span>

    <input v-if="userType === 'bank'" v-model="branchCode" placeholder="Branch Code" @blur="validateField('branchCode')" @input="validateField('branchCode')" />
    <span v-if="userType === 'bank' && errors.branchCode" class="error">{{ errors.branchCode }}</span>

    <button type="submit">Register</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const userType = ref('customer')
const name = ref('')
const email = ref('')
const password = ref('')
const address = ref('')
const contact = ref('')
const employeeId = ref('')
const branchCode = ref('')
const errors = ref({})
const router = useRouter()

function validateField(field) {
  switch (field) {
    case 'name':
      if (!name.value.trim()) {
        errors.value.name = 'Name is required.'
      } else if (!/^[A-Za-z\s]{2,}$/.test(name.value)) {
        errors.value.name = 'Name must be at least 2 letters and contain only letters and spaces.'
      } else {
        delete errors.value.name
      }
      break
    case 'email':
      if (!email.value.trim()) {
        errors.value.email = 'Email is required.'
      } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email.value)) {
        errors.value.email = 'Invalid email format.'
      } else {
        delete errors.value.email
      }
      break
    case 'password':
  if (!password.value) {
    errors.value.password = 'Password is required.'
  } else if (password.value.length < 8) {
    errors.value.password = 'Password must be at least 8 characters.'
  } else {
    delete errors.value.password
  }
  break
    case 'address':
      if (userType.value === 'customer') {
        if (!address.value.trim()) {
          errors.value.address = 'Address is required.'
        } else {
          delete errors.value.address
        }
      }
      break
    case 'contact':
      if (userType.value === 'customer') {
        if (!contact.value.trim()) {
          errors.value.contact = 'Contact is required.'
        } else if (!/^\d{10}$/.test(contact.value)) {
          errors.value.contact = 'Contact must be a 10-digit number.'
        } else {
          delete errors.value.contact
        }
      }
      break
    case 'employeeId':
      if (userType.value === 'bank') {
        if (!employeeId.value.trim()) {
          errors.value.employeeId = 'Employee ID is required.'
        } else {
          delete errors.value.employeeId
        }
      }
      break
    case 'branchCode':
      if (userType.value === 'bank') {
        if (!branchCode.value.trim()) {
          errors.value.branchCode = 'Branch Code is required.'
        } else {
          delete errors.value.branchCode
        }
      }
      break
  }
}

const handleRegister = async () => {
  validateField('name')
  validateField('email')
  validateField('password')
  if (userType.value === 'customer') {
    validateField('address')
    validateField('contact')
  }
  if (userType.value === 'bank') {
    validateField('employeeId')
    validateField('branchCode')
  }

  if (Object.keys(errors.value).length > 0) return

  try {
   // const response = await axios.post('http://localhost:3000/api/register', {
   const response = await axios.post('/api/register', {
      type: userType.value,
      name: name.value,
      email: email.value,
      password: password.value,
      address: address.value,
      contact: contact.value,
      employeeId: employeeId.value,
      branchCode: branchCode.value
    })

    if (response.data.success) {
      alert('Registration successful!')
      router.push('/')
    }
  } catch (err) {
    alert(err.response?.data?.message || 'Registration failed')
  }
}
</script>

<style scoped>
.auth-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.auth-form input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
}



.auth-form button {
  padding: 10px;
  background-color: #023d51; /* old green */
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}


.radio-group {
  display: flex;
  justify-content: space-around;
}

.error {
  color: #d32f2f;
  font-size: 0.9em;
  margin-bottom: -8px;
  margin-top: -8px;
}
</style>
