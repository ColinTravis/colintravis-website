<script setup>
const { slug } = useRoute().params;

const isDev = process.env.NODE_ENV !== 'production';

const { data: projectData } = await useAsyncData(
  `project-${slug}`,
  () => useStrapiFetch(
    '/projects',
    {
      filters: {
        projectName: {
          $eq: slug,
        },
      },
      status: `${isDev ? 'draft' : 'published'}`,
      populate: {
        projectHeader: '*',
        heroImage: true,
        projectContent: {
          populate: '*',
        },
      },
    }
  ),
  {
    transform: (response) => {
      if (!response?.data?.length) return null;
      return response.data[0];
    },
  }
);

if (!projectData.value) {
  throw createError({ statusCode: 404, statusMessage: 'Project Not Found', fatal: true });
}

// const { data: projectData } = await useAsyncData(
//   "project",
//   () =>
//     $fetch(
//       `${runtimeConfig.public.strapiBaseUrl}/api/projects?filters[projectName][$eq]=${slug}&populate[projectHeader]=*&populate=heroImage&populate[projectContent][populate]=*&status=published`,
//       {
//         headers: {
//           Authorization: `Bearer ${runtimeConfig.public.strapiApi}`,
//         },
//       }
//     ),
//   {
//     transform: (res) => res.data[0],
//   }
// );

const metaTitle = computed(() => {
  if (projectData.value?.metaTitle) {
    return `Colin Travis | ${projectData.value.metaTitle}`;
  }
  if (projectData.value?.projectName) {
    return `Colin Travis | ${projectData.value.projectName}`;
  }
  return 'Colin Travis';
});

const metaDescription = computed(() => {
  return projectData.value?.metaDescription || 'Colin Travis Portfolio';
});

const metaImage = computed(() => {
  if (projectData.value?.heroImage?.url) {
    return useImageUrl(projectData.value.heroImage.url);
  }
  return null;
});

// let metaTitle = 'Colin Travis'; // Default value
// if (projectData.value?.metaTitle) {
//   metaTitle = `Colin Travis | ${projectData.value.metaTitle}`;
// } else if (projectData.value?.projectName) {
//   metaTitle = `Colin Travis | ${projectData.value.projectName}`;
// }

// let metaDescription = 'Colin Travis Portfolio'; // Default value
// if (projectData.value?.metaDescription) {
//   metaDescription = `${projectData.value.metaDescription}`;
// }

useSeoMeta({
  title: metaTitle,
  ogTitle: metaTitle,
  description: metaDescription,
  ogDescription: metaDescription,
  ogImage: metaImage,
  url: `https://colintravis.com/projects/${slug[0]}`,
  twitterCard: 'summary_large_image'
});


</script>

<template>
  <AppHeader />
  <div v-if="projectData" class="max-w-6xl px-4 sm:px-6 lg:px-8 mx-auto py-24">
    <div class="flex flex-col mx-auto gap-12">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h1 class="dark:text-white text-black text-6xl font-bold">
            {{ projectData.projectHeader.header ? projectData.projectHeader.header : projectData.projectName }}
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
        <div v-if="projectData.projectHeader.description" class="dark:text-gray-copy text-balance">
          <p>
            {{ projectData.projectHeader.description }}
          </p>
        </div>
      </div>
      <NuxtImg v-if="projectData.heroImage" provider="imgix" format="webp" class="w-full"
        :src="useImageUrl(projectData.heroImage?.url)" sizes="600px sm:50vw md:1920px"
        :modifiers="{ auto: 'format,compress' }" loading="lazy" :placeholder="[50, 25, 75, 5]" />
    </div>
  </div>
  <BlockFeed v-if="projectData" :projectName="slug[0]" :projectContent="projectData.projectContent" />
  <div v-else class="flex justify-center items-center h-svh">
    <p class="text-2xl">Loading project...</p>
  </div>
  <!-- <pre class="text-blue-600">{{ projectData.projectContent }}</pre> -->
</template>
