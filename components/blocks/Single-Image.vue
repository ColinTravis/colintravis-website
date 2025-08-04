<!-- <template>
  <div :style="spacing" v-editable="blok">
    <NuxtImg v-if="blok.image.filename" :src="blok.image.filename" quality="80" format="webp"
      :alt="blok.image.alt ? blok.image.alt : ''" />
    <div v-if="blok.imageCaption?.length || blok.imageCopy?.content[0]?.content?.length"
      class="flex flex-col gap-2 mt-9">
      <h2 :style="`color:${blok.captionColor?.value ? blok.captionColor?.value : '#000'}`" v-if="blok.imageCaption"
        class="font-sans text-xl text-center uppercase lg:text-3xl">{{ blok.imageCaption }}</h2>
      <div :style="`color:${blok.captionColor?.value ? blok.captionColor?.value : '#000'}`" v-if="blok.imageCopy"
        class="group-[.in-grid]:w-full w-3/4 mx-auto font-serif text-base leading-loose text-center lg:text-xl text-balance"
        v-html="renderRichText(blok.imageCopy)"></div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({ blok: Object })
const spacing = computed(() => {
  return props.blok.spacing ? `margin-top: var(--spacing-${props.blok.spacing}); margin-bottom: var(--spacing-${props.blok.spacing})` : ''
})
</script> -->


<template>
  <div class="flex flex-col items-center mx-auto" :class="fullScreen ? 'w-full' : 'md:w-1/2 px-12'">
    <NuxtImg v-if="image" class="w-full" provider="imgix" format="webp"
      :src="useImageUrl(image?.url)" width="1000" :modifiers="{ auto: 'format,compress' }" />
  </div>
</template>

<script setup>
const props = defineProps({
  image: {
    type: Object,
    required: true
  },
  fullScreen: {
    type: Boolean,
    default: false
  }
});
</script>
