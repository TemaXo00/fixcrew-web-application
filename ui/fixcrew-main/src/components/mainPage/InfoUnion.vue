<script setup lang="ts">
import GetinTouch from '@/components/mainPage/GetinTouch.vue'
import WhyChoose from '@/components/mainPage/WhyChoose.vue'
</script>

<template>
  <div class="px-[20%] py-10 flex flex-col gap-30 rounded-2xl relative">
    <div
      class="absolute inset-0 rounded-2xl bg-[url(@/assets/images/info-bg.jpg)] bg-cover bg-center brightness-50 -z-10"
    ></div>
    <WhyChoose />
    <GetinTouch />
  </div>
</template>

<style scoped></style>
