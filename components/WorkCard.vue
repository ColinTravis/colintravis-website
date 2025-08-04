<template>
    <nuxt-link :to="`projects/${project.projectName}`"
        class="bg-transparent border-2 border-gray-600 dark:text-white shadow-lg rounded-md p-6">
        <p>{{ project.projectName }}</p>
        <p>{{ project.projectHeader.subHeader }}</p>
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
