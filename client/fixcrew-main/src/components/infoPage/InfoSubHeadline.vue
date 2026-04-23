<script setup lang="ts">
interface Props {
  avg_time: number | undefined
}

const props = defineProps<Props>()
</script>

<template>
  <div class="flex flex-col items-center gap-4 sm:gap-5 md:gap-7 px-4 sm:px-0">
    <div v-if="props.avg_time != undefined">
      <p class="text-base sm:text-lg md:text-xl text-[#626262] text-center">
        Average time: <span class="text-main">{{ props.avg_time }} minutes</span>
      </p>
    </div>
  </div>
</template>
