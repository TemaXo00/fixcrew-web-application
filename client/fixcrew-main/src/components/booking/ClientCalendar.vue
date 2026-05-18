<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue'
import { internalApi } from '@/api/instances.api'

const props = defineProps<{
  regionId: string
  durationMinutes: number
}>()

const emit = defineEmits<{
  (e: 'select', date: string, startMin: number, endMin: number): void
}>()

const selectedDate = ref<string>('')
const availableSlots = ref<{ startMin: number; endMin: number }[]>([])
const isLoading = ref(false)
const error = ref('')

const minDate = computed(() => {
  const today = new Date()
  return today.toISOString().split('T')[0]
})

async function fetchAvailableSlots() {
  if (!props.regionId || !selectedDate.value) return
  isLoading.value = true
  error.value = ''
  try {
    const res = await internalApi.get('/orders/available-slots', {
      params: {
        regionId: props.regionId,
        date: selectedDate.value,
        durationMinutes: props.durationMinutes,
      },
    })
    availableSlots.value = res.data.slots
  } catch (err) {
    error.value = 'Failed to load available time slots'
    console.error(err)
  } finally {
    isLoading.value = false
  }
}

function selectSlot(slot: { startMin: number; endMin: number }) {
  emit('select', selectedDate.value, slot.startMin, slot.endMin)
}

watch(selectedDate, () => {
  if (selectedDate.value) fetchAvailableSlots()
})

onMounted(() => {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  selectedDate.value = tomorrow.toISOString().split('T')[0]
})
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-col gap-2">
      <label class="font-medium">Select Date</label>
      <input
        type="date"
        v-model="selectedDate"
        :min="minDate"
        class="border-2 border-gray-200 rounded-lg p-2"
      />
    </div>

    <div v-if="isLoading" class="text-center py-4">Loading available times...</div>
    <div v-else-if="error" class="text-red-500 text-center py-4">{{ error }}</div>
    <div
      v-else-if="availableSlots.length === 0 && selectedDate"
      class="text-gray-500 text-center py-4"
    >
      No available slots for this date.
    </div>
    <div v-else class="grid grid-cols-2 sm:grid-cols-3 gap-3">
      <button
        v-for="slot in availableSlots"
        :key="slot.startMin"
        @click="selectSlot(slot)"
        class="bg-accent text-container px-4 py-2 rounded-lg hover:opacity-90 transition"
      >
        {{
          Math.floor(slot.startMin / 60)
            .toString()
            .padStart(2, '0')
        }}:{{ (slot.startMin % 60).toString().padStart(2, '0') }}
        –
        {{
          Math.floor(slot.endMin / 60)
            .toString()
            .padStart(2, '0')
        }}:{{ (slot.endMin % 60).toString().padStart(2, '0') }}
      </button>
    </div>
  </div>
</template>
