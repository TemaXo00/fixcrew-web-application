<script setup lang="ts">
import { ref } from 'vue'

interface PasswordInputProps {
  name: string
  isNecessary?: boolean
  placeText: string
  modelValue: string
}
defineProps<PasswordInputProps>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const showPassword = ref(false)

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
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
        <div class="relative">
            <input
                :placeholder="placeText"
                :value="modelValue ?? ''"
                :type="showPassword ? 'text' : 'password'"
                class="w-50 small:w-70 medium:w-110 large:w-130 transition ease-in-out font-secondary duration-300 border-2 border-dimmed/80 rounded-lg text-dimmed/65 p-2 pr-10 focus:text-dimmed focus:scale-102 focus:outline-none"
                @input="updateValue"
            >
            <button
                type="button"
                class="absolute right-2 top-1/2 -translate-y-1/2 text-dimmed/65 hover:text-dimmed focus:outline-none bg-dimmed/20 px-2 py-1 rounded"
                @click="showPassword = !showPassword"
            >
                <span v-if="showPassword">Hide</span>
                <span v-else>Show</span>
            </button>
        </div>
    </div>
</template>
