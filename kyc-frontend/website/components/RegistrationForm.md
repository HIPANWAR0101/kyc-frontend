# RegistrationForm.vue

## Overview

A registration form component for both customers and bank employees.  
- Dynamically shows fields based on user type (customer/bank).  
- Performs client-side validation for each field.  
- Submits registration data to the backend API.  
- Displays error messages for invalid fields.

## Props

_None_

## Events

_None_

## Data

### userType
- **Type:** `String`
- **Default:** `'customer'`
- **Description:** Determines if the form is for a customer or bank employee.

### name, email, password, address, contact, employeeId, branchCode
- **Type:** `String`
- **Description:** Form fields for user input.

### errors
- **Type:** `Object`
- **Description:** Holds validation error messages for each field.

## Methods

### validateField(field)
Validates a specific field and updates the `errors` object.

### handleRegister()
Validates all fields and submits the registration data to the backend API.

## Usage

```vue
<RegistrationForm />
```

## Example

```vue
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
```

## Style

```css
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
  background-color: #023d51;
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
```