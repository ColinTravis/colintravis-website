<script setup>
const props = defineProps({

})
const { data: socialData, pending, socialError } = await useStrapiFetch('/global', {
    populate: ['socialLinks', 'socialLinks.icon'],
    fields: 'id'
});

// const socialData = ref([])
// const socialError = ref(null)
// try {
//     const { data: socialResponse, error } = await useFetch(`${runtimeConfig.public.strapiBaseUrl}/api/global?populate=socialLinks&fields=id`, {
//         headers: {
//             'Authorization': `Bearer ${runtimeConfig.public.strapiApi}`
//         }
//     })

//     if (error.value) {
//         socialError.value = 'Failed to load global page data'
//     } else {
//         socialData.value = socialResponse.value?.data
//     }
// } catch (e) {
//     socialError.value = 'Unable to connect to the server'
// }


const socialTypes = {
    linkedin: 'fa6-brands:linkedin-in',
    facebook: 'fa6-brands:facebook-f',
    instagram: 'fa6-brands:instagram',
    youtube: 'fa6-brands:youtube'
}
</script>

<template>
    <div class="flex flex-row space-x-3 my-2">
        <a :href="social.url" v-for="(social, socialIndex) in socialData.socialLinks"
        class="flex items-center justify-center size-6 text-white bg-transparent">
            <NuxtImg class="max-w-[22px]" provider="imgix" format="webp" v-if="social.icon" :src="useImageUrl(social.icon?.url)" width="100" height="100"
                :modifiers="{ auto: 'format,compress' }" :alt="`${social.name} Icon`" />
            <Icon v-else size="22" class="text-white hover:text-ct-blue ease-in-out duration-200 transition-colors" :name="socialTypes[social.name.toLowerCase()]" />
        </a>
    </div>
</template>
