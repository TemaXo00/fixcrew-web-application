<script setup lang="ts">
import { PHONE, PHONE_LINK } from '@/common/constants.ts'
</script>

<template>
  <div class="flex flex-col items-left bg-[#e7e7e7] p-4 sm:p-6 md:p-8 lg:p-10 rounded-2xl gap-3">
    <h2
      class="text-3xl sm:text-4xl md:text-5xl font-sans mb-6 sm:mb-8 md:mb-10 lg:mb-14 text-[#626262] text-center"
    >
      Get In Touch
    </h2>
    <h2
      class="text-xl sm:text-2xl font-sans flex flex-col gap-3 sm:gap-4 md:gap-5 mb-6 sm:mb-8 md:mb-10 text-center"
    >
      <div class="">Call Us</div>
      <div>
        <a :href="PHONE_LINK">{{ PHONE }}</a>
      </div>
      <div>Available 24/7 for emergency</div>
    </h2>
    <h2 class="text-xl sm:text-2xl font-sans flex flex-col gap-3 sm:gap-4 md:gap-5 text-center">
      <ul>
        <li>EPA Certified & Licensed (#50591)</li>
        <li>10+ Years of Trusted Service</li>
        <li>Same-Day Emergency Service</li>
        <li>Warranty on All Work</li>
      </ul>
    </h2>
  </div>
</template>

<style scoped></style>
