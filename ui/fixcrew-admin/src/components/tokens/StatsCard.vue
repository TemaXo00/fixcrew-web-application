<script setup lang="ts">
import SpinnerLoader from '@/components/shared/SpinnerLoader.vue'

interface Props {
  value: number | undefined
  name: string
  isLoading: boolean
}

defineProps<Props>()
</script>

<template>
  <div
    class="flex flex-col gap-2 medium:gap-3 items-center min-w-30 medium:min-w-50 w-full px-4 py-3 bg-accent rounded-lg"
  >
    <SpinnerLoader v-if="isLoading" />
    <p
      v-if="!isLoading"
      class="font-black text-container text-lg mobile:text-xl"
    >
      {{ value ?? 0 }}
    </p>
    <p class="font-normal text-container text-sm mobile:text-lg text-center">
      {{ name }}
    </p>
  </div>
</template>
