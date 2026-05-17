<script setup lang="ts">
import OutlineButton from '@/components/shared/buttons/OutlineButton.vue'

const emit = defineEmits<{
  (e: 'prev'): void
  (e: 'next'): void
  (e: 'today'): void
}>()
</script>

<template>
  <div class="flex flex-col medium:flex-row gap-2">
    <OutlineButton
      name="← Prev"
      class="text-sm medium:text-base px-3 py-1 medium:px-4 medium:py-2"
      @click="emit('prev')"
    />
    <OutlineButton
      name="Today"
      class="text-sm medium:text-base px-3 py-1 medium:px-4 medium:py-2"
      @click="emit('today')"
    />
    <OutlineButton
      name="Next →"
      class="text-sm medium:text-base px-3 py-1 medium:px-4 medium:py-2"
      @click="emit('next')"
    />
  </div>
</template>

<style scoped></style>
