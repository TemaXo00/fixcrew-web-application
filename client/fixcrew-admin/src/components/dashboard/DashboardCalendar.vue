<script setup lang="ts">
import type { OrderCalendar } from '@/types/order/order.types.ts'
import Calendar from '@toast-ui/calendar'
import { nextTick, onMounted, ref, watch } from 'vue'
import { extractApiError } from '@/api/error-handler.api.ts'
import { orderApi } from '@/api/order/order.api.ts'
import CalendarSwitch from '@/components/dashboard/CalendarSwitch.vue'
import CalendarTypes from '@/components/dashboard/CalendarTypes.vue'
import ErrorCode from '@/components/shared/errors/ErrorCode.vue'
import SpinnerLoader from '@/components/shared/SpinnerLoader.vue'
import Title from '@/components/shared/Title.vue'
import { useProfileStore } from '@/stores/profile.store.ts'
import '@toast-ui/calendar/dist/toastui-calendar.min.css'

const calendarRef = ref<HTMLDivElement | null>(null)
let calendarInstance: typeof Calendar | null = null
const store = useProfileStore()
const orders = ref<OrderCalendar[]>([])
const isLoading = ref<boolean>(false)
const errorMessage = ref<string>('')
const errorCode = ref<number | null>(null)

const currentView = ref<'month' | 'week' | 'day'>('week')
const currentDate = ref<Date>(new Date())

const fetchOrders = async () => {
  if (!store.user?.id)
    return

  try {
    isLoading.value = true
    errorMessage.value = ''
    errorCode.value = null
    const response = await orderApi.getPendingOrders(store.user.id)
    orders.value = response.items || []
  }
  catch (err) {
    const apiError = extractApiError(err)
    errorMessage.value = apiError.message
    errorCode.value = apiError.statusCode
  }
  finally {
    isLoading.value = false
  }
}

const ensureUserAndFetch = async () => {
  if (store.user?.id) {
    await fetchOrders()
    return true
  }

  await store.getMe()

  if (store.user?.id) {
    await fetchOrders()
    return true
  }

  return false
}

const updateCalendarEvents = () => {
  if (!calendarInstance)
    return
  calendarInstance.clear()

  const events = orders.value.map(order => ({
    id: order.id,
    calendarId: '1',
    title: order.client_name,
    category: 'time' as const,
    start: order.start,
    end: order.end,
    backgroundColor: 'var(--color-accent)',
    borderColor: 'var(--color-muted-accent)',
    color: 'var(--color-container)',
  }))

  calendarInstance.createEvents(events)
}

const initCalendar = async () => {
  if (!calendarRef.value)
    return

  await nextTick()

  if (calendarInstance) {
    calendarInstance.destroy()
    calendarInstance = null
  }

  calendarInstance = new Calendar(calendarRef.value, {
    defaultView: currentView.value,
    usageStatistics: false,
    isReadOnly: true,
    week: {
      showNow: true,
      showTimezoneCollapseButton: false,
      startDayOfWeek: 0,
    },
    month: {
      dayNames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      startDayOfWeek: 0,
    },
  })

  if (currentDate.value) {
    calendarInstance.setDate(currentDate.value)
  }

  updateCalendarEvents()
}

const handleViewChange = (view: 'month' | 'week' | 'day') => {
  currentView.value = view
  if (calendarInstance) {
    calendarInstance.changeView(view)
  }
}

const handlePrev = () => {
  if (!calendarInstance)
    return
  calendarInstance.prev()
  const date = calendarInstance.getDate()
  currentDate.value = date instanceof Date ? date : new Date()
}

const handleNext = () => {
  if (!calendarInstance)
    return
  calendarInstance.next()
  const date = calendarInstance.getDate()
  currentDate.value = date instanceof Date ? date : new Date()
}

const handleToday = () => {
  if (!calendarInstance)
    return
  calendarInstance.today()
  currentDate.value = new Date()
}

watch(currentView, () => {
  if (calendarInstance) {
    calendarInstance.changeView(currentView.value)
  }
})

watch(orders, () => {
  updateCalendarEvents()
})

onMounted(async () => {
  const hasUser = await ensureUserAndFetch()

  if (!hasUser) {
    setTimeout(async () => {
      await ensureUserAndFetch()
      await initCalendar()
    }, 2000)
    return
  }

  await initCalendar()
})
</script>

<template>
  <div class="flex flex-col items-start gap-4">
    <Title
      title="Schedule Calendar"
      class="text-lg text-dimmed"
    />

    <div class="flex flex-col medium:flex-row gap-3 w-full">
      <CalendarSwitch
        @prev="handlePrev"
        @next="handleNext"
        @today="handleToday"
      />
    </div>

    <SpinnerLoader v-if="isLoading && !orders.length" />

    <div
      v-else-if="errorCode"
      class="w-full flex justify-center py-8"
    >
      <ErrorCode
        :message="errorMessage"
        :code="errorCode"
      />
    </div>

    <div
      v-else
      ref="calendarRef"
      class="w-full"
      style="height: 550px"
    />

    <div class="flex flex-col medium:flex-row gap-3 w-full">
      <CalendarTypes
        :current-view="currentView"
        @change-view="handleViewChange"
      />
    </div>
  </div>
</template>

<style scoped></style>
