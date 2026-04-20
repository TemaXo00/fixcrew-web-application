<script setup lang="ts">
import type { RegionResponseType } from '@/types/info/regions.types.ts'
import { ref } from 'vue'
import CreateRegions from '@/components/regions/CreateRegions.vue'
import GetAllRegions from '@/components/regions/GetAllRegions.vue'

const getAllRegionsRef = ref<InstanceType<typeof GetAllRegions> | null>(null)

const handleRegionCreated = (region: RegionResponseType) => {
  getAllRegionsRef.value?.handleRegionCreated(region)
}
</script>

<template>
  <CreateRegions @created="handleRegionCreated" />
  <GetAllRegions ref="getAllRegionsRef" />
</template>

<style scoped></style>
