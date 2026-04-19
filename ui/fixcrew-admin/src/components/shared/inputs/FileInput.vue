<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/yup'
import { useForm } from 'vee-validate'
import { ref, watch } from 'vue'
import { filesApi } from '@/api/file/files.api'
import AccentButton from '@/components/shared/buttons/AccentButton.vue'
import DangerousButton from '@/components/shared/buttons/DangerousButton.vue'
import OutlineButton from '@/components/shared/buttons/OutlineButton.vue'
import ErrorShort from '@/components/shared/errors/ErrorShort.vue'
import { FileVisibilityEnum } from '@/types/file/files.types'
import { uploadFileSchema } from '@/utils/validation/file/files.validation.ts'

interface Props {
  name: string
  isNecessary?: boolean
  bucket?: string
  visibility?: FileVisibilityEnum
  modelValue?: string | null
  maxSizeMB?: number
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  bucket: 'default',
  visibility: FileVisibilityEnum.public,
  maxSizeMB: 5,
  disabled: false,
  modelValue: null,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | null): void
  (e: 'uploadSuccess', id: string): void
  (e: 'uploadError', error: string): void
  (e: 'fileSelected', file: File): void
}>()

const selectedFile = ref<File | null>(null)
const uploadedId = ref<string | null>(null)
const isLoading = ref(false)
const previewUrl = ref<string | null>(null)
const fileInputRef = ref<HTMLInputElement | null>(null)

const { errors, setFieldValue, setErrors, resetForm, validate } = useForm<{
  file: File | null
}>({
  validationSchema: toTypedSchema(uploadFileSchema),
  initialValues: {
    file: null,
  },
})

const createPreview = (file: File) => {
  if (previewUrl.value) {
    URL.revokeObjectURL(previewUrl.value)
  }
  previewUrl.value = URL.createObjectURL(file)
}

const clearPreview = () => {
  if (previewUrl.value) {
    URL.revokeObjectURL(previewUrl.value)
    previewUrl.value = null
  }
}

const resetFileSelection = () => {
  selectedFile.value = null
  uploadedId.value = null
  clearPreview()
  setFieldValue('file', null)
  if (fileInputRef.value) {
    fileInputRef.value.value = ''
  }
}

const handleFileSelect = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]

  if (!file) {
    resetFileSelection()
    return
  }

  await setFieldValue('file', file)
  await validate()

  if (errors.value.file) {
    resetFileSelection()
    return
  }

  selectedFile.value = file
  createPreview(file)
  emit('fileSelected', file)
}

const uploadFile = async () => {
  if (!selectedFile.value) {
    setErrors({ file: 'Select a file' })
    return
  }

  isLoading.value = true

  try {
    const result = await filesApi.upload({
      file: selectedFile.value,
      bucket: props.bucket,
      visibility: props.visibility,
    })

    uploadedId.value = result.id
    emit('update:modelValue', result.id)
    emit('uploadSuccess', result.id)
    resetForm()
  }
  catch (err: any) {
    const errorMessage = err.response?.data?.message || 'File upload error'
    setErrors({ file: errorMessage })
    emit('uploadError', errorMessage)
  }
  finally {
    isLoading.value = false
  }
}

const triggerFileInput = () => {
  if (!props.disabled) {
    fileInputRef.value?.click()
  }
}

const removeFile = () => {
  resetFileSelection()
  emit('update:modelValue', null)
}

watch(
  () => props.disabled,
  () => {
    if (props.disabled) {
      resetFileSelection()
    }
  },
)
</script>

<template>
  <div class="mb-4">
    <div class="flex gap-2 mb-2">
      <p class="text-lg text-dimmed font-primary">
        {{ name }}
      </p>
      <p
        v-if="isNecessary"
        class="text-lg text-dimmed font-primary"
      >
        *
      </p>
    </div>

    <input
      ref="fileInputRef"
      type="file"
      accept="image/jpeg,image/png,image/gif,image/webp"
      class="hidden"
      :disabled="disabled"
      @change="handleFileSelect"
    >

    <div v-if="!selectedFile && !uploadedId">
      <OutlineButton
        name="Choose Image"
        :is-loading="false"
        @click="triggerFileInput"
      />
      <p class="text-dimmed/40 text-sm mt-1">
        Max size: {{ maxSizeMB }}MB
      </p>
      <ErrorShort :error="errors.file" />
    </div>

    <div v-if="selectedFile && !uploadedId">
      <img
        v-if="previewUrl"
        :src="previewUrl"
        alt="Preview"
        class="w-32 h-32 object-cover rounded mb-2"
      >
      <p class="text-dimmed text-sm">
        {{ selectedFile.name }}
      </p>
      <p class="text-dimmed/40 text-xs mb-2">
        {{ (selectedFile.size / 1024 / 1024).toFixed(2) }} MB
      </p>
      <div class="flex gap-2">
        <AccentButton
          name="Upload"
          :is-loading="isLoading"
          @click="uploadFile"
        />
        <OutlineButton
          name="Cancel"
          :is-loading="false"
          @click="resetFileSelection"
        />
      </div>
      <ErrorShort :error="errors.file" />
    </div>

    <div v-if="uploadedId">
      <p class="text-dimmed text-sm">
        Uploaded successfully
      </p>
      <p class="text-dimmed/40 text-xs mb-2">
        ID: {{ uploadedId }}
      </p>
      <DangerousButton
        name="Remove"
        :is-loading="false"
        @click="removeFile"
      />
    </div>
  </div>
</template>
