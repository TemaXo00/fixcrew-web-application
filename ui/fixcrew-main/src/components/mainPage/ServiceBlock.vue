<script setup lang="ts">
import ServiceCard from '@/components/universalComp/ServiceCard.vue'
</script>

<template>
  <div class="bg-[#D3D0D0] w-full p-5 relative flex justify-center flex-col gap-5">
    <div class="flex flex-col gap-5 text-center max-w-4xl px-4">
      <div class="text-[#626262] text-3xl font-semibold">Our expert service</div>
      <p class="text-[#626262] text-lg">
        From residential appliances to commercial equipment, we handle all <br />
        your repair needs with precision and care.
      </p>
    </div>

    <div class="flex justify-between">
      <ServiceCard />
      <ServiceCard />
    </div>
  </div>
</template>

<style scoped></style>
