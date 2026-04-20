<script setup lang="ts">
import { onUnmounted, ref, watch } from 'vue'
import { filesApi } from '@/api/file/files.api'
import ErrorShort from '@/components/shared/errors/ErrorShort.vue'
import SpinnerLoader from '@/components/shared/SpinnerLoader.vue'
import { FileVisibilityEnum } from '@/types/file/files.types'

interface Props {
  fileId: string | null
  visibility?: FileVisibilityEnum
  alt?: string
  className?: string
}

const props = withDefaults(defineProps<Props>(), {
  visibility: FileVisibilityEnum.public,
  alt: 'Image',
})

const imageUrl = ref<string | null>(null)
const isLoading = ref(false)
const hasError = ref(false)

const loadImage = async () => {
  if (!props.fileId) {
    imageUrl.value = null
    return
  }

  isLoading.value = true
  hasError.value = false

  try {
    const blob
      = props.visibility === FileVisibilityEnum.public
        ? await filesApi.getPublicFile(props.fileId)
        : await filesApi.getPrivateFile(props.fileId)

    if (imageUrl.value) {
      URL.revokeObjectURL(imageUrl.value)
    }

    imageUrl.value = URL.createObjectURL(blob)
  }
  catch (err) {
    console.error('Failed to load image:', err)
    hasError.value = true
  }
  finally {
    isLoading.value = false
  }
}

watch(
  () => props.fileId,
  () => {
    loadImage()
  },
  { immediate: true },
)

onUnmounted(() => {
  if (imageUrl.value) {
    URL.revokeObjectURL(imageUrl.value)
  }
})
</script>

<template>
  <div class="inline-block">
    <img
      v-if="imageUrl"
      :src="imageUrl"
      :alt="alt"
      :class="className"
    >
    <SpinnerLoader v-if="isLoading" />
    <ErrorShort
      v-if="hasError"
      error="Error of loading image"
    />
  </div>
</template>
