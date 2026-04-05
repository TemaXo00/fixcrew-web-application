<script setup lang="ts">
interface Props {
  value: number | undefined
  name: string
}

defineProps<Props>()
</script>

<template>
  <div
    class="flex flex-col gap-2 mobile:gap-3 items-center min-w-30 mobile:min-w-50 w-full mobile:w-auto px-4 py-3 mobile:py-4 bg-container-muted/60 border border-accent rounded-lg"
  >
    <p class="font-black text-accent text-lg mobile:text-xl">
      {{ value ?? 0 }}
    </p>
    <p class="font-normal text-accent text-sm mobile:text-lg text-center">
      {{ name }}
    </p>
  </div>
</template>
