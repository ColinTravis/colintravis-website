<script setup>
import RestaurantTest from '~/components/restaurant-test.vue';

const title = 'Colin Travis Strapi Test'
const description =
  'Strapi Test'
const image = 'https://colintravis.com/meta.jpg'


useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description,
  ogImage: image,
  twitterCard: 'summary_large_image'
})



</script>
<template>
  <div class="bg-blue-400">
    <RestaurantTest />
    <AboutBlock />
  </div>
</template>
