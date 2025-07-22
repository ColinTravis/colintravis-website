<template>
  <div v-if="blockData.copy"
    class="text-xl lg:text-2xl text-balance prose prose-neutral dark:prose-invert prose-lg group-[.in-grid]:my-0 group-[.in-grid]:px-6"
    v-html="$mdRenderer.render(blockData.copy)">
  </div>
</template>

<script setup>
const props = defineProps({ blockData: Object });
</script>
