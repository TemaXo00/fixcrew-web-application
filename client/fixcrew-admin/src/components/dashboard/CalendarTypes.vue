<script setup lang="ts">
import OutlineButton from '@/components/shared/buttons/OutlineButton.vue'

defineProps<{
  currentView: 'month' | 'week' | 'day'
}>()

const emit = defineEmits<{
  (e: 'changeView', view: 'month' | 'week' | 'day'): void
}>()

const views = [
  { value: 'month' as const, label: 'Month' },
  { value: 'week' as const, label: 'Week' },
  { value: 'day' as const, label: 'Day' },
]
</script>

<template>
  <div class="flex flex-col medium:flex-row gap-2">
    <OutlineButton
      v-for="view in views"
      :key="view.value"
      :name="view.label"
      class="text-sm medium:text-base px-3 py-1 medium:px-4 medium:py-2"
      :class="[currentView === view.value ? 'bg-accent text-container' : '']"
      @click="emit('changeView', view.value)"
    />
  </div>
</template>

<style scoped></style>
