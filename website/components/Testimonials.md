# Testimonials.vue

## Overview

A Vue component that displays user testimonials in a styled section.  
It shows a heading and a list of quotes with authors, styled as blockquotes.

## Props

_None_

## Events

_None_

## Data

### testimonials
- **Type:** Array of objects
- **Description:** List of testimonial quotes and their authors.
- **Example:**
  ```js
  [
    { text: 'Super easy to use and very secure!', author: 'Amit P.' },
    { text: 'OCR feature saved me so much time.', author: 'Neha S.' },
    { text: 'Highly recommend for any business.', author: 'Ravi T.' }
  ]
  ```

## Usage

```vue
<Testimonials />
```

## Example

```vue
<template>
  <section class="testimonials">
    <h2>What Our Users Say</h2>
    <div class="quotes">
      <blockquote v-for="(quote, index) in testimonials" :key="index">
        “{{ quote.text }}”
        <footer>— {{ quote.author }}</footer>
      </blockquote>
    </div>
  </section>
</template>

<script setup>
const testimonials = [
  { text: 'Super easy to use and very secure!', author: 'Amit P.' },
  { text: 'OCR feature saved me so much time.', author: 'Neha S.' },
  { text: 'Highly recommend for any business.', author: 'Ravi T.' }
]
</script>
```

## Style

```css
.testimonials {
  padding: 40px 20px;
  background-color: #eef2f7;
  text-align: center;
}
.quotes {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}
blockquote {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  font-style: italic;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}
footer {
  margin-top: 10px;
  font-weight: bold;
}
```