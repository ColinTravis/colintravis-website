<template>
    <nuxt-link :to="`projects/${project.projectName}`"
        class="bg-transparent border-3 border-ct-blue text-white shadow-lg rounded-lg flex flex-col justify-between overflow-hidden group">
        <div class="mb-2 px-6 pt-6 pb-4">
            <p class="font-bold text-balance">{{ project.projectName }}</p>
            <p class="text-balance text-red" v-if="project.projectHeader">{{ project.projectHeader.subHeader }}</p>
        </div>
        <NuxtImg class="group-hover:scale-[1.05] ease-in-out duration-200 transition-transform" provider="imgix" format="webp" :src="useImageUrl(project.heroImage?.url)" width="700" height="700"
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
