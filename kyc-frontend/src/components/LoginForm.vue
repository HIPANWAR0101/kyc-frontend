
<template>
  <form class="auth-form" @submit.prevent="handleLogin">
    <div class="radio-group">
      <label><input type="radio" value="customer" v-model="userType" /> Customer</label>
      <label><input type="radio" value="bank" v-model="userType" /> Bank</label>
    </div>

    <input v-model="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Password" />

    <button type="submit">Login</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const userType = ref('customer')
const email = ref('')
const password = ref('')
const router = useRouter()

const handleLogin = async () => {
  try {
    //const response = await axios.post('http://localhost:3000/api/login', {
    const response = await axios.post('/api/login', {
      email: email.value,
      password: password.value,
      type: userType.value
    }, { withCredentials: true })

    if (response.data.success) {
      alert('Login successful!')
      router.push(userType.value === 'bank' ? '/bank-dashboard' : '/dashboard')
    }
  } catch (err) {
    alert(err.response?.data?.message || 'Login failed')
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
  background-color: #35495e;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.radio-group {
  display: flex;
  justify-content: space-around;
}
</style>
