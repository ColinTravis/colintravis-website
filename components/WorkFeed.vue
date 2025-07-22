<script setup>
const runtimeConfig = useRuntimeConfig()
import { useImageUrl } from '~/composables/useImageUrl'
const projects = ref([])
const projectError = ref(null)

try {
  const { data: projectResponse, error } = await useFetch(`${runtimeConfig.public.strapiBaseUrl}/api/projects?fields[0]=projectName&populate=projectHeader&populate=heroImage`, {
    headers: {
      'Authorization': `Bearer ${runtimeConfig.public.strapiApi}`
    }
  })

  if (error.value) {
    projectError.value = 'Failed to load project data'
  } else {
    projects.value = projectResponse.value?.data
  }
} catch (e) {
  projectError.value = 'Unable to connect to the server'
}
</script>

<template>
  <div v-if="projectError" class="p-4 text-red-700 rounded">
    {{ projectError }}
  </div>
  <div v-else class="md:grid-cols-3 py-24 grid gap-4 max-w-6xl mx-auto">
    <!-- <pre>{{ projects }}</pre> -->
    <nuxt-link :to="`projects/${project.projectName}`" class="bg-transparent border-2 border-gray-600 text-white shadow-lg rounded-md p-6"
      v-for="project in projects">
      <p>{{ project.projectName }}</p>
      <p>{{ project.projectHeader.subHeader }}</p>
      <NuxtImg provider="imgix" format="webp" :src="useImageUrl(project.heroImage?.url)" width="700" height="700"
        fit="cover" :modifiers="{ auto: 'format,compress' }" />
    </nuxt-link>

  </div>
</template>
