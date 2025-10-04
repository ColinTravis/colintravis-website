<template>
    <nuxt-link :to="`projects/${project.projectName}`"
        class="bg-transparent border-2 border-ct-blue text-white shadow-lg rounded-md flex flex-col justify-between overflow-hidden">
        <div class="mb-2 px-6 pt-6 pb-4">
            <p class="font-bold text-balance">{{ project.projectName }}</p>
            <p class="text-balance" v-if="project.projectHeader">{{ project.projectHeader.subHeader }}</p>
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
