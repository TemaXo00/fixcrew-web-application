<script setup lang="ts">
interface Props {
  title: string
}

defineProps<Props>()
</script>

<template>
  <h2 class="text-accent text-2xl font-semibold font-sans">
    {{ title }}
  </h2>
</template>

<style scoped></style>
