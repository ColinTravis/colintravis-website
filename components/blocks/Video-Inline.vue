<template>
    <div class="flex flex-col items-center mx-auto" :class="fullScreen ? 'w-full' : 'md:w-1/2 px-12'">
        <video v-if="autoplay" :src="video.url" disableRemotePlayback autoplay muted loop></video>
        <video v-else :src="video.url" disableRemotePlayback controls></video>
    </div>
</template>

<script setup>
const props = defineProps({
    video: {
        type: Object,
        required: true
    },
    autoplay: {
        type: Boolean,
        default: false
    },
    fullScreen: {
        type: Boolean,
        default: false
    }
});
</script>
