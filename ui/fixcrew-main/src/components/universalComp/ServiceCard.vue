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
    <div class="p-4 sm:p-6 md:p-8 lg:p-10 flex flex-col flex-1 text-center">
      <h3 class="text-xl sm:text-2xl font-bold text-gray-600">{{ title }}</h3>
      <p class="text-sm sm:text-base text-gray-400 mb-2 sm:mb-4 font-semibold">{{ subtitle }}</p>

      <div class="mt-3 sm:mt-4 md:mt-5 mb-3 sm:mb-4 md:mb-5">
        <img
          :src="image"
          :alt="title"
          :class="['w-full object-cover rounded-lg', imageHeight || 'h-48 sm:h-56 md:h-64']"
        />
      </div>

      <div class="text-left flex-1 text-sm sm:text-base">
        <div class="hidden lg:block">
          <slot name="content"></slot>
        </div>

        <div class="lg:hidden">
          <div
            class="overflow-hidden transition-all duration-500 ease-in-out"
            :class="[
              isExpanded ? 'max-h-[1000px]' : 'max-h-[180px] sm:max-h-[160px] md:max-h-[200px]',
            ]"
          >
            <div
              class="relative"
              :class="{ 'line-clamp-4 sm:line-clamp-3 md:line-clamp-4': !isExpanded }"
            >
              <slot name="content"></slot>
            </div>
          </div>

          <button
            @click="isExpanded = !isExpanded"
            class="text-[#0077B6] font-semibold text-sm sm:text-base mt-2 hover:text-[#005b8c] transition-colors focus:outline-none lg:hidden"
          >
            {{ isExpanded ? 'Show less' : 'Read more...' }}
          </button>
        </div>
      </div>

      <div class="mt-6 sm:mt-8 md:mt-10">
        <Button />
      </div>
    </div>
  </div>
</template>
