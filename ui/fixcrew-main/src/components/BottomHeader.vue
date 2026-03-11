<script setup lang="ts"></script>

<template>
  <div class="flex justify-evenly items-center bg-main max-w-auto h-20 px-30 flex-row">
    <div class="space-y-2">
      <span class="block w-8 h-0.5 bg-white cursor-pointer"></span>
      <span class="block w-5 h-0.5 bg-white cursor-pointer"></span>
    </div>
    <img src="../assets/images/logo.svg" alt="logo" />
    <ul class="flex flex-row gap-5 text-white font-sans cursor-pointer ">
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
</template>

<style scoped></style>
