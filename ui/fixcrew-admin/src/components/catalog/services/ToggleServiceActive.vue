<script setup lang="ts">
import type { ServiceResponseType } from '@/types/info/services.types'
import { ref } from 'vue'
import { extractApiError } from '@/api/error-handler.api.ts'
import { servicesApi } from '@/api/info/services.api.ts'
import AccentButton from '@/components/shared/buttons/AccentButton.vue'
import OutlineButton from '@/components/shared/buttons/OutlineButton.vue'
import ErrorCode from '@/components/shared/errors/ErrorCode.vue'

interface Props {
  id: string
  isActive: boolean
}

const props = defineProps<Props>()

const emits = defineEmits<{
  (e: 'close'): void
  (e: 'updated', service: ServiceResponseType): void
}>()

const closeWindow = (): void => {
  emits('close')
}

const isLoading = ref<boolean>(false)
const error = ref<number | null>(null)

const toggleActive = async () => {
  try {
    isLoading.value = true
    error.value = null
    const updatedService = await servicesApi.toggleActive(props.id)
    emits('updated', updatedService)
    closeWindow()
  }
  catch (err) {
    const apiError = extractApiError(err)
    error.value = apiError.statusCode
  }
  finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="flex flex-col gap-2">
    <p class="text-dimmed">
      Current status:
      <span
        :class="props.isActive ? 'text-green-500' : 'text-red-500'"
        class="font-semibold"
      >
        {{ props.isActive ? 'Active' : 'Inactive' }}
      </span>
    </p>
    <p class="text-muted-accent">
      Are you sure you want to {{ props.isActive ? 'deactivate' : 'activate' }} this service?
    </p>
    <div class="flex flex-col medium:flex-row gap-2">
      <OutlineButton
        name="Cancel"
        @click="closeWindow"
      />
      <AccentButton
        :name="props.isActive ? 'Deactivate' : 'Activate'"
        :is-loading="isLoading"
        @click="toggleActive"
      />
    </div>
    <ErrorCode
      v-if="error"
      :code="error"
    />
  </div>
</template>
