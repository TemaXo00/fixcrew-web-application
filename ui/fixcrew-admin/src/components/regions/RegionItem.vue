<script setup lang="ts">
import type { RegionResponseType } from '@/types/regions.types.ts'

const props = defineProps<RegionResponseType>()
</script>

<template>
  <div class="grid grid-cols-5 items-center gap-5 p-3 min-h-20 border border-accent rounded-lg">
    <p class="font-bold text-accent break-all min-w-37.5 large:min-w-50">
      {{ props.name }}
    </p>
    <p class="font-medium text-dimmed text-xs smaller:text-sm small:text-base min-w-25">
      Average response:
      <span class="text-muted-accent">
        {{ props.avg_response }}
      </span>
    </p>
  </div>
</template>

<style scoped></style>
