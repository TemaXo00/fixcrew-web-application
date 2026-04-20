<script setup lang="ts"></script>
<template>
  <div
    class="flex flex-row justify-between items-center bg-white max-w-auto h-9 sm:h-10 md:h-9 px-4 sm:px-8 md:px-12 lg:px-20"
  >
    <ul
      class="flex flex-row gap-3 sm:gap-4 md:gap-5 text-[#0077B6] font-sans text-xs sm:text-sm md:text-base"
    >
      <li class="hover:text-blue-300 cursor-pointer transition-colors">blog</li>
      <li class="hover:text-blue-300 cursor-pointer transition-colors">about</li>
      <li class="hover:text-blue-300 cursor-pointer transition-colors">contacts</li>
    </ul>
    <div class="font-sans text-[#0077B6] font-bold underline text-xs sm:text-sm md:text-base">
      <a href="tel:6507197300" class="hover:text-red-700 transition-colors">(650)719-7300</a>
    </div>
  </div>
</template>

<style scoped>
@media (max-width: 480px) {
  .bg-muted {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
  }
}

@media (min-width: 641px) and (max-width: 768px) {
  .bg-muted {
    padding-left: 2rem;
    padding-right: 2rem;
  }
}

@media (min-width: 1537px) {
  .bg-muted {
    max-width: 1920px;
    margin-left: auto;
    margin-right: auto;
  }
}

@media (max-width: 896px) and (orientation: landscape) {
  .h-9 {
    height: 2.5rem;
  }
}

@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
  .text-xs,
  .text-sm,
  .text-base {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}

@media (prefers-color-scheme: dark) {
}
</style>
