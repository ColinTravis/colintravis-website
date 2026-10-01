<script setup>
const meta = {
  title: "Colin Travis | Maker",
  description: "Colin Travis is a full-stack maker and builder",
  url: "https://colintravis.com",
  image: "https://colintravis.com/ct_meta.jpg",
};

useSeoMeta({
  title: meta.title,
  ogTitle: meta.title,
  description: meta.description,
  ogDescription: meta.description,
  ogImage: meta.image,
  twitterCard: "summary_large_image",
});
</script>

<template>
  <div class="">
    <!-- <AppHeader /> -->
    <Intro />
    <WorkFeed />
  </div>
</template>
