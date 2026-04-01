<script setup lang="ts">
import { refrigeratorMock } from '@/mocks/info.mock.ts'
</script>

<template>
  {{ refrigeratorMock.title }}
  {{ refrigeratorMock.description }}
  {{ refrigeratorMock.photoUrl }}
  <table>
    <tr>
      <td>Name</td>
      <td>Price</td>
    </tr>
    <tr v-for="price in refrigeratorMock.prices" :key="price.id">
      <td>{{ price.name }}</td>
      <td>{{ price.price }}</td>
    </tr>
  </table>
</template>

<style scoped></style>
