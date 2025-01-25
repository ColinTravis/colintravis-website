<script setup>
const runtimeConfig = useRuntimeConfig()

const aboutData = ref([])
const aboutError = ref(null)
const restaurants = ref([])
const restaurantError = ref(null)

try {
  const { data: aboutResponse, error } = await useFetch(`${runtimeConfig.public.strapiBaseUrl}/api/about-page?populate=*`, {
    headers: {
      'Authorization': `Bearer ${runtimeConfig.public.strapiApi}`
    }
  })

  if (error.value) {
    aboutError.value = 'Failed to load about page data'
  } else {
    aboutData.value = aboutResponse.value?.data
  }
} catch (e) {
  aboutError.value = 'Unable to connect to the server'
}

try {
  const { data: restaurantResponse, error } = await useFetch(`${runtimeConfig.public.strapiBaseUrl}/api/restaurants?populate=*`, {
    headers: {
      'Authorization': `Bearer ${runtimeConfig.public.strapiApi}`
    }
  })

  if (error.value) {
    restaurantError.value = 'Failed to load restaurant data'
  } else {
    restaurants.value = restaurantResponse.value?.data
  }
} catch (e) {
  restaurantError.value = 'Unable to connect to the server'
}
</script>

<template>
  <div class="bg-blue-400">
    <div v-if="restaurantError" class="p-4 bg-red-100 text-red-700 rounded">
      {{ restaurantError }}
    </div>
    <div v-else class="grid grid-cols-3 gap-4 p-6">
      <div class="bg-white shadow-lg rounded-md p-6" v-for="restaurant in restaurants">
        <p>{{ restaurant.subheader }}</p>
      </div>
    </div>

    <div v-if="aboutError" class="p-4 bg-red-100 text-red-700 rounded">
      {{ aboutError }}
    </div>
    <div v-else>
      <p v-if="aboutData.showHeader" class="text-black">{{ aboutData.header }}</p>
      <div v-html="aboutData.copy"></div>
      <img v-if="aboutData.image" :src="runtimeConfig.public.strapiBaseUrl + aboutData.image.url" alt="">
    </div>
  </div>
</template>
