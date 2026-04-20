<script setup lang="ts">
defineProps<{
  error: string | null | undefined
}>()
</script>

<template>
  <p
    v-if="error"
    class="text-red-500"
  >
    {{ error }}
  </p>
</template>
