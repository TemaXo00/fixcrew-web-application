<script setup lang="ts">
interface SelectOption {
  value: string
  label: string
}

interface SelectProps {
  name: string
  isNecessary?: boolean
  placeholder?: string
  options: SelectOption[]
  modelValue: string | undefined
}

defineProps<SelectProps>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const updateValue = (event: Event) => {
  const target = event.target as HTMLSelectElement
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
        v-if="isNecessary === true"
        class="text-lg text-dimmed pointer-events-none select-none font-primary"
      >
        *
      </p>
    </div>
    <select
      :value="modelValue ?? ''"
      class="w-50 small:w-70 medium:w-110 large:w-130 transition ease-in-out font-secondary duration-300 border-2 border-dimmed/80 rounded-lg text-dimmed/65 p-2 focus:text-dimmed focus:scale-102 focus:outline-none bg-container"
      @change="updateValue"
    >
      <option
        v-if="placeholder"
        value=""
        disabled
      >
        {{ placeholder }}
      </option>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>
