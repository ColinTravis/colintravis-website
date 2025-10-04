<template>
  <div class="px-4 sm:px-6 lg:px-8 max-w-6xl w-full mx-auto md:sticky block md:top-2 z-50">
    <div class="bg-default/75 backdrop-blur-xl border-3 border-ct-blue h-[60px] md:my-2 rounded-xl md:mx-auto my-4">
      <div class="w-full mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3 h-full max-w-6xl">
        <NuxtLink to="/" class="lg:flex-1 flex items-center gap-1.5">
          <logos-ct-logo-dark class="w-10" />
          <!-- <logos-ct-logo-dark v-if="$colorMode.value == 'dark'" class="w-10" /> -->
          <!-- <logos-ct-logo-light v-else class="w-10" /> -->
        </NuxtLink>
        <div>
          <ul class="flex flex-row gap-6 items-center font-mono text-sm">
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
