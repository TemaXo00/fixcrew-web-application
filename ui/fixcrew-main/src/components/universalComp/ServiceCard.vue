<script setup lang="ts">
import { ref } from 'vue'
import Button from '@/components/universalComp/Button.vue'

defineProps<{
  title: string
  subtitle: string
  image: string
  imageHeight?: string
}>()

const isExpanded = ref(false)
</script>

<template>
  <div class="bg-[#E7E7E7] rounded-2xl flex flex-col h-full">
    <div class="p-4 sm:p-5 md:p-6 lg:p-8 xl:p-10 flex flex-col flex-1 text-center">
      <h3 class="text-lg sm:text-xl md:text-2xl font-bold text-gray-600">{{ title }}</h3>
      <p class="text-xs sm:text-sm md:text-base text-gray-400 mb-2 sm:mb-3 md:mb-4 font-semibold">
        {{ subtitle }}
      </p>

      <div class="mt-2 sm:mt-3 md:mt-4 lg:mt-5 mb-2 sm:mb-3 md:mb-4 lg:mb-5">
        <img
          :src="image"
          :alt="title"
          :class="['w-full object-cover rounded-lg', imageHeight || 'h-40 sm:h-48 md:h-56 lg:h-64']"
        />
      </div>

      <div class="text-left flex-1 text-xs sm:text-sm md:text-base">
        <div class="hidden lg:block">
          <slot name="content"></slot>
        </div>

        <div class="lg:hidden">
          <div
            class="overflow-hidden transition-all duration-500 ease-in-out"
            :class="[
              isExpanded ? 'max-h-[2000px]' : 'max-h-[150px] sm:max-h-[160px] md:max-h-[180px]',
            ]"
          >
            <div
              class="relative"
              :class="{ 'line-clamp-3 sm:line-clamp-3 md:line-clamp-4': !isExpanded }"
            >
              <slot name="content"></slot>
            </div>
          </div>

          <button
            @click="isExpanded = !isExpanded"
            class="text-[#0077B6] font-semibold text-xs sm:text-sm md:text-base mt-2 hover:text-[#005b8c] transition-colors focus:outline-none lg:hidden"
          >
            {{ isExpanded ? 'Show less' : 'Read more...' }}
          </button>
        </div>
      </div>

      <div class="mt-4 sm:mt-5 md:mt-6 lg:mt-8 xl:mt-10">
        <Button />
      </div>
    </div>
  </div>
</template>
