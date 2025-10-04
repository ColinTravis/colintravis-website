<script setup>
const runtimeConfig = useRuntimeConfig()
import { useImageUrl } from '~/composables/useImageUrl'

const aboutData = ref([])
const aboutError = ref(null)
try {
  const { data: aboutResponse, error } = await useFetch(`${runtimeConfig.public.strapiBaseUrl}/api/about?populate=*`, {
    headers: {
      'Authorization': `Bearer ${runtimeConfig.public.strapiApi}`
    }
  })

  if (error.value) {
    aboutError.value = 'Failed to load about page data'
  } else {
    aboutData.value = aboutResponse.value?.data
  }
} catch (e) {
  aboutError.value = 'Unable to connect to the server'
}
</script>

<template>
  <div v-if="aboutError" class="p-4 bg-red-100 text-red-700 rounded">
    {{ aboutError }}
  </div>
  <div v-else class="text-white">
    <p v-if="aboutData.showHeader" class="text-white">{{ aboutData.header }}</p>
    <div v-html="aboutData.copy"></div>
    <pre>{{aboutData.hero}}</pre>
    <NuxtImg provider="imgix" format="webp" :src="useImageUrl(aboutData.hero?.url)"
      width="700" height="700" fit="cover" :modifiers="{ auto: 'format,compress', crop: 'faces', mask: 'ellipse' }"  />
  </div>
</template>
