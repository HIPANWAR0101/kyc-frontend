


<template>
  <div id="app" class="full-height">
    <Navbar />
    <router-view />
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue'
</script>

<style>
.full-height {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #aad2f8; /* Optional: apply here if you want global background */
}
</style>
