<script setup>

const title = 'Colin Travis'
const description =
  'Colin Travis: Maker, Developer'
const image = 'https://colintravis.com/ct_meta.jpg'

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description,
  ogImage: image,
  twitterCard: 'summary_large_image'
})

</script>

<template>
  <div class="h-screen bg-grey-lighter font-stolzl w-full">
    <div class="flex items-center justify-center mx-auto h-full w-full px-8 md:px-16 max-w-lg md:max-w-xl">
      <div class="flex flex-col w-full p-4 mb-6 bg-white rounded-lg shadow-xl gap-4">
        <logos-Ct-Logo-light class="block w-1/2 mx-auto" />
        <h1 class="text-center">ColinTravis.com</h1>
        <p class="text-center">🤷‍♂️ ⏳</p>
        <a class="mx-auto" href="https://github.com/ColinTravis">
          <Icon name="uil:github" class="size-8 hover:text-ct-blue git-icon transition-colors duration-200" />
        </a>
      </div>
    </div>
  </div>
</template>

<style>
.git-icon {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
