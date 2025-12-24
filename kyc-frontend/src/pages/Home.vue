<template>
  <div class="auth-container">
    <div class="toggle-buttons">
      <button :class="{ active: showLogin }" @click="showLogin = true">Login</button>
      <button :class="{ active: !showLogin }" @click="showLogin = false">Register</button>
    </div>

    <div class="form-wrapper">
      <LoginForm v-if="showLogin" />
      <RegistrationForm v-else />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import LoginForm from '../components/LoginForm.vue'
import RegistrationForm from '../components/RegistrationForm.vue'

const showLogin = ref(true)
</script>

<style scoped>
.auth-container {
  max-width: 400px;
  margin: 40px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.toggle-buttons {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}

.toggle-buttons button {
  flex: 1;
  padding: 10px;
  border: none;
  background-color: #e0e0e0;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;
}

.toggle-buttons button.active {
  background-color: #35495e;
  color: white;
}

.form-wrapper {
  padding: 10px;
}
</style>
