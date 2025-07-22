<template>
    <div class="flex gap-8 flex-col lg:flex-row items-center w-full">
        <div v-for="image in blockData.images" :key="image.id" class="w-full lg:w-1/2">
            <NuxtImg v-if="image" provider="imgix" format="webp" :src="useImageUrl(image?.url)" width="400" height="400"
                fit="cover" :modifiers="{ auto: 'format,compress' }" />
        </div>
    </div>
</template>

<script setup>
const props = defineProps({ blockData: Object });
</script>
