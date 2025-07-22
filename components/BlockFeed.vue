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
  "media.multiple-image": "Multiple-Image",
  "media.single-image": "Single-Image",
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
    <div class="flex flex-col gap-8">
      <div v-for="(block, idx) in projectContent" :key="`${block.__component}${block.id}` || idx">
        <component :is="getComponentName(block)" :blockData="block" />
      </div>
    </div>
    <!-- <pre>
      {{ projectContent }}
    </pre> -->
  </div>
</template>
