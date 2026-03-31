<script setup lang="ts">
import logo from '@/assets/images/logo.svg'
</script>

<template>
  <footer class="w-screen bg-main flex flex-col gap-10 md:flex-row items-center justify-around p-7 mt-10">
    <p class="max-w-70 text-lg font-normal text-white">
      Your reliable solution for fast, accurate, and professional service for all major appliance
      and refrigeration needs.
    </p>
    <img :src="logo" alt="logo" class="w-60" />
    <div class="flex flex-col">
      <p class="text-lg font-normal text-white">Contact</p>
      <ul class="list-disc text-lg font-normal text-white">
        <li><a href="tel:6507197300">(650) 719-7300</a></li>
        <li>9am – 8pm Every Day.</li>
        <li>Los Gatos, CA</li>
      </ul>
    </div>
  </footer>
</template>

<style scoped></style>
