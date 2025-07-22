<script setup>
const colorMode = useColorMode();
const colorText = computed(() => {
    return colorMode.preference === 'dark' ? 'Light Mode' : 'Dark Mode';
});
</script>

<template>
    <!-- Dark Mode Toggle -->
    <ClientOnly>
        <button @click="$colorMode.preference = $colorMode.preference === 'dark' ? 'light' : 'dark'" type="button"
            class="w-full mx-auto text-center text-black dark:text-white">
            Switch to {{ colorText }}
            <Icon v-if="colorMode.preference === 'dark'" name="tabler:sun-high" class="ml-2 text-base text-white" />
            <Icon v-if="colorMode.preference === 'light'" name="teenyicons:moon-solid"
                class="ml-2 text-sm text-black" />
        </button>
    </ClientOnly>
</template>
