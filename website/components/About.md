# About.vue

## Overview

A Vue component that displays a user profile card.  
Shows user details such as email, type, address, contact, employee ID, and branch code.  
Includes copy-to-clipboard functionality for email and contact fields.

## Props

### user
- **Type:** `Object`
- **Required:** Yes
- **Description:** The user object containing profile information.

## Events

_None_

## Methods

### copyToClipboard(text)
- **Arguments:** `text` (String)
- **Description:** Copies the provided text to the clipboard and shows an alert.

## Usage

```vue
<About :user="userObject" />
```

## Example

```vue
<template>
  <div v-if="user" class="about-card">
    <h2>User Profile</h2>
    <div class="info-row">
      <i class="fas fa-envelope"></i>
      <span><strong>Email:</strong> {{ user.email }}</span>
      <button @click="copyToClipboard(user.email)">📋</button>
    </div>
    <div class="info-row">
      <i class="fas fa-user-tag"></i>
      <span><strong>Type:</strong> {{ user.type }}</span>
    </div>
    <div v-if="user.address" class="info-row">
      <i class="fas fa-map-marker-alt"></i>
      <span><strong>Address:</strong> {{ user.address }}</span>
    </div>
    <div v-if="user.contact" class="info-row">
      <i class="fas fa-phone"></i>
      <span><strong>Contact:</strong> {{ user.contact }}</span>
      <button @click="copyToClipboard(user.contact)">📋</button>
    </div>
    <div v-if="user.employeeId" class="info-row">
      <i class="fas fa-id-badge"></i>
      <span><strong>Employee ID:</strong> {{ user.employeeId }}</span>
    </div>
    <div v-if="user.branchCode" class="info-row">
      <i class="fas fa-code-branch"></i>
      <span><strong>Branch Code:</strong> {{ user.branchCode }}</span>
    </div>
  </div>
  <div v-else class="loading">
    <p>Loading user data...</p>
  </div>
</template>

<script setup>
defineProps(['user'])

function copyToClipboard(text) {
  navigator.clipboard.writeText(text)
  alert('Copied to clipboard!')
}
</script>
```

## Style

```css
.about-card {
  max-width: 500px;
  margin: 30px auto;
  padding: 24px;
  background: linear-gradient(135deg, #f0f4f8, #d9e2ec);
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.about-card:hover {
  transform: scale(1.02);
}

.about-card h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #2c3e50;
}

.info-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 12px 0;
  font-size: 1rem;
  color: #34495e;
}

.info-row i {
  color: #3498db;
  min-width: 20px;
}

.info-row button {
  margin-left: auto;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
}

.loading {
  text-align: center;
  font-size: 1.2rem;
  color: #888;
}
```
