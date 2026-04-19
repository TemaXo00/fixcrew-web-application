<script setup lang="ts">
import type { ServiceResponseType } from '@/types/info/services.types'
import { ref } from 'vue'
import { extractApiError } from '@/api/error-handler.api.ts'
import { servicesApi } from '@/api/info/services.api.ts'
import AccentButton from '@/components/shared/buttons/AccentButton.vue'
import OutlineButton from '@/components/shared/buttons/OutlineButton.vue'
import ErrorCode from '@/components/shared/errors/ErrorCode.vue'
import FileImage from '@/components/shared/FileImage.vue'
import FileInput from '@/components/shared/inputs/FileInput.vue'
import { FileVisibilityEnum } from '@/types/file/files.types'

interface Props {
  id: string
  currentCoverId: string | null
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
const coverId = ref<string | null>(props.currentCoverId)

const updateCover = async () => {
  try {
    isLoading.value = true
    error.value = null
    const updatedService = await servicesApi.updateCover(props.id, { cover_id: coverId.value })
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
  <div class="flex flex-col gap-4">
    <div
      v-if="currentCoverId"
      class="flex flex-col gap-2"
    >
      <p class="text-dimmed text-sm">
        Current cover:
      </p>
      <FileImage
        :file-id="currentCoverId"
        :visibility="FileVisibilityEnum.public"
        class-name="w-32 h-32 object-cover rounded"
      />
    </div>

    <FileInput
      v-model="coverId"
      name="New Cover Image"
      bucket="services"
      :visibility="FileVisibilityEnum.public"
      :max-size-mb="5"
    />

    <div class="flex flex-col medium:flex-row gap-2">
      <OutlineButton
        name="Cancel"
        @click="closeWindow"
      />
      <AccentButton
        name="Save Cover"
        :is-loading="isLoading"
        @click="updateCover"
      />
    </div>

    <ErrorCode
      v-if="error"
      :code="error"
    />
  </div>
</template>
