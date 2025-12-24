
<template>
  <section class="features">
    <h2>Why Choose Us?</h2>
    <div class="grid">
      <div class="feature" v-for="feature in features" :key="feature.title">
        <h3>{{ feature.title }}</h3>
        <p>{{ feature.description }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
const features = [
  { title: 'Secure', description: 'Your data is protected with top-grade encryption.' },
  { title: 'Fast', description: 'Quick KYC processing with OCR and AI.' },
  { title: 'User-Friendly', description: 'Simple and intuitive interface for everyone.' }
]
</script>



<style scoped>
.features {
  padding: 40px 20px;
  text-align: center;
}

.grid {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}

.feature {
  position: relative;
  background-size: cover;
  background-position: center;
  padding: 0;
  border-radius: 8px;
  width: 250px;
  height: 200px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;
}

/* Dark overlay box for text */
.feature::before {
  content: '';
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5); /* semi-transparent black */
  z-index: 1;
}

.feature h3,
.feature p {
  position: relative;
  z-index: 2;
  color: white;
  padding: 10px 15px;
  text-align: left;
}

.feature:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* Assign background images */
.feature:nth-child(1) {
  background-image: url('../assets/images/secure.avif');
}
.feature:nth-child(2) {
  background-image: url('../assets/images/fast.jpg');
}
.feature:nth-child(3) {
  background-image: url('../assets/images/user-friendly.jpg');
}
</style>
