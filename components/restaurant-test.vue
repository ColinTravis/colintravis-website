<script setup>
const runtimeConfig = useRuntimeConfig()
const restaurants = ref([])
const restaurantError = ref(null)



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
    <div v-if="restaurantError" class="p-4 bg-red-100 text-red-700 rounded">
        {{ restaurantError }}
    </div>
    <div v-else class="grid grid-cols-3 gap-4 p-6">
        <div class="bg-white shadow-lg rounded-md p-6" v-for="restaurant in restaurants">
            <p>{{ restaurant.subheader }}</p>
        </div>
    </div>
</template>
