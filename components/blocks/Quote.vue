<template>
    <div class="mt-2 mb-6 lg:mt-4 lg:mb-9 quote">
        <p class="font-sans text-3xl text-center lg:text-4xl text-quote"> {{ quote }}</p>
        <p class="mt-4 font-sans text-sm text-center" v-if="author">{{ author }}</p>
    </div>
</template>

<script setup>
defineProps({
    quote: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: false,
    },
});
</script>


<style lang="postcss" scoped>
.quote {
    &::after,
    &::before {
        margin: 1.125rem auto;
        content: '';
        width: 10%;
        height: 1px;
        background: #999;
        display: block;
    }
}
</style>
