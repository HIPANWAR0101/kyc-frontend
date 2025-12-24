# HeroSection.vue

## Overview

A simple Vue component that displays the hero section of the landing page with a title and subtitle.  
No interactivity or props are used.

## Props

_None_

## Events

_None_

## Usage

```vue
<HeroSection />
```

## Example

```vue
<template>
  <section class="hero">
    <h1>Welcome to Our Platform</h1>
    <p>Modern, secure and seamless KYC management.</p>
  </section>
</template>
```

## Style

```css
.hero {
  text-align: center;
  padding: 30px 15px;
  background: linear-gradient(to right, #35495e, #2c3e50);
  color: white;
}
.hero h1 {
  font-size: 2rem;
  margin-bottom: 10px;
}
.hero p {
  margin: 10px 0;
  font-size: 1rem;
}