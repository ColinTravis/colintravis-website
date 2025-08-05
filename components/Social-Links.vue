<script setup>

const { data: socialData } = await useAsyncData(
    `global-social`,
    () => useStrapiFetch(
        '/global',
        {
            populate: ['socialLinks', 'socialLinks.icon'],
            fields: 'id'
        }
    ),
    {
        transform: (response) => {
            if (!response?.data) return null;
            return response.data;
        },
    }
);

const socialTypes = {
    linkedin: 'fa6-brands:linkedin-in',
    facebook: 'fa6-brands:facebook-f',
    instagram: 'fa6-brands:instagram',
    youtube: 'fa6-brands:youtube'
}
</script>

<template>
    <div class="flex flex-row space-x-3 my-2">
        <a target="_blank" :href="social.url" v-for="(social, socialIndex) in socialData.socialLinks"
            class="flex items-center justify-center size-6 text-white bg-transparent">
            <NuxtImg class="max-w-[22px]" provider="imgix" format="webp" v-if="social.icon"
                :src="useImageUrl(social.icon?.url)" width="100" height="100" :modifiers="{ auto: 'format,compress' }"
                :alt="`${social.name} Icon`" />
            <Icon v-else size="22" class="text-white hover:text-ct-blue ease-in-out duration-200 transition-colors"
                :name="socialTypes[social.name.toLowerCase()]" />
        </a>
    </div>
</template>
