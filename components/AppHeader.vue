<template>
  <div
    class="bg-default/75 backdrop-blur-lg border-b border-gray-700 sticky top-0 z-50 h-[60px]">
    <div class="w-full mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3 h-full max-w-6xl">
      <NuxtLink to="/" class="lg:flex-1 flex items-center gap-1.5">
        <logos-ct-logo-dark class="w-10" />
        <!-- <logos-ct-logo-dark v-if="$colorMode.value == 'dark'" class="w-10" /> -->
        <!-- <logos-ct-logo-light v-else class="w-10" /> -->
      </NuxtLink>
      <div>
        <ul class="flex flex-row gap-6 items-center">
          <li>
            <NuxtLink class="nav-link" to="/">home</NuxtLink>
          </li>
          <li>
            <!-- <NuxtLink class="nav-link" to="/about">about</NuxtLink> -->
          </li>
          <li>
            <!-- <NuxtLink class="nav-link" to="/projects">projects</NuxtLink> -->
          </li>
        </ul>
      </div>
      <!-- <div class="flex items-center">
        <DarkModeToggle />
      </div> -->
    </div>
  </div>
</template>


<style scoped>
@reference "../assets/css/main.css";

.nav-link {
  @apply text-white;
  /* @apply dark:text-white; */
  @apply hover:underline;
  @apply transition-colors;
}

.nav-link.router-link-active {
  @apply bg-ct-blue;
  @apply p-1;

  &:hover {
    @apply !no-underline;
  }
}
</style>
