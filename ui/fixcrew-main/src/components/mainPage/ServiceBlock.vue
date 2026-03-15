<script setup lang="ts">
import ServiceCard from '@/components/universalComp/ServiceCard.vue'
import residentalImage from '@/assets/images/residental.jpg'
import ServiceList from '@/components/universalComp/ServiceList.vue'
import Button from '@/components/universalComp/Button.vue'
</script>

<template>
  <div class="bg-[#D3D0D0] w-full p-7 flex flex-col items-center gap-10">
    <div class="flex flex-col gap-5 text-center max-w-4xl">
      <div class="text-[#626262] text-3xl font-semibold">Our expert service</div>
      <p class="text-[#626262] text-lg font-semibold">
        From residential appliances to commercial equipment, we handle all <br />
        your repair needs with precision and care.
      </p>
    </div>

    <div class="flex justify-center gap-5 w-full max-w-6xl mx-auto">
      <ServiceCard class="flex-1">
        <div class="p-10 text-center">
          <h3 class="text-2xl font-bold text-gray-600 font-semibold">Residental Repair</h3>
          <p class="text-gray-400 mb-4 font-semibold">Home appliance solutions</p>
          <img :src="residentalImage" alt="Residental repair" class="mt-5 mb-5" />
          <ul class="flex justify-column gap-5">
            <ul class="flex flex-col gap-5 list-none p-0 text-left">
              <li class="flex gap-[2px]">
                <img
                  src="@/assets/images/refrigerator.png"
                  alt=""
                  class="w-10 h-10 flex-shrink-0 self-center mr-5"
                />
                <div class="flex flex-col">
                  <div class="text-2xl text-[#626262] font-semibold">Refrigerators</div>
                  <div>
                    <div class="text-[#999999] font-semibold">
                      Temperature issues,<br />
                      water leaks,<br />
                      ice maker problems
                    </div>
                  </div>
                </div>
              </li>

              <li class="flex gap-[2px]">
                <img
                  src="@/assets/images/dryer.png"
                  alt=""
                  class="w-10 h-10 flex-shrink-0 self-center mr-5"
                />
                <div class="flex flex-col">
                  <div class="text-2xl text-[#626262] font-semibold">Dryers</div>
                  <div>
                    <div class="text-[#999999] font-semibold">
                      Not heating, taking too long,<br />
                      lint buildup
                    </div>
                  </div>
                </div>
              </li>

              <li class="flex gap-[2px]">
                <img
                  src="@/assets/images/dishwasher.png"
                  alt=""
                  class="w-10 h-10 flex-shrink-0 self-center mr-5"
                />
                <div class="flex flex-col">
                  <div class="text-2xl text-[#626262] font-semibold">Dishwashers</div>
                  <div>
                    <div class="text-[#999999] font-semibold">
                      Not cleaning, drainage issues, door problems
                    </div>
                  </div>
                </div>
              </li>

              <li class="flex gap-[2px]">
                <img
                  src="@/assets/images/WashingMachine.png"
                  alt=""
                  class="w-10 h-10 flex-shrink-0 self-center mr-5"
                />
                <div class="flex flex-col">
                  <div class="text-2xl text-[#626262] font-semibold">Washing Machines</div>
                  <div>
                    <div class="text-[#999999] font-semibold">
                      Won't drain, excessive noise,<br />
                      not spinning
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </ul>
          <Button class="mt-10"></Button>
        </div>
      </ServiceCard>

      <ServiceCard class="flex-1">
        <div class="p-10 text-center">
          <h3 class="text-2xl font-bold text-gray-600">Residental Repair</h3>
          <p class="text-gray-400 mb-4">Home appliance solutions</p>

          <button class="bg-blue-500 text-white px-4 py-2 rounded">Заказать</button>
        </div>
      </ServiceCard>
    </div>
  </div>
</template>

<style scoped></style>
