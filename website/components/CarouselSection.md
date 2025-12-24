# CarouselSection.vue

## Overview

A Vue component that displays an image carousel using [vue3-carousel](https://ismail9k.github.io/vue3-carousel/).  
It cycles through a set of images with autoplay, wrap-around, and transition effects.

## Props

_None_

## Events

_None_

## Data

### images
- **Type:** `Array`
- **Description:** Array of image URLs to display in the carousel.

## Usage

```vue
<CarouselSection />
```

## Example

```vue
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
```

## Style

```css
.carousel-image {
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: