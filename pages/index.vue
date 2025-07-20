<script setup>

const meta = {
  title: 'Colin Travis Strapi Test',
  description: 'Strapi Test',
  url: 'https://colintravis.com',
  image: 'https://colintravis.com/meta.jpg'
}

useSeoMeta({
  title: meta.title,
  ogTitle: meta.title,
  description: meta.description,
  ogDescription: meta.description,
  ogImage: meta.image,
  twitterCard: 'summary_large_image'
})



</script>

<template>
  <div class="bg-gray dark:bg-slate-900">
    <AppHeader/>
    <!-- <RestaurantTest /> -->
    <!-- <AboutBlock /> -->
  </div>
</template>
