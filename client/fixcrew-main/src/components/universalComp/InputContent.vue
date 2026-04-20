<script setup lang="ts">
interface IProps {
  placeholder: string
  type: string
  modelValue: string
}
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

function updateValue(event: Event) {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
defineProps<IProps>()
</script>

<template>
  <input
    :placeholder="placeholder"
    :type="type"
    :value="modelValue"
    @input="updateValue"
    class="w-full border-2 border-[#EAEAEA] pt-5 p-5 resize-none hover:border-gray-500 rounded-2xl"
  />
</template>

<style scoped></style>
