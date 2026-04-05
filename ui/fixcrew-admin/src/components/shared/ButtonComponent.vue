<script setup lang="ts">
interface Props {
  name: string
  isLoading?: boolean
}

defineProps<Props>()
</script>

<template>
  <button
    class="transition ease-in duration-300 outline-none py-3 px-12 font-primary font-semibold rounded-xl hover:scale-103"
    :class="isLoading ? 'bg-muted-accent text-container-muted' : 'bg-accent text-container'"
  >
    {{ isLoading ? 'Loading...' : name }}
  </button>
</template>

<style scoped></style>
