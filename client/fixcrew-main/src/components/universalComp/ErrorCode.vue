<script setup lang="ts">
defineProps<{
  message?: string
  code: number | null
}>()
</script>

<template>
  <div
    class="flex flex-col items-center justify-center w-max p-4 sm:p-6 border sm:border-3 border-red-400"
  >
    <div class="flex flex-col items-center gap-2">
      <p class="text-red-500 text-xl sm:text-2xl font-bakbak">
        {{ message || 'SOMETHING WENT WRONG' }}
      </p>
      <p class="text-[#626262] text-sm sm:text-lg font-bakbak">
        STATUS CODE:
        <span class="text-red-500">
          {{ code }}
        </span>
      </p>
    </div>
  </div>
</template>
