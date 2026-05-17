<script setup lang="ts">
import type { OrderCalendar } from '@/types/order/order.types.ts'
import { useRouter } from 'vue-router'
import OutlineButton from '@/components/shared/buttons/OutlineButton.vue'

const props = defineProps<{
  order: OrderCalendar
}>()

const router = useRouter()

const handleView = () => {
  router.push({ name: 'NotFound' })
}
</script>

<template>
  <div class="flex flex-col gap-3">
    <div
      class="flex flex-col medium:grid xl:grid-cols-1 large:grid-cols-1 gap-3 border border-accent min-h-20 p-3 rounded-lg"
    >
      <p class="font-bold text-accent break-all">
        Order ID: {{ props.order.id }}
      </p>

      <p class="font-medium text-dimmed">
        Client: {{ props.order.client_name }}
      </p>
      <p class="font-medium text-accent">
        Phone: {{ props.order.client_phone }}
      </p>
      <OutlineButton
        name="Show details"
        @click="handleView"
      />
    </div>
  </div>
</template>

<style scoped></style>
