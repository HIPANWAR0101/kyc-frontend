# ContactCTA.vue

## Overview

A Vue component that displays a call-to-action section for contacting support.  
It includes a heading, a message, and a button that navigates the user to the contact page.

## Props

_None_

## Events

_None_

## Methods

### goToContact
- **Description:** Navigates the user to the `/contact` route using Vue Router.

## Usage

```vue
<ContactCTA />
```

## Example

```vue
<template>
  <section class="contact-cta">
    <h2>Need Help?</h2>
    <p>Contact our support team for assistance.</p>
    <button @click="goToContact">Contact Us</button>
  </section>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const goToContact = () => {
  router.push('/contact')
}
</script>
```

## Style

```css
.contact-cta {
  padding: 40px 20px;
  text-align: center;
  background-color: #35495e;
  color: white;
}
.contact-cta button {
  margin-top: 20px;
  padding: 12px 24px;
  background-color: white;
  color: #35495e;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
```