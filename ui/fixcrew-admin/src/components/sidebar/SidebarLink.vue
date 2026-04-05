<script setup lang="ts">
import type { Component } from 'vue'
import type { RouteLocationRaw } from 'vue-router'

interface Props {
  to: RouteLocationRaw
  name: string
  icon: Component
}

defineProps<Props>()
</script>

<template>
  <RouterLink
    v-slot="{ isExactActive }"
    :to="to"
  >
    <div
      class="flex items-center justify-between w-50 gap-3 py-1.5 px-2 text-xl font-light font-sans transition-all duration-300 text-container"
      :class="[
        isExactActive
          ? 'bg-accent/60 rounded-lg hover:bg-accent/40 hover:rounded-xl'
          : 'bg-dimmed/60 rounded-lg hover:bg-dimmed/40 hover:rounded-xl',
      ]"
    >
      <p>{{ name }}</p>
      <component
        :is="icon"
        class="w-5 h-5"
      />
    </div>
  </RouterLink>
</template>

<style scoped></style>
