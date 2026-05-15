<script setup lang="ts">
import { PHONE, PHONE_LINK } from '@/common/constants.ts'
</script>

<template>
  <div
    class="bg-[#00B4D8] w-full px-4 sm:px-6 md:px-7 py-6 sm:py-8 md:py-10 flex flex-col items-center gap-6 sm:gap-8 md:gap-10"
  >
    <div class="text-white text-4xl font-sans">
      Need <span class="underline">emergency</span> repair?
    </div>
    <div class="text-2xl text-white font-sans text-center">
      We offer same-day service for urgent appliance breakdowns.<br />
      Don’t let a broken appliance disrupt your day.
    </div>

    <button
      class="bg-[#0077B6] hover:bg-[#005a8c] transition-colors duration-300 rounded-lg px-8 py-4 shadow-lg"
    >
      <a :href="PHONE_LINK" class="text-red-400 text-2xl font-semibold whitespace-nowrap">
        📞 {{ PHONE }}
      </a>
    </button>
  </div>
</template>
