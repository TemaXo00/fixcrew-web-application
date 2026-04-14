<script setup lang="ts">
import type { RegionResponseType } from '@/types/regions.types.ts'
import { onMounted, ref } from 'vue'
import { extractApiError } from '@/api/error-handler.api.ts'
import { regionsApi } from '@/api/info/regions.api.ts'
import RegionItem from '@/components/regions/RegionItem.vue'
import SpinnerLoader from '@/components/shared/SpinnerLoader.vue'
import Title from '@/components/shared/Title.vue'

const regions = ref<RegionResponseType[]>([])
const isLoading = ref<boolean>(false)
const error = ref<string>('')

const fetchRegions = async () => {
  try {
    isLoading.value = true
    error.value = ''
    regions.value = await regionsApi.getRegions()
  }
  catch (err: any) {
    const apiError = extractApiError(err)
    error.value = apiError.message
  }
  finally {
    isLoading.value = false
  }
}

const handleRegionCreated = (newRegion: RegionResponseType) => {
  regions.value = [newRegion, ...regions.value]
}

const handleRegionUpdated = (updatedRegion: RegionResponseType) => {
  const index = regions.value.findIndex(r => r.id === updatedRegion.id)
  if (index !== -1) {
    regions.value[index] = updatedRegion
    regions.value = [...regions.value]
  }
}

const handleRegionDeleted = (deletedId: string) => {
  regions.value = regions.value.filter(r => r.id !== deletedId)
}

defineExpose({
  handleRegionCreated,
})

onMounted(async () => {
  await fetchRegions()
})
</script>

<template>
  <SpinnerLoader v-if="isLoading && !regions.length" />
  <div
    v-else
    class="flex flex-col gap-3"
  >
    <Title title="Regions" />
    <RegionItem
      v-for="region in regions"
      :id="region.id"
      :key="region.id"
      :name="region.name"
      :avg_response="region.avg_response"
      @updated="handleRegionUpdated"
      @deleted="handleRegionDeleted"
    />
  </div>
</template>

<style scoped></style>
