<script setup lang="ts">
import AreasCard from '@/components/universalComp/AreasCard.vue'
import type { RegionInterface } from '@/interfaces/regions.interface.ts'
import { onMounted, ref } from 'vue'
import { regionsApi } from '@/api/routes/regions.api.ts'
const regions = ref<RegionInterface[]>()

const getRegions = async (): Promise<void> => {
  try {
    regions.value = await regionsApi.getRegions()
  } catch (err) {
    console.error(err)
  }
}

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
          class="border-4 border-[#EAEAEA] text-gray-600 p-4 sm:p-6 md:p-8 rounded-lg font-bold text-center text-base sm:text-lg md:text-xl col-span-1 sm:col-span-2 lg:col-span-3 flex flex-col gap-2 sm:gap-3"
        >
          <div class="text-xl sm:text-2xl md:text-3xl font-sans font-semibold">Get In Touch</div>
          <div class="text-sm sm:text-base">Call Us available 24/7</div>
          <a
            href="tel:6507197300"
            class="font-semibold whitespace-nowrap underline text-sm sm:text-base"
          >
            📞 (650) 719-7300
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
