<script setup lang="ts">
import { ref, watch } from 'vue'

interface AvatarInputProps {
  name: string
  isNecessary?: boolean
  modelValue: File | null
}

const props = defineProps<AvatarInputProps>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: File | null): void
}>()

const preview = ref<string | null>(null)

watch(
  () => props.modelValue,
  (file) => {
    if (file) {
      const reader = new FileReader()
      reader.onload = () => (preview.value = reader.result as string)
      reader.readAsDataURL(file)
    }
    else {
      preview.value = null
    }
  },
  { immediate: true },
)

const onFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0] ?? null
  emit('update:modelValue', file)

  if (file) {
    const reader = new FileReader()
    reader.onload = () => {
      preview.value = reader.result as string
    }
    reader.readAsDataURL(file)
  }
  else {
    preview.value = null
  }
}
</script>

<template>
    <div class="flex flex-col gap-2 mb-4">
        <div class="flex flex-row gap-2">
            <p class="text-lg text-dimmed pointer-events-none select-none font-primary">
                {{ name }}
            </p>
            <p
                v-if="isNecessary"
                class="text-lg text-dimmed pointer-events-none select-none font-primary"
            >
                *
            </p>
        </div>

        <div
            class="relative w-40 h-40 border-dashed border-2 border-gray-300 rounded-lg flex items-center justify-center cursor-pointer"
        >
            <input
                type="file"
                accept="image/*"
                class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                @change="onFileChange"
            >
            <span
                v-if="!preview"
                class="text-gray-400 text-center"
            > Click or Drag to upload </span>
            <img
                v-if="preview"
                :src="preview"
                class="w-full h-full object-cover rounded-lg"
                alt="avatar"
            >
        </div>
    </div>
</template>
