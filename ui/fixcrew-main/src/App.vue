<script setup lang="ts">
import TopHeader from '@/components/TopHeader.vue'
import BottomHeader from '@/components/BottomHeader.vue'
import Slider from '@/components/universalComp/Slider.vue'
import ServiceBlock from '@/components/mainPage/ServiceBlock.vue'
import EmergencyPhone from '@/components/mainPage/EmergencyPhone.vue'
</script>

<template>
    <TopHeader />
    <BottomHeader/>
  <main class="px-[0%] flex flex-col gap-10">
    <Slider/>
    <ServiceBlock/>
    <EmergencyPhone/>
  </main>
</template>

<style scoped></style>
