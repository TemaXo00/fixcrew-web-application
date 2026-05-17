<script setup lang="ts">
defineProps<{
  error: string | null | undefined
}>()
</script>

<template>
  <p
    v-if="error"
    class="text-red-500 wrap-normal max-w-120"
  >
    {{ error }}
  </p>
</template>
