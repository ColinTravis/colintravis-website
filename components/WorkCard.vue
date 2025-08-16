<template>
    <nuxt-link :to="`projects/${project.projectName}`"
        class="bg-transparent border-2 border-gray-600 dark:text-white shadow-lg rounded-md p-6 flex flex-col justify-between">
        <div class="mb-2">
            <p class="font-bold">{{ project.projectName }}</p>
            <p v-if="project.projectHeader">{{ project.projectHeader.subHeader }}</p>
        </div>
        <NuxtImg provider="imgix" format="webp" :src="useImageUrl(project.heroImage?.url)" width="700" height="700"
            fit="cover" :modifiers="{ auto: 'format,compress' }" />
    </nuxt-link>
</template>

<script setup>
const props = defineProps({
    project: {
        type: Object,
        required: true,
    },
});
</script>
