<script setup>

const { data: aboutData } = await useAsyncData(
  `about`,
  () => useStrapiFetch(
    '/about',
    {
      populate: ['hero'],
      fields: 'showHeader,header'
    }
  ),
  {
    transform: (response) => {
      if (!response?.data) return null;
      return response.data;
    },
  }
);
</script>


<template>
  <div class="text-white">
    <p v-if="aboutData.showHeader" class="text-white">{{ aboutData.header }}</p>
    <!-- <pre>{{aboutData.hero}}</pre> -->
    <NuxtImg provider="imgix" format="webp" :src="useImageUrl(aboutData.hero?.url)"
      width="700" height="700" fit="cover" :modifiers="{ auto: 'format,compress', crop: 'faces', mask: 'ellipse' }"  />
  </div>
</template>
