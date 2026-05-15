<script setup lang="ts">
import FooterComponent from '@/components/FooterComponent.vue'
import BottomHeader from '@/components/BottomHeader.vue'
import TopHeader from '@/components/TopHeader.vue'
import ScrollToTop from '@/components/universalComp/ScrollToTop.vue'
import { VueMarked } from '@hackingzhang/vue-marked'
import { about } from '@/common/static-states/about.ts'
import aboutImg from '@/assets/images/about.png'
</script>

<template>
  <TopHeader />
  <BottomHeader />
  <div class="flex flex-col lg:flex-row items-center min-h-screen p-[3%]">
    <vue-marked :markdown="about" color-scheme="light" />
    <img :src="aboutImg" alt="about" class="max-h-190"/>
  </div>
  <FooterComponent />
  <ScrollToTop />
</template>

<style scoped>
:deep(.v-marked) {
  max-width: 80%;
  padding: 0 16px;
}

@media (max-width: 768px) {
  :deep(.v-marked) {
    max-width: 90%;
    font-size: 14px;
    padding: 0 12px;
  }

  :deep(.v-marked pre),
  :deep(.v-marked .highlight pre) {
    padding: 12px;
    font-size: 12px;
    overflow-x: auto;
  }

  :deep(.v-marked table) {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
  }

  :deep(.v-marked h1) {
    font-size: 1.75rem;
  }

  :deep(.v-marked h2) {
    font-size: 1.3rem;
  }

  :deep(.v-marked img) {
    max-width: 100%;
    height: auto;
  }
}
</style>
