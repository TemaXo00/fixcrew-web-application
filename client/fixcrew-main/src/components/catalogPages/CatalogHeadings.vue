<script setup lang="ts">
interface Props {
  name: string | undefined
}

defineProps<Props>()
</script>

<template>
  <div class="pt-10">
    <h2 class="text-4xl sm:text-5xl font-bold mb-8">{{ name }}</h2>
  </div>
</template>

<style scoped></style>
