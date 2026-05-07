<script setup lang="ts">
import TopHeader from '@/components/TopHeader.vue'
import BottomHeader from '@/components/BottomHeader.vue'
import EmergencyPhone from '@/components/mainPage/EmergencyPhone.vue'
import Slider from '@/components/universalComp/Slider.vue'
import ServiceBlock from '@/components/mainPage/ServiceBlock.vue'
import ServiceArea from '@/components/mainPage/ServiceArea.vue'
import MapArea from '@/components/mainPage/MapArea.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import InfoUnion from '@/components/mainPage/InfoUnion.vue'
import ScrollToTop from '@/components/universalComp/ScrollToTop.vue'
import ContactAreaWithBg from '@/components/mainPage/ContactAreaWithBg.vue'
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
    <div class="px-[3%] flex flex-col gap-30">
      <ServiceArea />
      <ContactAreaWithBg />
      <MapArea />
      <InfoUnion/>
      <ScrollToTop/>
    </div>

  </main>
  <FooterComponent />
</template>

<style scoped></style>
