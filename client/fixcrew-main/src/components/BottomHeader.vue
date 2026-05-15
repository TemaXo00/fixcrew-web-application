<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import Button from '@/components/universalComp/Button.vue'
import type { TypesInterface } from '@/interfaces/types.interface.ts'
import { servicesApi } from '@/api/routes/services.api.ts'

const router = useRouter()
const isOpen = ref(false)

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

const closeMenu = () => {
  isOpen.value = false
}

const types = ref<TypesInterface[] | null>(null)

onMounted(async () => {
  try {
    types.value = await servicesApi.getTypeList()
  } catch {}
})

watch(
  () => router.currentRoute.value,
  () => {
    closeMenu()
  },
  { deep: true },
)
</script>

<template>
  <div class="relative">
    <div class="flex justify-evenly items-center bg-main h-20 px-4 md:px-8 lg:px-16 xl:px-30">
      <div class="relative z-50">
        <div class="space-y-2 cursor-pointer group" @click="toggleMenu">
          <span
            class="block w-6 sm:w-8 h-0.5 bg-white transition-transform duration-300 group-hover:bg-[#EAEAEA]"
            :class="{ 'rotate-45 translate-y-2.5': isOpen }"
          ></span>
          <span
            class="block w-4 sm:w-5 h-0.5 bg-white transition-all duration-300 group-hover:bg-[#EAEAEA]"
            :class="{ 'opacity-0 w-0': isOpen }"
          ></span>
        </div>

        <div
          v-if="isOpen"
          class="absolute left-0 top-12 w-64 sm:w-72 bg-main text-white shadow-xl rounded-lg overflow-hidden animate-fadeIn"
        >
          <div class="flex flex-col gap-1 p-3 sm:p-4 font-sans">
            <div class="border-b border-white/20 pb-3 flex flex-col gap-1">
              <router-link
                v-for="type in types"
                :key="type.id"
                :to="{ name: 'TypeDetailed', params: { id: type.id } }"
                @click="closeMenu"
                class="font-sans hover:bg-white/10 px-3 sm:px-4 py-2 sm:py-2.5 rounded-md cursor-pointer transition-colors duration-200 text-sm sm:text-base"
              >
                {{ type.name.toUpperCase() }}
              </router-link>
            </div>

            <Button></Button>
          </div>
        </div>
      </div>

      <router-link :to="{ name: 'Home' }">
        <img src="../assets/images/logo.svg" alt="logo" class="h-8 sm:h-10 md:h-12 select-none" />
      </router-link>

      <div
        class="hidden md:flex flex-row gap-3 xl:gap-5 text-white font-sans cursor-pointer text-lg"
      >
        <router-link
          v-for="type in types"
          :key="type.id"
          :to="{ name: 'TypeDetailed', params: { id: type.id } }"
          class="hover:text-[#EAEAEA] text-lg font-bold xl:text-lg whitespace-nowrap font-sans"
        >
          {{ type.name.toUpperCase() }}
        </router-link>
      </div>
      <RouterLink :to="{ name: 'Booking' }">
        <button
          class="text-white font-sans bg-[#0077B6] rounded-[10px] px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base hover:bg-[#006AA2] whitespace-nowrap font-sans"
        >
          Book Now
        </button>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.2s ease-out;
}
</style>
