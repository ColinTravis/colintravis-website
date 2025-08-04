<script setup>
const props = defineProps({
  projectName: {
    type: String,
    required: true,
  },
  projectContent: {
    type: Array,
    required: true,
  },
});

const componentMap = {
  "text.text-block": "Text",
  "text.header": "Header",
  "text.quote": "Quote",
  "media.multiple-image": "Multiple-Image",
  "media.single-image": "Single-Image",
  "media.video-inline": "Video-Inline",
  "media.video-embed": "Video-Embed",
  "layout.grid": "Grid",
};

// Compute the component name for each block
const getComponentName = (block) => {
  return defineAsyncComponent(
    () => import(`@/components/blocks/${componentMap[block.__component]}.vue`)
  )
};

</script>

<template>
  <div class="max-w-6xl px-4 sm:px-6 lg:px-8 mx-auto pb-24">
    <p class="dark:text-white ">
      BLOCKS here:
    </p>
    <div class="flex flex-col gap-12">
      <div v-for="(block, idx) in projectContent" :key="`${block.__component}${block.id}` || idx">
        <component :is="getComponentName(block)" :blockData="block" v-bind="block" />
      </div>
    </div>
    <pre>
      {{ projectContent }}
    </pre>
  </div>
</template>
