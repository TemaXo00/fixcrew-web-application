<script setup lang="ts">
interface Props {
  name: string
  isLoading?: boolean
}

defineProps<Props>()
</script>

<template>
  <button
    class="transition ease-in duration-300 outline-none py-3 px-12 font-primary font-semibold rounded-xl hover:scale-103 border border-accent text-accent"
    :disabled="isLoading === true"
  >
    {{ isLoading ? 'Loading...' : name }}
  </button>
</template>

<style scoped></style>
