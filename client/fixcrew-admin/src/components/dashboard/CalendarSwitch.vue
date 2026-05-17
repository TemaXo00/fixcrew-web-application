<script setup lang="ts">
import OutlineButton from '@/components/shared/buttons/OutlineButton.vue'

const emit = defineEmits<{
  (e: 'prev'): void
  (e: 'next'): void
  (e: 'today'): void
}>()
</script>

<template>
  <div class="flex gap-2">
    <OutlineButton
      name="← Prev"
      @click="emit('prev')"
    />
    <OutlineButton
      name="Today"
      @click="emit('today')"
    />
    <OutlineButton
      name="Next →"
      @click="emit('next')"
    />
  </div>
</template>

<style scoped></style>
