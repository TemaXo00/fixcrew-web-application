<script setup lang="ts">
import { ref } from 'vue'

const isOpen = ref(false)

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <div class="relative">
    <div class="flex justify-evenly items-center bg-main h-20 px-4 md:px-8 lg:px-16 xl:px-30">
      <div class="relative z-50">
        <div class="space-y-2 cursor-pointer group" @click="toggleMenu">
          <span
            class="block w-6 sm:w-8 h-0.5 bg-white transition-transform duration-300 group-hover:bg-[#EAEAEA]"
            :class="{ 'rotate-45 translate-y-2.5': isOpen }"
          ></span>
          <span
            class="block w-4 sm:w-5 h-0.5 bg-white transition-all duration-300 group-hover:bg-[#EAEAEA]"
            :class="{ 'opacity-0 w-0': isOpen }"
          ></span>
        </div>

        <div
          v-if="isOpen"
          class="absolute left-0 top-12 w-64 sm:w-72 bg-main text-white shadow-xl rounded-lg overflow-hidden animate-fadeIn"
        >
          <div class="flex flex-col gap-1 p-3 sm:p-4 font-sans">
            <div class="border-b border-white/20 pb-3 flex flex-col gap-1">
              <span
                class="hover:bg-white/10 px-3 sm:px-4 py-2 sm:py-2.5 rounded-md cursor-pointer transition-colors duration-200 text-sm sm:text-base"
                >Air conditioning</span
              >
              <span
                class="hover:bg-white/10 px-3 sm:px-4 py-2 sm:py-2.5 rounded-md cursor-pointer transition-colors duration-200 text-sm sm:text-base"
                >Heating</span
              >
              <span
                class="hover:bg-white/10 px-3 sm:px-4 py-2 sm:py-2.5 rounded-md cursor-pointer transition-colors duration-200 text-sm sm:text-base"
                >Electrical</span
              >
              <span
                class="hover:bg-white/10 px-3 sm:px-4 py-2 sm:py-2.5 rounded-md cursor-pointer transition-colors duration-200 text-sm sm:text-base"
                >Plumbing</span
              >
              <span
                class="hover:bg-white/10 px-3 sm:px-4 py-2 sm:py-2.5 rounded-md cursor-pointer transition-colors duration-200 text-sm sm:text-base"
                >Prices</span
              >
            </div>

            <div class="border-b border-white/20 pb-3 flex flex-col gap-1">
              <span
                class="hover:bg-white/10 px-3 sm:px-4 py-2 sm:py-2.5 rounded-md cursor-pointer transition-colors duration-200 text-sm sm:text-base"
                >COMMERCIAL REPAIR</span
              >
              <span
                class="hover:bg-white/10 px-3 sm:px-4 py-2 sm:py-2.5 rounded-md cursor-pointer transition-colors duration-200 text-sm sm:text-base"
                >RESIDENTAL REPAIR</span
              >
            </div>

            <button
              class="bg-[#0077B6] hover:bg-[#006AA2] rounded-md w-full py-2.5 sm:py-3 mt-2 transition-colors duration-200 font-medium text-sm sm:text-base"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>

      <img src="../assets/images/logo.svg" alt="logo" class="h-8 sm:h-10 md:h-12" />

      <ul class="hidden lg:flex flex-row gap-3 xl:gap-5 text-white font-sans cursor-pointer">
        <li class="hover:text-[#EAEAEA] text-sm xl:text-base whitespace-nowrap">
          Air conditioning
        </li>
        <li class="hover:text-[#EAEAEA] text-sm xl:text-base whitespace-nowrap">Heating</li>
        <li class="hover:text-[#EAEAEA] text-sm xl:text-base whitespace-nowrap">Electrical</li>
        <li class="hover:text-[#EAEAEA] text-sm xl:text-base whitespace-nowrap">Plumbing</li>
        <li class="hover:text-[#EAEAEA] text-sm xl:text-base whitespace-nowrap">Prices</li>
      </ul>

      <ul class="hidden md:flex flex-row gap-3 xl:gap-5 text-white font-sans cursor-pointer">
        <li class="hover:text-[#EAEAEA] text-xs xl:text-sm whitespace-nowrap">COMMERCIAL REPAIR</li>
        <li class="hover:text-[#EAEAEA] text-xs xl:text-sm whitespace-nowrap">RESIDENTAL REPAIR</li>
      </ul>

      <button
        class="text-white font-sans bg-[#0077B6] rounded-[10px] px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base hover:bg-[#006AA2] whitespace-nowrap"
      >
        Book Now
      </button>
    </div>
  </div>
</template>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.2s ease-out;
}

</style>
