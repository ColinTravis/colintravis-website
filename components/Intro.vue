<script setup>
const { data: introData } = await useAsyncData(
  `home-intro`,
  () => useStrapiFetch(
    '/home-intro',
    {
      fields: 'copy',
      populate: 'nameBlock'
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
  <div class="py-24 grid md:grid-cols-2 gap-4 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex flex-col gap-2">
      <h1 class="text-5xl font-bold text-red">{{ introData.nameBlock.name }}</h1>
      <h2 class="text-lg text-gray-copy">{{ introData.nameBlock.title }} </h2>
      <p class="text-gray-copy">{{ introData.nameBlock.subTitle }}</p>
      <SocialLinks />
    </div>
    <div class="flex flex-col gap-2 text-gray-copy">
      <p>{{ introData.copy }}</p>
    </div>
  </div>
</template>
