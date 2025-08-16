<template>
    <div class="flex gap-8 flex-col lg:flex-row items-center w-full">
        <div v-for="image in images" :key="image.id" class="w-full lg:w-1/2 flex justify-center">
            <NuxtImg v-if="image && sameHeight" provider="imgix" format="webp" :src="useImageUrl(image?.url)" width="800" height="800"
                fit="cover" :modifiers="{ auto: 'format,compress' }" loading="lazy" :placeholder="[50, 25, 75, 5]" />
            <NuxtImg v-else-if="image && !sameHeight" provider="imgix" format="webp" :src="useImageUrl(image?.url)" width="800"
                fit="cover" :modifiers="{ auto: 'format,compress' }" loading="lazy" :placeholder="[50, 25, 75, 5]" />
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    images: {
        type: Object,
        required: true
    },
    sameHeight: {
        type: Boolean,
        default: false
    }
});
</script>
