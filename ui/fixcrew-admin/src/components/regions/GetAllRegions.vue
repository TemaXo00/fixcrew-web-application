<script setup lang="ts">
import type { RegionResponseType } from '@/types/regions.types.ts'
import { onMounted, ref } from 'vue'
import { extractApiError } from '@/api/error-handler.api.ts'
import { regionsApi } from '@/api/info/regions.api.ts'
import RegionItem from '@/components/regions/RegionItem.vue'
import SpinnerLoader from '@/components/shared/SpinnerLoader.vue'

const regions = ref<RegionResponseType[]>()
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

onMounted(async () => {
  await fetchRegions()
})
</script>

<template>
  <SpinnerLoader v-if="isLoading && !regions" />
  <div
    v-else
    class="flex flex-col gap-3"
  >
    <RegionItem
      v-for="region in regions"
      :id="region.id"
      :key="region.id"
      :name="region.name"
      :avg_response="region.avg_response"
    />
  </div>
</template>

<style scoped></style>
