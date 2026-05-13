<script setup lang="ts">
interface Props {
  id: string
  name: string
}

defineProps<Props>()
</script>

<template>
  <router-link
    class="p-6 border border-gray-300 cursor-pointer rounded-xl hover:bg-gray-100 transition block text-2xl sm:text-3xl font-medium"
    :to="{ name: 'CategoryDetailedPage', params: { id: String(id) } }"
  >
    {{ name }}
  </router-link>
</template>

<style scoped></style>
