<script setup lang="ts">
import { computed, onMounted } from 'vue'
import Title from '@/components/shared/Title.vue'
import { useProfileStore } from '@/stores/profile.store.ts'

const store = useProfileStore()

onMounted(async () => {
  await store.getMe()
})

const title = computed(() => `Welcome back, ${store.user?.name}`)
</script>

<template>
  <Title :title="title" />
</template>

<style scoped></style>
