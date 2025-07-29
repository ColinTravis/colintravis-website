<script setup>
const props = defineProps({
    blok: {
        type: Object,
        required: true
    }
})

const videoShowing = ref(false)
let currentVideoType = ref(props.blok.videoType)
let vimeoIframe = ref(null)
let youtubeIframe = ref(null)

const { data: oembed } = await useAsyncData(`oembed-${props.blok._uid}`, () =>
    $fetch(
        props.blok.videoType == 'youtube'
            ? `https://www.youtube.com/oembed?url=${props.blok.videoUrl}`
            : `https://vimeo.com/api/oembed.json?url=${props.blok.videoUrl}&width=1920&height=1080&autoplay=1`
    )
)

const videoThumbnail = computed(() => {
    if (oembed.value.thumbnail_url) {
        if (props.blok.videoType == 'vimeo') {
            return oembed.value.thumbnail_url_with_play_button
        } else if (props.blok.videoType == 'youtube') {
            return oembed.value.thumbnail_url.replace('hqdefault', 'maxresdefault')
        } else {
            return null
        }
    }
})

const videoId = computed(() => {
    return props.blok.videoUrl.split('?v=')[1]
})

let currentVideo = computed(() => {
    if (oembed.value.video_id) {
        return oembed.value.video_id
    }
})

function swapVideo() {
    videoShowing.value = !videoShowing.value
}
function playVideo(el) {
    nextTick(() => {
        if (props.blok.videoType == 'youtube') {
            let videoFrame = document.querySelector('.video-element')
            videoFrame.src += '&autoplay=1'
        }
    })
}

const spacing = computed(() => {
    return props.blok.spacing ? `margin-top: var(--spacing-${props.blok.spacing}); margin-bottom: var(--spacing-${props.blok.spacing})` : ''
})
</script>

<template>
    <div :style="spacing" v-editable="blok" class="w-full mx-auto">
        <transition name="fade" mode="out-in" @after-enter="playVideo">
            <div class="relative cursor-pointer video-placeholder" v-if="!videoShowing" key="placeholder"
                @click="swapVideo()">
                <div v-if="blok.videoType == 'youtube'"
                    class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 max-w-[100px]">
                    <div>
                        <p class="flex items-center max-w-[500px] w-full">
                            <Icon size="500" name="ic:baseline-play-arrow" class="flex text-white play-icon" />
                        </p>
                    </div>
                </div>
                <img v-if="videoThumbnail" sizes="md:672px lg:1232px" height="552px" width="1232px" class="w-full"
                    :src="videoThumbnail" alt="video thumbnail" />
                <p :style="`color:${blok.captionColor?.value ? blok.captionColor?.value : '#000'}`"
                    v-if="blok.videoCaption" class="mt-3 font-serif text-base lg:text-lg">{{ blok.videoCaption }}</p>
            </div>
            <div v-else>
                <div class="video-block" ref="videoFrame" key="video">
                    <iframe ref="vimeoIframe" v-if="currentVideoType == 'vimeo'" class="video-element"
                        :src="`https://player.vimeo.com/video/${currentVideo}?autoplay=1`" :width="oembed.width"
                        :height="oembed.height" :title="oembed.video_title" webkitallowfullscreen mozallowfullscreen
                        allowfullscreen frameborder="0"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture">
                    </iframe>

                    <iframe v-else-if="currentVideoType == 'youtube'" ref="youtubeIframe" class="video-element"
                        :src="`https://www.youtube.com/embed/${videoId}?modestbranding=1&rel=0&playsinline=1&enablejsapi=1`"
                        frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen :title="oembed.title">
                    </iframe>
                </div>
                <p :style="`color:${blok.captionColor?.value ? blok.captionColor?.value : '#000'}`"
                    v-if="blok.videoCaption" class="pt-3 font-serif text-base lg:text-lg">{{ blok.videoCaption }}</p>
            </div>
        </transition>
    </div>
</template>

<style>
@reference "../../assets/css/main.css";

.play-icon {
    @apply duration-300 ease-in-out;
}

.video-placeholder:hover {
    .play-icon {
        @apply scale-110 transform;
    }
}

.video-block {
    @apply overflow-hidden;
    @apply w-full;
    @apply relative;
    padding-top: 56.25%;
}

.video-element {
    /* @apply rounded-md; */
    @apply absolute top-0 left-0 bottom-0 right-0;
    @apply h-full w-full;
}

.fade-enter-active,
.fade-leave-active {
    @apply transition-opacity;
    @apply duration-300;
}

.fade-enter,
.fade-leave-to {
    @apply opacity-0;
}

.fade-enter-to,
.fade-leave {
    @apply opacity-100;
}
</style>
