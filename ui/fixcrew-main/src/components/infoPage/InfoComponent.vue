<script setup lang="ts">
import { refrigeratorMock } from '@/mocks/info.mock.ts'
import type { InfoInterface } from '@/interfaces/info.interface.ts'

const props = defineProps<{
  info: InfoInterface
}>()
</script>

<template>
  {{ props.info.photoUrl }}

  {{ props.info.title }}
  {{ props.info.description }}

  <table>
    <tr>
      <td>Name</td>
      <td>Price</td>
    </tr>
    <tr v-for="price in props.info.prices" :key="price.id">
      <td>{{ price.name }}</td>
      <td>{{ price.price }}</td>
    </tr>
  </table>
</template>

<style scoped></style>
