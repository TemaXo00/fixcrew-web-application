<script setup lang="ts">
import { ref } from 'vue'
import { extractApiError } from '@/api/error-handler.api.ts'
import { typesApi } from '@/api/info/types.api.ts'
import DangerousButton from '@/components/shared/buttons/DangerousButton.vue'
import OutlineButton from '@/components/shared/buttons/OutlineButton.vue'
import ErrorCode from '@/components/shared/errors/ErrorCode.vue'

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
const errorCode = ref<number | null>(null)
const errorMessage = ref<string>('')

const deleteType = async (id: string): Promise<void> => {
  try {
    isLoading.value = true
    errorCode.value = null
    errorMessage.value = ''
    await typesApi.deleteType(id)
    emits('deleted', id)
    closeWindow()
  }
  catch (err) {
    const apiError = extractApiError(err)
    errorCode.value = apiError.statusCode
    errorMessage.value = apiError.message
  }
  finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="flex flex-col gap-2">
    <p class="text-red-400">
      Are you sure want to delete this type?
    </p>
    <p class="text-red-500 font-semibold">
      This action cannot be undone! All categories and services in this type will be deleted.
    </p>
  </div>
  <div class="flex flex-col medium:flex-row gap-3 max-medium:w-50">
    <OutlineButton
      name="Back"
      @click="closeWindow"
    />
    <DangerousButton
      name="Delete type"
      :is-loading="isLoading"
      @click="deleteType(id)"
    />
  </div>
  <ErrorCode
    v-if="errorCode"
    :message="errorMessage"
    :code="errorCode"
  />
</template>
