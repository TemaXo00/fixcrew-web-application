<script setup lang="ts">
import { VueMarked } from '@hackingzhang/vue-marked'
import type { ServiceInterface } from '@/interfaces/service.interface.ts'
import { computed } from 'vue'

const props = defineProps<{
  info: ServiceInterface | null
}>()

const markdown = computed(() => props.info?.description || '')
</script>

<template>
  {{ props.info?.name }}

  <vue-marked color-scheme="light" :markdown="markdown" />
</template>

<style scoped></style>
