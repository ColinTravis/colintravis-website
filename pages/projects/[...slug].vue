<script setup>
const { slug } = useRoute().params;
const runtimeConfig = useRuntimeConfig();
import { useImageUrl } from "~/composables/useImageUrl";

const { data: projectData } = await useAsyncData(
  "project",
  () =>
    $fetch(
      // `${runtimeConfig.public.strapiBaseUrl}/api/projects?filters[projectName][$eq]=${slug}&populate=*`,
      `${runtimeConfig.public.strapiBaseUrl}/api/projects?filters[projectName][$eq]=${slug}&populate[projectHeader]=*&populate=heroImage&populate[projectContent][populate]=*`,
      {
        headers: {
          Authorization: `Bearer ${runtimeConfig.public.strapiApi}`,
        },
      }
    ),
  {
    transform: (res) => res.data[0],
  }
);
</script>

<template>
  <AppHeader />
  <div class="max-w-6xl px-4 sm:px-6 lg:px-8 mx-auto py-24">
    <div class="flex flex-col mx-auto gap-12">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h1 class="dark:text-white text-black text-6xl font-bold">
            {{ projectData.projectName }}
          </h1>
          <h2 class="dark:text-gray-copy text-black text-2xl text-balance">
            {{ projectData.projectHeader.subHeader }}
          </h2>
          <div class="flex flex-wrap gap-2 mt-4">
            <div v-for="(tag, tagIndex) in projectData.categoryTags" :key="`category-${tagIndex}`"
              class="rounded-full border-2 bg-transparent inline-block px-3 dark:text-gray-copy">
              {{ tag.name }}
            </div>
          </div>
        </div>
        <div class="dark:text-gray-copy text-balance">
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim illo,
            alias sint corporis iure facere ipsum assumenda possimus reiciendis
            ex repellendus odio distinctio nobis rerum? Tempora adipisci nobis
            exercitationem. Eos.
          </p>
        </div>
      </div>
      <NuxtImg v-if="projectData.heroImage" provider="imgix" format="webp"
        :src="useImageUrl(projectData.heroImage?.url)" width="700" height="700" fit="cover"
        :modifiers="{ auto: 'format,compress' }" />
    </div>
  </div>
  <pre class="text-white">{{ projectData }}</pre>
</template>
