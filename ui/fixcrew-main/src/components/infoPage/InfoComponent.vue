<script setup lang="ts">
import { VueMarked } from '@hackingzhang/vue-marked'
import type { ServiceInterface } from '@/interfaces/service.interface.ts'
import { computed } from 'vue'
import InfoHeader from '@/components/infoPage/InfoHeader.vue'
import InfoSubHeader from '@/components/infoPage/InfoSubHeader.vue'

const props = defineProps<{
  info: ServiceInterface | null
}>()

const markdown = computed(() => props.info?.description || '')
</script>

<template>
  <div class="flex flex-col items-center gap-10 mt-20">
    <InfoHeader :name="props.info?.name" :cover_id="props.info?.cover_id" />
    <InfoSubHeader
      :price="props.info?.price"
      :sale_percent="props.info?.sale_percent"
      :avg_time="props.info?.avg_time"
    />

    <vue-marked color-scheme="light" :markdown="markdown" />
  </div>
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
