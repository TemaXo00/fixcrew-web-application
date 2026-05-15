<script setup lang="ts">
import FooterComponent from '@/components/FooterComponent.vue'
import BottomHeader from '@/components/BottomHeader.vue'
import TopHeader from '@/components/TopHeader.vue'
import ScrollToTop from '@/components/universalComp/ScrollToTop.vue'
import { VueMarked } from '@hackingzhang/vue-marked'
import { privacyPolicy } from '../common/static-states/privacy-policy.ts'
</script>

<template>
  <TopHeader />
  <BottomHeader />
  <div class="my-10">
    <vue-marked :markdown="privacyPolicy" color-scheme="light" />
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
