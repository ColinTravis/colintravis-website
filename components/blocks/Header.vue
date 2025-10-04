<template>
  <div class="mb-9">
    <h2 v-if="subHeader" class="text-base lg:text-lg mt-9">{{ subHeader }}</h2>
    <span v-if="subHeader" class="bg-ct-blue h-1 block w-1/8 mt-2"></span>
    <h1 v-if="header" class="mt-6 font-sans text-5xl lg:text-6xl font-semibold text-balance">{{ header }}</h1>
    <p v-if="description" class="mt-6 font-sans">{{ description }}</p>
  </div>
</template>

<script setup>
defineProps({
  subHeader: {
    type: String,
    required: false,
  },
  header: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
})
</script>
