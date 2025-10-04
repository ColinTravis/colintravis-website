<script setup>
const runtimeConfig = useRuntimeConfig()

const isDev = process.env.NODE_ENV !== 'production'

// Use useAsyncData with proper static generation support
const { data: projects, error: projectError } = await useAsyncData('work-feed-projects', async () => {
  try {
    const response = await $fetch(`${runtimeConfig.public.strapiBaseUrl}/api/projects?sort=sortOrder&fields[0]=projectName&populate=projectHeader&populate=heroImage${isDev ? '&status=draft' : '&status=published'}`, {
      headers: {
        'Authorization': `Bearer ${runtimeConfig.public.strapiApi}`
      }
    })
    return response.data || []
  } catch (error) {
    console.error('Failed to fetch projects:', error)
    // Return empty array instead of throwing error for graceful fallback
    return []
  }
}, {
  // Ensure data is fetched on server and serialized to client
  server: true,
  // Default fallback value
  default: () => []
})
</script>

<template>
  <div v-if="projectError" class="p-4 text-red-700 rounded mx-auto">
    Failed to load project data. Please check your connection and try again.
  </div>
  <div v-else-if="!projects || projects.length === 0" class="p-4 text-gray-500 rounded mx-auto text-center">
    No projects available.
  </div>
  <div id="work-feed" v-else class="md:grid-cols-3 md:py-24 pb-24 pt-2 grid gap-8 md:gap-6 max-w-6xl mx-auto px-6 sm:px-6 lg:px-8">
    <WorkCard v-for="(project, projectIndex) in projects" :key="project.id" :project="project" />
  </div>
</template>
