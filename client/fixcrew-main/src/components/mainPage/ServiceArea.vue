<script setup lang="ts">
import AreasCard from '@/components/universalComp/AreasCard.vue'
import type { RegionInterface } from '@/interfaces/regions.interface.ts'
import { onMounted, ref, computed } from 'vue'
import { regionsApi } from '@/api/routes/regions.api.ts'
import { PHONE, PHONE_LINK } from '@/common/constants.ts'

const regions = ref<RegionInterface[]>()

const getRegions = async (): Promise<void> => {
  try {
    regions.value = await regionsApi.getRegions()
  } catch (err) {
    console.error(err)
  }
}

const getTouchSpanClass = computed(() => {
  if (!regions.value) return 'lg:col-span-3'

  const remaining = regions.value.length % 3
  if (remaining === 0) return 'lg:col-span-3'
  if (remaining === 1) return 'lg:col-span-2'
  if (remaining === 2) return 'lg:col-span-1'

  return 'lg:col-span-3'
})

onMounted(async () => {
  await getRegions()
})
</script>

<template>
  <div class="flex flex-col items-center gap-3 w-full px-4 sm:px-6 md:px-8">
    <div class="text-center max-w-2xl">
      <h2 class="text-3xl sm:text-4xl md:text-5xl font-sans mb-2 sm:mb-3 md:mb-4">Service Areas</h2>
      <p class="text-xl sm:text-2xl md:text-3xl font-sans">
        We proudly serve the Bay Area with fast, reliable appliance repair services. Check our
        response times for your location.
      </p>
    </div>

    <div class="w-full flex flex-col mt-6 sm:mt-8 md:mt-10">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
        <AreasCard
          v-for="region in regions"
          :key="region.id"
          :region="region.name"
          :response="region.avg_response"
        />
        <div
          v-if="regions && regions.length % 3 !== 0"
          class="border-4 border-[#EAEAEA] text-gray-600 p-4 sm:p-6 md:p-8 rounded-lg font-bold text-center text-base sm:text-lg md:text-xl"
          :class="getTouchSpanClass"
        >
          <div class="text-xl sm:text-2xl md:text-3xl font-sans font-semibold">Get In Touch</div>
          <div class="text-sm sm:text-base">Call Us available 24/7</div>
          <a
            :href="PHONE_LINK"
            class="font-semibold whitespace-nowrap underline text-sm sm:text-base"
          >
            📞 {{ PHONE }}
          </a>
        </div>
      </div>
      <div
        v-if="regions && regions.length % 3 === 0"
        class="border-4 border-[#EAEAEA] text-gray-600 p-4 sm:p-6 md:p-8 rounded-lg font-bold text-center text-base sm:text-lg md:text-xl w-full mt-3 sm:mt-4 md:mt-6"
      >
        <div class="text-xl sm:text-2xl md:text-3xl font-sans font-semibold">Get In Touch</div>
        <div class="text-sm sm:text-base">Call Us available 24/7</div>
        <a
          :href="PHONE_LINK"
          class="font-semibold whitespace-nowrap underline text-sm sm:text-base"
        >
          📞 {{ PHONE }}
        </a>
      </div>
    </div>
  </div>
</template>
