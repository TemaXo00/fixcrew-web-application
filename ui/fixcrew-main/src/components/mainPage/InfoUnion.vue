<script setup lang="ts">
import GetinTouch from '@/components/mainPage/GetinTouch.vue'
import WhyChoose from '@/components/mainPage/WhyChoose.vue'
</script>

<template>
  <div
    class="px-[20%] flex flex-col gap-30 bg-[url(@/assets/images/info-bg.jpg)] bg-cover bg-center min-h-screen rounded-2xl"
  >
    <WhyChoose />
    <GetinTouch />
  </div>
</template>

<style scoped></style>
