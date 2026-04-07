<script setup lang="ts">
import { Bars3Icon } from '@heroicons/vue/24/solid'

const emit = defineEmits<{
  (e: 'toggle'): void
}>()
</script>

<template>
  <header
    class="bg-container-muted border-b border-accent/30 medium:hidden"
  >
    <div class="flex items-center justify-between px-4 py-3">
      <button
        class="p-2 rounded-lg bg-muted-accent text-container hover:bg-muted-accent/85 transition-colors"
        @click="emit('toggle')"
      >
        <Bars3Icon class="w-6 h-6" />
      </button>
      <h1 class="text-lg font-semibold text-muted-accent font-sans">
        Admin Panel
      </h1>
      <div class="w-9" />
    </div>
  </header>
</template>
