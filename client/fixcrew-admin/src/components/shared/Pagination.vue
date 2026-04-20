<script setup lang="ts">
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/vue/24/solid'

interface Props {
  currentPage?: number
  totalPages?: number
  hasPrev?: boolean
  hasNext?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  currentPage: 1,
  totalPages: 1,
  hasPrev: false,
  hasNext: false,
})

const emit = defineEmits<{
  (e: 'pageChange', page: number): void
  (e: 'prev'): void
  (e: 'next'): void
}>()

const getVisiblePages = () => {
  if (!props.totalPages || props.totalPages <= 0)
    return [1]

  const delta = 2
  const range: number[] = []
  const current = props.currentPage || 1
  const total = props.totalPages
  const start = Math.max(1, current - delta)
  const end = Math.min(total, current + delta)

  for (let i = start; i <= end; i++) {
    range.push(i)
  }

  if (start > 1) {
    range.unshift(1)
    if (start > 2) {
      range.splice(1, 0, -1)
    }
  }

  if (end < total) {
    if (end < total - 1) {
      range.push(-1)
    }
    range.push(total)
  }

  return range
}

const goToPage = (page: number) => {
  const current = props.currentPage || 1
  const total = props.totalPages || 1
  if (page !== current && page >= 1 && page <= total) {
    emit('pageChange', page)
  }
}

const goToPrev = () => {
  if (props.hasPrev) {
    emit('prev')
  }
}

const goToNext = () => {
  if (props.hasNext) {
    emit('next')
  }
}
</script>

<template>
  <div
    v-if="totalPages && totalPages > 1"
    class="flex items-center justify-center gap-1 small:gap-2 mt-4 py-2 flex-wrap"
  >
    <button
      type="button"
      class="px-2 small:px-3 py-1 small:py-2 rounded-lg bg-accent text-container font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted-accent transition-colors text-sm small:text-base"
      :disabled="!hasPrev"
      @click="goToPrev"
    >
      <ArrowLeftIcon class="w-6 h-6" />
    </button>

    <button
      v-for="page in getVisiblePages()"
      :key="page"
      type="button"
      class="min-w-8 small:min-w-10 h-8 small:h-10 rounded-lg font-medium transition-colors text-sm small:text-base"
      :class="[
        page === (currentPage || 1)
          ? 'bg-accent text-white'
          : page === -1
            ? 'bg-transparent text-dimmed cursor-default'
            : 'bg-container-muted/30 text-dimmed/50 hover:bg-accent/50',
      ]"
      :disabled="page === -1"
      @click="page !== -1 && goToPage(page)"
    >
      <span v-if="page === -1">...</span>
      <span v-else>{{ page }}</span>
    </button>

    <button
      type="button"
      class="px-2 small:px-3 py-1 small:py-2 rounded-lg bg-accent text-container font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted-accent transition-colors text-sm small:text-base"
      :disabled="!hasNext"
      @click="goToNext"
    >
      <ArrowRightIcon class="w-6 h-6" />
    </button>
  </div>
</template>
