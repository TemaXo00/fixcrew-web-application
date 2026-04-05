<script setup lang="ts">
import logo from '@/assets/images/base/logo.svg'
</script>

<template>
  <div class="flex flex-col gap-4 items-center justify-center">
    <img
      :src="logo"
      alt="Logo"
      class="w-40 pointer-events-none select-none"
    >
    <h1 class="font-bold text-3xl text-accent pointer-events-none select-none">
      Admin Panel
    </h1>
  </div>
</template>

<style scoped></style>
