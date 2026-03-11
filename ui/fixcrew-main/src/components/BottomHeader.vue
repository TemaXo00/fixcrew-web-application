<script setup lang="ts">
import { ref } from 'vue'

const isOpen = ref(false)

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <div class="relative">
    <div class="flex justify-evenly items-center bg-main h-20 px-30">
      <div class="relative">
        <div class="space-y-2 cursor-pointer group" @click="toggleMenu">
          <span
            class="block w-8 h-0.5 bg-white transition-transform duration-300 group-hover:bg-[#EAEAEA]"
            :class="{ 'rotate-45 translate-y-2.5': isOpen }"
          ></span>
          <span
            class="block w-5 h-0.5 bg-white transition-all duration-300 group-hover:bg-[#EAEAEA]"
            :class="{ 'opacity-0 w-0': isOpen }"
          ></span>
        </div>

        <!-- Компактное выпадающее меню -->
        <div
          v-if="isOpen"
          class="absolute left-0 top-12 w-72 bg-main text-white shadow-xl rounded-lg overflow-hidden animate-fadeIn"
        >
          <div class="flex flex-col gap-1 p-4 font-sans">
            <div class="border-b border-white/20 pb-3 flex flex-col gap-1">
              <span
                class="hover:bg-white/10 px-4 py-2.5 rounded-md cursor-pointer transition-colors duration-200"
                >Air conditioning</span
              >
              <span
                class="hover:bg-white/10 px-4 py-2.5 rounded-md cursor-pointer transition-colors duration-200"
                >Heating</span
              >
              <span
                class="hover:bg-white/10 px-4 py-2.5 rounded-md cursor-pointer transition-colors duration-200"
                >Electrical</span
              >
              <span
                class="hover:bg-white/10 px-4 py-2.5 rounded-md cursor-pointer transition-colors duration-200"
                >Plumbing</span
              >
              <span
                class="hover:bg-white/10 px-4 py-2.5 rounded-md cursor-pointer transition-colors duration-200"
                >Prices</span
              >
            </div>

            <div class="border-b border-white/20 pb-3 flex flex-col gap-1">
              <span
                class="hover:bg-white/10 px-4 py-2.5 rounded-md cursor-pointer transition-colors duration-200"
                >COMMERCIAL REPAIR</span
              >
              <span
                class="hover:bg-white/10 px-4 py-2.5 rounded-md cursor-pointer transition-colors duration-200"
                >RESIDENTAL REPAIR</span
              >
            </div>

            <button
              class="bg-[#0077B6] hover:bg-[#006AA2] rounded-md w-full py-3 mt-2 transition-colors duration-200 font-medium"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>

      <img src="../assets/images/logo.svg" alt="logo" />

      <ul class="flex flex-row gap-5 text-white font-sans cursor-pointer">
        <li class="hover:text-[#EAEAEA]">Air conditioning</li>
        <li class="hover:text-[#EAEAEA]">Heating</li>
        <li class="hover:text-[#EAEAEA]">Electrical</li>
        <li class="hover:text-[#EAEAEA]">Plumbing</li>
        <li class="hover:text-[#EAEAEA]">Prices</li>
      </ul>

      <ul class="flex flex-row gap-5 text-white font-sans cursor-pointer">
        <li class="hover:text-[#EAEAEA]">COMMERCIAL REPAIR</li>
        <li class="hover:text-[#EAEAEA]">RESIDENTAL REPAIR</li>
      </ul>

      <button
        class="text-white font-sans bg-[#0077B6] rounded-[10px] w-30 h-13 cursor-pointer hover:bg-[#006AA2]"
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
