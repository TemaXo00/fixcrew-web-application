<script setup lang="ts">
import AreasCard from '@/components/universalComp/AreasCard.vue'
</script>

<template>
  <div class="flex flex-col items-center gap-3 w-full">
    <div class="text-center max-w-2xl">
      <h2 class="text-5xl font-sans mb-4">Service Areas</h2>
      <p class="text-3xl font-sans">
        We proudly serve the Bay Area with fast, reliable appliance repair services. Check our
        response times for your location.
      </p>
    </div>

    <div class="w-full flex flex-col mt-10">
      <div class="grid grid-cols-3 gap-4">
        <AreasCard region="Los Gatos" response="15" />
        <AreasCard region="San Jose" response="30" />
        <AreasCard region="Cupertino" response="35" />
        <AreasCard region="Mountain View" response="35" />
        <AreasCard region="Campbell" response="30" />
        <AreasCard region="Los Altos" response="35" />
        <AreasCard region="Palo Alto" response="35" />
        <div
          class="border-4 border-[#EAEAEA] text-gray-600 p-8 rounded-lg font-bold text-center text-xl col-span-2 flex flex-col gap-3"
        >
          <div class="text-2xl font-sans font-semibold">Get In Touch</div>
          Call Us available 24/7
          <a href="tel:6507197300" class="font-semibold whitespace-nowrap underline"> 📞 (650) 719-7300 </a>
        </div>
      </div>
    </div>
  </div>
</template>
