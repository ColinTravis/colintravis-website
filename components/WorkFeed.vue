<script setup>
const runtimeConfig = useRuntimeConfig()
import { useImageUrl } from '~/composables/useImageUrl'
const projects = ref([])
const projectError = ref(null)

const isDev = process.env.NODE_ENV !== 'production'

try {
  const { data: projectResponse, error } = await useFetch(`${runtimeConfig.public.strapiBaseUrl}/api/projects?fields[0]=projectName&populate=projectHeader&populate=heroImage${isDev ? '&status=draft' : ''}`, {
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
  <div v-else class="md:grid-cols-3 md:py-24 pb-24 pt-2 grid gap-6 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <WorkCard v-for="project in projects" :project="project" />
  </div>
</template>
