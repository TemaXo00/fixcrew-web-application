<script setup lang="ts">
defineProps<{
  message?: string
  code: number | null
}>()
</script>

<template>
  <div class="flex flex-col items-center justify-center w-max p-4 medium:p-6 border medium:border-3 border-red-400">
    <div class="flex flex-col items-center gap-2">
      <p class="text-red-500 text-xl medium:text-2xl font-accent">
        {{ message || 'SOMETHING WENT WRONG' }}
      </p>
      <p class="text-dimmed text-sm medium:text-lg font-accent">
        STATUS CODE:
        <span class="text-red-500">
          {{ code }}
        </span>
      </p>
    </div>
  </div>
</template>
