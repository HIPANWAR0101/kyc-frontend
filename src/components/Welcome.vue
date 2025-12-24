<template>
  <div class="welcome-page">
    <HeroSection />
    <CarouselSection />
    <FeaturesGrid />
    <Testimonials />
    <ContactCTA />
  </div>
</template>

<script setup>
import HeroSection from './HeroSection.vue'
import CarouselSection from './CarouselSection.vue'
import FeaturesGrid from './FeaturesGrid.vue'
import Testimonials from './TestiMonials.vue'
import ContactCTA from './ContactCTA.vue'
</script>

<style scoped>
.welcome-page {
  font-family: 'Segoe UI', sans-serif;
  background-color: #f5f7fa;
  color: #333;
}
</style>
