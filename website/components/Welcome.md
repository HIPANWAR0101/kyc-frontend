# Welcome.vue

## Overview

A Vue component that serves as the landing or welcome page for the application.  
It composes several child components to present a complete introduction, including a hero section, carousel, features grid, testimonials, and a contact call-to-action.

## Props

_None_

## Events

_None_

## Usage

```vue
<Welcome />
```

## Example

```vue
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
```

## Style

```css
.welcome-page {
  font-family: 'Segoe UI', sans-serif;
  background-color: #f5f7fa;
  color: #333;
}
```
