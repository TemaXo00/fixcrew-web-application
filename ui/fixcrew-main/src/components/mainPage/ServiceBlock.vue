<script setup lang="ts">
import ServiceCard from '@/components/universalComp/ServiceCard.vue'
import residentalImage from '@/assets/images/residental.jpg'
import CommercialRepair from '@/assets/images/commercial.jpg'
</script>

<template>
  <div class=" w-full p-7 flex flex-col items-center gap-10">
    <div class="flex flex-col gap-5 text-center max-w-4xl">
      <div class="text-[#626262] text-3xl font-semibold">Our expert service</div>
      <p class="text-[#626262] text-lg font-semibold">
        From residential appliances to commercial equipment, we handle all <br />
        your repair needs with precision and care.
      </p>
    </div>

    <div class="grid grid-cols-2 gap-30 w-full max-w-6xl mx-auto auto-rows-fr">
      <ServiceCard
        title="Residental Repair"
        subtitle="Home appliance solutions"
        :image="residentalImage"
      >
        <template #content>
          <ul class="flex flex-col gap-5 list-none p-0">
            <li class="flex">
              <img src="@/assets/images/refrigerator.png" class="w-10 h-10 mr-5 self-center" />
              <div class="flex flex-col">
                <div class="text-2xl text-[#626262] font-semibold">Refrigerators</div>
                <div class="text-[#999999] font-semibold">
                  Temperature issues,<br />water leaks,<br />ice maker problems
                </div>
              </div>
            </li>

            <li class="flex">
              <img src="@/assets/images/dryer.png" class="w-10 h-10 mr-5 self-center" />
              <div class="flex flex-col">
                <div class="text-2xl text-[#626262] font-semibold">Dryers</div>
                <div class="text-[#999999] font-semibold">
                  Not heating, taking too long,<br />lint buildup
                </div>
              </div>
            </li>

            <li class="flex">
              <img src="@/assets/images/dishwasher.png" class="w-10 h-10 mr-5 self-center" />
              <div class="flex flex-col">
                <div class="text-2xl text-[#626262] font-semibold">Dishwashers</div>
                <div class="text-[#999999] font-semibold">
                  Not cleaning, drainage issues, door problems
                </div>
              </div>
            </li>

            <li class="flex">
              <img src="@/assets/images/WashingMachine.png" class="w-10 h-10 mr-5 self-center" />
              <div class="flex flex-col">
                <div class="text-2xl text-[#626262] font-semibold">Washing Machines</div>
                <div class="text-[#999999] font-semibold">
                  Won't drain, excessive noise,<br />not spinning
                </div>
              </div>
            </li>
          </ul>
        </template>
      </ServiceCard>

      <ServiceCard
        title="Commercial Repair"
        subtitle="Business equipment solutions"
        :image="CommercialRepair"
      >
        <template #content>
          <ul class="flex flex-col gap-5 list-none p-0">
            <li>
              <div class="flex flex-col">
                <div class="text-2xl text-[#626262] font-semibold">Restaurant Equipment</div>
                <div class="text-[#999999] font-semibold">
                  Commercial refrigerators, ovens, <br />dishwashers, and food prep equipment.
                </div>
                <ul class="list-disc pl-5 mt-2">
                  <li class="text-[#999999] font-semibold">Walk-in coolers and freezers</li>
                  <li class="text-[#999999] font-semibold">Commercial dishwashers</li>
                  <li class="text-[#999999] font-semibold">industrial ovens and ranges</li>
                  <li class="text-[#999999] font-semibold">Ice machines and beverage equipment</li>
                </ul>
              </div>
            </li>

            <li>
              <div class="flex flex-col">
                <div class="text-2xl text-[#626262] font-semibold">Office & Retail</div>
                <div class="text-[#999999] font-semibold">
                  Break room appliances and commercial <br />laundry equipment.
                </div>
                <ul class="list-disc pl-5 mt-2">
                  <li class="text-[#999999] font-semibold">Commercial washers and dryers</li>
                  <li class="text-[#999999] font-semibold">Office refrigerators and microwaves</li>
                  <li class="text-[#999999] font-semibold">Vending machine support</li>
                  <li class="text-[#999999] font-semibold">Water coolers and dispensers</li>
                </ul>
              </div>
            </li>
          </ul>
        </template>
      </ServiceCard>
    </div>
  </div>
</template>
