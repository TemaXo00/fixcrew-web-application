<script setup lang="ts">
import Calendar from '@toast-ui/calendar'
import { onMounted, ref } from 'vue'
import Title from '@/components/shared/Title.vue'
import '@toast-ui/calendar/dist/toastui-calendar.min.css'

const calendarRef = ref<HTMLDivElement | null>(null)

const orders = [
  {
    id: '1',
    title: 'Washing machine repair',
    client: 'john.doe@gmail.com',
    status: 'CREATED',
    start: '2026-04-14T10:00:00',
    end: '2026-04-14T12:00:00',
  },
  {
    id: '2',
    title: 'Refrigerator diagnostics',
    client: 'anna.smith@gmail.com',
    status: 'CREATED',
    start: '2026-04-15T13:00:00',
    end: '2026-04-15T15:30:00',
  },
  {
    id: '3',
    title: 'Dishwasher repair',
    client: 'mike.ross@gmail.com',
    status: 'COMPLETED',
    start: '2026-04-16T09:00:00',
    end: '2026-04-16T11:00:00',
  },
  {
    id: '4',
    title: 'Air conditioner maintenance',
    client: 'sarah.connor@gmail.com',
    status: 'CREATED',
    start: '2026-04-17T16:00:00',
    end: '2026-04-17T17:00:00',
  },
]

onMounted(() => {
  if (!calendarRef.value) {
    return
  }

  const calendar = new Calendar(calendarRef.value, {
    defaultView: 'week',
    usageStatistics: false,
    isReadOnly: true,
  })

  calendar.createEvents(
    orders.map(order => ({
      id: order.id,
      calendarId: '1',
      title: order.title,
      category: 'time',
      start: order.start,
      end: order.end,
      backgroundColor: 'var(--color-accent)',
      borderColor: 'var(--color-muted-accent)',
      color: 'var(--color-container)',
    })),
  )
})

const formatDate = (dateStr: string) => new Date(dateStr).toLocaleString()
</script>

<template>
  <div class="flex flex-col gap-4">
    <Title title="Orders Calendar" />

    <div class="grid grid-cols-1 xl:grid-cols-3 gap-4">
      <div class="flex flex-col gap-3">
        <div
          v-for="order in orders"
          :key="order.id"
          class="flex flex-col medium:grid xl:grid-cols-1 large:grid-cols-1 gap-3 border border-accent min-h-20 p-3 rounded-lg"
        >
          <p class="font-bold text-accent break-all">
            {{ order.title }}
          </p>

          <p class="font-medium text-dimmed">
            {{ order.status.toLowerCase() }}
          </p>

          <p class="font-medium text-accent">
            {{ order.client }}
          </p>

          <p class="font-medium text-muted-accent">
            {{ formatDate(order.start) }}
          </p>
        </div>
      </div>

      <div class="xl:col-span-2">
        <div
          ref="calendarRef"
          class="h-175 border border-accent rounded-lg overflow-hidden bg-white"
        />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
