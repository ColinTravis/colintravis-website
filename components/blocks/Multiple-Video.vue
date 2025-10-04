<template>
    <div class="flex gap-8 flex-col lg:flex-row items-center w-full">
        <div v-for="video in videos" :key="video.id" class="w-full lg:w-1/2 flex justify-center">
            <video v-if="autoplay" :src="video.url" disableRemotePlayback autoplay muted loop
                :class="sameHeight ? 'h-[720px]' : ''"></video>
            <video v-else :src="video.url" disableRemotePlayback controls
                :class="sameHeight ? 'h-[720px]' : ''"></video>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    videos: {
        type: Object,
        required: true
    },
    autoplay: {
        type: Boolean,
        default: false
    },
    sameHeight: {
        type: Boolean,
        default: false
    }
});
</script>
