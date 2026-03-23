<script setup lang="ts">
interface InputProps {
  name: string
  isNecessary?: boolean
  type: string
  placeText: string
  modelValue: string
}
defineProps<InputProps>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

function updateValue(event: Event) {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <div class="flex flex-col gap-2 mb-4">
    <div class="flex flex-row gap-2">
      <p class="text-lg text-dimmed pointer-events-none select-none font-primary">{{ name }}</p>
      <p
        v-if="isNecessary === true"
        class="text-lg text-dimmed pointer-events-none select-none font-primary"
      >
        *
      </p>
    </div>
    <input
      :placeholder="placeText"
      :value="modelValue"
      :type="type"
      @input="updateValue"
      class="w-50 small:w-70 medium:w-110 large:w-130 transition ease-in-out font-secondary duration-300 border-2 border-dimmed/80 rounded-lg text-dimmed/65 p-2 focus:text-dimmed focus:scale-102 focus:outline-none"
    />
  </div>
</template>
