<script setup lang="ts">
import TopHeader from '@/components/TopHeader.vue'
import BottomHeader from '@/components/BottomHeader.vue'
import EmergencyPhone from '@/components/mainPage/EmergencyPhone.vue'
import Slider from '@/components/universalComp/Slider.vue'
import ServiceBlock from '@/components/mainPage/ServiceBlock.vue'
import ServiceArea from '@/components/mainPage/ServiceArea.vue'
import ContactArea from '@/components/mainPage/ContactArea.vue'
import MapArea from '@/components/mainPage/MapArea.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import WhyChoose from '@/components/mainPage/WhyChoose.vue'
import GetinTouch from '@/components/mainPage/GetinTouch.vue'
import InfoUnion from '@/components/mainPage/InfoUnion.vue'
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
      <ContactArea />
      <MapArea />
      <InfoUnion/>
    </div>

  </main>
  <FooterComponent />
</template>

<style scoped></style>
