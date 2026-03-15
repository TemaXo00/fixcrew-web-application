
<script setup lang="ts">
import ServiceListItem from './ServiceListItem.vue'

interface ServiceItem {
  icon: string
  title: string
  description: string
}

defineProps<{
  items: ServiceItem[]
}>()
</script>

<template>
  <ul class="flex flex-col gap-5 list-none p-0 text-left">
    <ServiceListItem
      v-for="(item, index) in items"
      :key="index"
      :icon="item.icon"
      :title="item.title"
      :description="item.description"
    />
  </ul>
</template>
