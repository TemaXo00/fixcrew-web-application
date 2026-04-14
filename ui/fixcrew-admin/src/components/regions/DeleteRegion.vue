<script setup lang="ts">
import { ref } from 'vue'
import { extractApiError } from '@/api/error-handler.api.ts'
import { regionsApi } from '@/api/info/regions.api.ts'
import DangerousButton from '@/components/shared/buttons/DangerousButton.vue'
import OutlineButton from '@/components/shared/buttons/OutlineButton.vue'
import ErrorDisplay from '@/components/shared/ErrorDisplay.vue'

interface Props {
  id: string
}

defineProps<Props>()

const emits = defineEmits<{
  (e: 'close'): void
  (e: 'deleted', id: string): void
}>()

const closeWindow = (): void => {
  emits('close')
}

const isLoading = ref<boolean>(false)
const error = ref<string>()

const deleteRegion = async (id: string): Promise<void> => {
  try {
    isLoading.value = true
    error.value = ''
    await regionsApi.deleteRegion(id)
    emits('deleted', id)
    closeWindow()
  }
  catch (err) {
    const apiError = extractApiError(err)
    error.value = apiError.message
  }
  finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="flex flex-col gap-2">
    <p class="text-red-400">
      Are you sure want to delete this region?
    </p>
    <p class="text-red-500 font-semibold">
      This action cannot be undone!
    </p>
  </div>
  <div class="flex flex-col medium:flex-row gap-3 max-medium:w-50">
    <OutlineButton
      name="Back"
      @click="closeWindow"
    />
    <DangerousButton
      name="Delete region"
      @click="deleteRegion(id)"
    />
  </div>
  <ErrorDisplay
    v-if="error"
    :error="error"
  />
</template>

<style scoped></style>
