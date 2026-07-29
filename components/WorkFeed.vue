<script setup>
const runtimeConfig = useRuntimeConfig();

const isDev = process.env.NODE_ENV !== "production";

const { data: projects, error: projectError } = await useAsyncData(
  `work-feed-projects`,
  () =>
    useStrapiFetch("/projects", {
      sort: "sortOrder",
      fields: ["projectName"],
      populate: ["projectHeader", "heroImage"],
      status: `${import.meta.dev ? "draft" : "published"}`,
    }),
  // ${isDev ? '&status=draft' : '&status=published'}
  {
    transform: (response) => {
      if (!response?.data) return [];
      return response.data;
    },
  },
);
</script>

<template>
  <div
    v-if="projectError && !projects?.length"
    class="p-4 text-red-700 rounded mx-auto"
  >
    Failed to load project data. Please check your connection and try again.
  </div>
  <div
    id="work-feed"
    v-else
    class="md:grid-cols-3 md:py-24 pb-24 pt-2 grid gap-8 md:gap-6 max-w-6xl mx-auto px-6 sm:px-6 lg:px-8"
  >
    <WorkCard
      v-for="(project, projectIndex) in projects"
      :key="project.id"
      :project="project"
    />
  </div>
</template>
