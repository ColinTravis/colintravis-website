<script setup>
const runtimeConfig = useRuntimeConfig()
import { useImageUrl } from '~/composables/useImageUrl'
const projects = ref([])
const projectError = ref(null)

try {
  const { data: projectResponse, error } = await useFetch(`${runtimeConfig.public.strapiBaseUrl}/api/projects?fields[0]=subHeader&fields[1]=projectName&populate=heroImage`, {
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
  <div v-if="projectError" class="p-4 bg-red-100 text-red-700 rounded">
    {{ projectError }}
  </div>
  <div v-else class="grid grid-cols-3 gap-4 p-6">
    <pre>{{ projects }}</pre>
    <nuxt-link :to="`projects/${project.projectName}`" class="bg-white shadow-lg rounded-md p-6" v-for="project in projects">
      <p>{{ project.projectName }}</p>
      <p>{{ project.subHeader }}</p>
      <NuxtImg provider="imgix" format="webp" :src="useImageUrl(project.heroImage?.url)" width="700" height="700"
        fit="cover" :modifiers="{ auto: 'format,compress'}" />
    </nuxt-link>
  </div>
</template>
