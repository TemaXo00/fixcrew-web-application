<script setup lang="ts">
import type { RouteLocationRaw, RouteRecordNameGeneric } from 'vue-router'

interface Props {
  to: RouteLocationRaw
  name: RouteRecordNameGeneric
}

defineProps<Props>()
</script>

<template>
  <RouterLink
    v-slot="{ isExactActive }"
    :to="to"
  >
    <div
      class="w-full px-4 py-3 text-xl font-secondary font-normal transition-all duration-300 cursor-pointer"
      :class="[
        isExactActive ? 'bg-muted-accent text-container' : 'text-muted-accent hover:bg-dimmed/20',
      ]"
    >
      <p class="font-sans">
        {{ name }}
      </p>
    </div>
  </RouterLink>
</template>

<style scoped></style>
