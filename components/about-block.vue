        <script setup>
        const runtimeConfig = useRuntimeConfig()

        const aboutData = ref([])
        const aboutError = ref(null)
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
</script>

        <template>
          <div v-if="aboutError" class="p-4 bg-red-100 text-red-700 rounded">
            {{ aboutError }}
          </div>
          <div v-else>
            <p v-if="aboutData.showHeader" class="text-black">{{ aboutData.header }}</p>
            <div v-html="aboutData.copy"></div>
            <img v-if="aboutData.image" :src="runtimeConfig.public.strapiBaseUrl + aboutData.image.url" alt="">
          </div>
        </template>
