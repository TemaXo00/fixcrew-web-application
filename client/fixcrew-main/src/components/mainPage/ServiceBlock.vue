<script setup lang="ts">
import ServiceCard from '@/components/universalComp/ServiceCard.vue'
import residentalImage from '@/assets/images/residental.jpg'
import CommercialRepair from '@/assets/images/commercial.jpg'
import Booking from '@/assets/images/booking.jpg'
</script>

<template>
  <div
    class="w-full px-4 sm:px-6 md:px-7 py-6 sm:py-8 md:py-10 flex flex-col items-center gap-6 sm:gap-8 md:gap-10"
  >
    <div class="flex flex-col gap-3 sm:gap-4 md:gap-5 text-center max-w-4xl px-2 sm:px-4">
      <div class="text-2xl sm:text-3xl md:text-4xl text-[#626262] font-semibold">
        Our expert service
      </div>
      <p class="text-sm sm:text-base md:text-lg text-[#626262] font-semibold">
        From residential appliances to commercial equipment, we handle all
        <br class="hidden sm:block" />your repair needs with precision and care.
      </p>
    </div>

    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 w-full max-w-8xl auto-rows-fr"
    >
      <ServiceCard
        title="Residental Repair"
        subtitle="Home appliance solutions"
        :image="residentalImage"
      >
        <template #content>
          <ul class="flex flex-col gap-3 sm:gap-4 md:gap-5 list-none p-0">
            <li class="flex flex-col xs:flex-row items-start gap-3 sm:gap-4">
              <img
                src="@/assets/images/refrigerator.png"
                class="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0"
                alt="Refrigerator"
              />
              <div class="flex flex-col">
                <div class="text-lg sm:text-xl md:text-2xl text-[#626262] font-semibold">
                  Refrigerators
                </div>
                <div class="text-xs sm:text-sm md:text-base text-[#999999] font-semibold">
                  Temperature issues, water leaks, ice maker problems
                </div>
              </div>
            </li>

            <li class="flex flex-col xs:flex-row items-start gap-3 sm:gap-4">
              <img
                src="@/assets/images/dryer.png"
                class="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0"
                alt="Dryer"
              />
              <div class="flex flex-col">
                <div class="text-lg sm:text-xl md:text-2xl text-[#626262] font-semibold">
                  Dryers
                </div>
                <div class="text-xs sm:text-sm md:text-base text-[#999999] font-semibold">
                  Not heating, taking too long, lint buildup
                </div>
              </div>
            </li>

            <li class="flex flex-col xs:flex-row items-start gap-3 sm:gap-4">
              <img
                src="@/assets/images/dishwasher.png"
                class="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0"
                alt="Dishwasher"
              />
              <div class="flex flex-col">
                <div class="text-lg sm:text-xl md:text-2xl text-[#626262] font-semibold">
                  Dishwashers
                </div>
                <div class="text-xs sm:text-sm md:text-base text-[#999999] font-semibold">
                  Not cleaning, drainage issues, door problems
                </div>
              </div>
            </li>

            <li class="flex flex-col xs:flex-row items-start gap-3 sm:gap-4">
              <img
                src="@/assets/images/WashingMachine.png"
                class="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0"
                alt="Washing Machine"
              />
              <div class="flex flex-col">
                <div class="text-lg sm:text-xl md:text-2xl text-[#626262] font-semibold">
                  Washing Machines
                </div>
                <div class="text-xs sm:text-sm md:text-base text-[#999999] font-semibold">
                  Won't drain, excessive noise, not spinning
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
          <ul class="flex flex-col gap-4 sm:gap-5 md:gap-6 list-none p-0">
            <li>
              <div class="flex flex-col">
                <div
                  class="text-lg sm:text-xl md:text-2xl text-[#626262] font-semibold mb-1 sm:mb-2"
                >
                  Restaurant Equipment
                </div>
                <div class="text-xs sm:text-sm md:text-base text-[#999999] font-semibold">
                  Commercial refrigerators, ovens, dishwashers, and food prep equipment.
                </div>
                <ul class="list-disc pl-4 sm:pl-5 mt-1 sm:mt-2 space-y-0.5 sm:space-y-1">
                  <li class="text-xs sm:text-sm md:text-base text-[#999999] font-semibold">
                    Walk-in coolers and freezers
                  </li>
                  <li class="text-xs sm:text-sm md:text-base text-[#999999] font-semibold">
                    Commercial dishwashers
                  </li>
                  <li class="text-xs sm:text-sm md:text-base text-[#999999] font-semibold">
                    Industrial ovens and ranges
                  </li>
                  <li class="text-xs sm:text-sm md:text-base text-[#999999] font-semibold">
                    Ice machines and beverage equipment
                  </li>
                </ul>
              </div>
            </li>

            <li>
              <div class="flex flex-col">
                <div
                  class="text-lg sm:text-xl md:text-2xl text-[#626262] font-semibold mb-1 sm:mb-2"
                >
                  Office & Retail
                </div>
                <div class="text-xs sm:text-sm md:text-base text-[#999999] font-semibold">
                  Break room appliances and commercial laundry equipment.
                </div>
                <ul class="list-disc pl-4 sm:pl-5 mt-1 sm:mt-2 space-y-0.5 sm:space-y-1">
                  <li class="text-xs sm:text-sm md:text-base text-[#999999] font-semibold">
                    Commercial washers and dryers
                  </li>
                  <li class="text-xs sm:text-sm md:text-base text-[#999999] font-semibold">
                    Office refrigerators and microwaves
                  </li>
                  <li class="text-xs sm:text-sm md:text-base text-[#999999] font-semibold">
                    Vending machine support
                  </li>
                  <li class="text-xs sm:text-sm md:text-base text-[#999999] font-semibold">
                    Water coolers and dispensers
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </template>
      </ServiceCard>

      <ServiceCard title="How to book?" subtitle="24/7 response" :image="Booking">
        <template #content>
          <div class="flex flex-col gap-4 sm:gap-5 md:gap-6">
            <div class="text-sm sm:text-base md:text-lg text-[#626262] font-semibold">
              1. You can call
              <span>
                <a
                  href="tel:6507197300"
                  class="text-[#0077B6] text-1xl font-semibold whitespace-nowrap"
                >
                  650-719-7300
                </a>
              </span>
              or use our <span class="text-[#0077B6]">form</span>
            </div>
            <div class="text-sm sm:text-base md:text-lg text-[#626262] font-semibold">
              2. Tell us about your problem
            </div>
            <div class="text-sm sm:text-base md:text-lg text-[#626262] font-semibold">
              3. Choose the most convenient time and a day for you
            </div>
            <div class="text-sm sm:text-base md:text-lg text-[#626262] font-semibold">
              4. Done! We will be as soon as possible
            </div>

            <div class="text-xs sm:text-sm md:text-base text-[#999999] font-semibold">
              Get In Touch Call Us
              <div
                class="font-sans text-[#0077B6] font-bold underline text-xs sm:text-sm md:text-base"
              >
                <a href="tel:6507197300" class="hover:text-red-700 transition-colors"
                  >(650)719-7300</a
                >
              </div>
              Available 24/7 for emergency repairs
              <span class="text-sm sm:text-base md:text-lg text-[#626262] font-semibold">
                Service Areas Los Gatos, San Jose, Cupertino, Los Altos, Mountain View, Campbell,
                Palo Alto
              </span>
            </div>
          </div>
        </template>
      </ServiceCard>
    </div>
  </div>
</template>

<style scoped>
@media (min-width: 480px) {
  .xs\:flex-row {
    flex-direction: row;
  }
}

@media (max-width: 640px) {
  .list-disc li {
    margin-left: 0.5rem;
  }
}
</style>
