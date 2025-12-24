# LoginForm.vue

## Overview

A Vue component that provides a login form for both customer and bank users.  
It allows users to select their type, enter their email and password, and log in.  
On successful login, it redirects to the appropriate dashboard.

## Props

_None_

## Events

_None_

## Methods

### handleLogin
- Checks localStorage for users.
- Validates credentials and user type.
- Sets the logged-in user in localStorage.
- Redirects to `/dashboard` (customer) or `/bank-dashboard` (bank).

### goToRegister
- Redirects to the registration page.

## Usage

```vue
<LoginForm />
```

## Example

```vue
<template>
  <form @submit.prevent="handleLogin">
    <div>
      <label>
        <input type="radio" value="customer" v-model="userType" />
        Customer
      </label>
      <label>
        <input type="radio" value="bank" v-model="userType" />
        Bank
      </label>
    </div>
    <div>
      <input v-model="email" placeholder="Email" />
      <input v-model="password" type="password" placeholder="Password" />
    </div>
    <div>
      <button type="submit">Login</button>
      <button type="button" @click="goToRegister">Register</button>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const userType = ref('customer')
const email = ref('')
const password = ref('')
const router = useRouter()

const handleLogin = () => {
  let users = JSON.parse(localStorage.getItem('users')) || []

  const index = users.findIndex(
    user =>
      user.email === email.value &&
      user.password === password.value &&
      user.type === userType.value
  )

  if (index !== -1) {
    users = users.map((u, i) => ({ ...u, isLoggedIn: i === index }))
    localStorage.setItem('users', JSON.stringify(users))
    localStorage.setItem('loggedInUser', JSON.stringify(users[index]))
    alert('Login successful!')
    if (users[index].type === 'bank') {
      router.push('/bank-dashboard')
    } else {
      router.push('/dashboard')
    }
  } else {
    alert('Invalid credentials')
  }
}

const goToRegister = () => {
  router.push('/register')
}
</script>
```