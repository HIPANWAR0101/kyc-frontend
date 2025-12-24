<template>
  <section class="contact-page">
    <h1>Contact Us</h1>
    <p>If you have any questions or need assistance, feel free to reach out to us.</p>

    <div class="contact-info">
      <div class="info-box">
        <i class="fas fa-envelope"></i>
        <div>
          <h3>Email</h3>
          <p>support@kyc.com</p>
        </div>
      </div>

      <div class="info-box">
        <i class="fas fa-phone-alt"></i>
        <div>
          <h3>Customer Care</h3>
          <p>1800-123-4567 (Toll-Free)</p>
        </div>
      </div>
    </div>

    <!-- 👇 Back to Dashboard Button -->
    <button class="back-button" @click="goToDashboard">Back to Main Menu</button>
  </section>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const goToDashboard = () => {
  router.push('/dashboard') // 👈 This now routes to the Dashboard page
}
</script>

<style scoped>
.contact-page {
  max-width: 700px;
  margin: 40px auto;
  padding: 30px;
  background: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
}
.contact-page h1 {
  color: #35495e;
  margin-bottom: 10px;
}
.contact-page p {
  color: #666;
  margin-bottom: 30px;
}
.contact-info {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.info-box {
  display: flex;
  align-items: center;
  gap: 15px;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}
.info-box i {
  font-size: 24px;
  color: #42b983;
}
.info-box h3 {
  margin: 0;
  color: #333;
}
.info-box p {
  margin: 4px 0 0;
  color: #555;
}
.back-button {
  margin-top: 30px;
  padding: 12px 24px;
  background-color: #35495e;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
.back-button:hover {
  background-color: #2c3e50;
}
</style>
