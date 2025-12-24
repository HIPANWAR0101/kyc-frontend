<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <router-link class="navbar-brand d-flex align-items-center gap-2" to="/">
        <i class="fas fa-id-card-alt text-success"></i>
        <span>KYC Portal</span>
      </router-link>
      
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <!-- Side buttons removed -->
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
// No script needed
</script>

<style scoped>
.navbar-brand span {
  font-weight: 600;
  font-size: 18px;
}
</style>
