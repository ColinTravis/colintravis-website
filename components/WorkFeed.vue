<script setup>
const runtimeConfig = useRuntimeConfig()

const isDev = process.env.NODE_ENV !== 'production'

const { data: projects, error: projectError } = await useFetch(`${runtimeConfig.public.strapiBaseUrl}/api/projects?sort=sortOrder&fields[0]=projectName&populate=projectHeader&populate=heroImage${isDev ? '&status=draft' : '&status=published'}`, {
  headers: {
    'Authorization': `Bearer ${runtimeConfig.public.strapiApi}`
  },
  transform: (response) => {
    return response.data
  }
})
</script>

<template>
  <div v-if="projectError" class="p-4 text-red-700 rounded">
    Failed to load project data. Please check your connection and try again.
  </div>
  <div v-else class="md:grid-cols-3 md:py-24 pb-24 pt-2 grid gap-6 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <WorkCard v-for="project in projects" :key="project.id" :project="project" />
  </div>
</template>
