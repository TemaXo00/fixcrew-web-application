<script setup lang="ts">
import TopHeader from '@/components/TopHeader.vue'
import BottomHeader from '@/components/BottomHeader.vue'
import EmergencyPhone from '@/components/mainPage/EmergencyPhone.vue'
import Slider from '@/components/universalComp/Slider.vue'
import ServiceBlock from '@/components/mainPage/ServiceBlock.vue'
import ServiceArea from '@/components/mainPage/ServiceArea.vue'
</script>

<template>
  <TopHeader />
  <BottomHeader />
  <main class="px-[%] flex flex-col gap-10">
    <div class="px-[3%]">
      <Slider />
      <ServiceBlock />
    </div>

    <EmergencyPhone />
    <ServiceArea />
  </main>
</template>

<style scoped></style>
