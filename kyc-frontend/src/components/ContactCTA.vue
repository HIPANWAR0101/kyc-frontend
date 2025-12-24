
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

<style scoped>
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
</style>
