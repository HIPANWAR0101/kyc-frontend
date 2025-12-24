
<template>
  <Carousel :autoplay="3000" :wrap-around="true" :transition="500">
    <Slide v-for="(img, index) in images" :key="index">
      <img :src="img" class="carousel-image" />
    </Slide>
  </Carousel>
</template>

<script setup>
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide } from 'vue3-carousel'


const images = [
   new URL('../assets/images/banner1.jpg', import.meta.url).href,
   new URL('../assets/images/banner2.png', import.meta.url).href, 
   new URL('../assets/images/banner3.webp', import.meta.url).href
]

</script>

<style scoped>
.carousel-image {
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 10px;
}
</style> 
