<script setup>
const { slug } = useRoute().params;

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
      status: 'published',
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

//https://g.co/gemini/share/a356caa3c2c8
// issue: TypeError: can't access property "projectHeader", (intermediate value)(...) is null
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

let metaTitle = 'Colin Travis'; // Default value
if (projectData.value?.metaTitle) {
  metaTitle = `Colin Travis | ${projectData.value.metaTitle}`;
} else if (projectData.value?.projectName) {
  metaTitle = `Colin Travis | ${projectData.value.projectName}`;
}

let metaDescription = 'Colin Travis Portfolio'; // Default value
if (projectData.value?.metaDescription) {
  metaDescription = `${projectData.value.metaDescription}`;
}

const meta = {
  title: metaTitle,
  description: metaDescription,
  url: `https://colintravis.com/projects/${slug[0]}`
}

useSeoMeta({
  title: meta.title,
  ogTitle: meta.title,
  description: meta.description,
  ogDescription: meta.description,
  ogImage: meta.image,
  twitterCard: 'summary_large_image'
})

</script>

<template>
  <AppHeader />
  <div class="max-w-6xl px-4 sm:px-6 lg:px-8 mx-auto py-24">
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
        <div class="dark:text-gray-copy text-balance">
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim illo,
            alias sint corporis iure facere ipsum assumenda possimus reiciendis
            ex repellendus odio distinctio nobis rerum? Tempora adipisci nobis
            exercitationem. Eos.
          </p>
        </div>
      </div>
      <NuxtImg v-if="projectData.heroImage" provider="imgix" format="webp" class="w-full"
        :src="useImageUrl(projectData.heroImage?.url)" sizes="100vw sm:50vw md:1920px" densities="x1 x2"
        :modifiers="{ auto: 'format,compress' }" />
    </div>
  </div>
  <BlockFeed :projectName="slug[0]" :projectContent="projectData.projectContent" />
  <!-- <pre class="text-blue-600">{{ projectData.projectContent }}</pre> -->
</template>
