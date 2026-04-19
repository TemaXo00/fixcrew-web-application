<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  price: number | undefined
  sale_percent: number | undefined
  avg_time: number | undefined
}

const props = defineProps<Props>()

const priceWithSale = computed<number | null>(() => {
  if (props.sale_percent === undefined || props.price === undefined) return null
  return props.price * ((100 - props.sale_percent) / 100)
})
</script>

<template>
  <div class="flex flex-col items-center gap-4 sm:gap-5 md:gap-7 px-4 sm:px-0">
    <div class="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 md:gap-4">
      <p
        class="text-xl sm:text-2xl"
        :class="
          props.sale_percent != undefined && props.sale_percent > 0
            ? 'line-through text-muted font-thin'
            : 'text-main font-semibold'
        "
      >
        ${{ props.price }}
      </p>

      <div
        v-if="props.sale_percent != undefined && props.sale_percent > 0"
        class="flex flex-row items-center gap-1 sm:gap-2"
      >
        <p class="text-[#626262] text-base sm:text-lg md:text-xl font-medium">
          -{{ props.sale_percent }}%
        </p>

        <p class="text-main font-semibold text-xl sm:text-2xl">${{ priceWithSale }}</p>
      </div>
    </div>

    <div v-if="props.avg_time != undefined">
      <p class="text-base sm:text-lg md:text-xl text-[#626262] text-center">
        Average time: <span class="text-main">{{ props.avg_time }} minutes</span>
      </p>
    </div>
  </div>
</template>
