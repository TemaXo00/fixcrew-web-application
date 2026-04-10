<script setup lang="ts">
import logo from '@/assets/images/base/logo.svg'

interface Props {
  name: string
}

defineProps<Props>()
</script>

<template>
  <div class="flex flex-col items-start gap-10 mb-10">
    <img
      :src="logo"
      alt="Logo"
      class="h-15 pointer-events-none select-none"
    >
    <h1 class="text-4xl font-secondary font-bold text-muted-accent pointer-events-none select-none">
      {{ name }}
    </h1>
  </div>
</template>

<style scoped></style>
