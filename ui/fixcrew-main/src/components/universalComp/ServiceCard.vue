<script setup lang="ts">
import Button from './Button.vue'

defineProps<{
  title: string
  subtitle: string
  image: string
  imageHeight?: string
}>()
</script>

<template>
  <div class="bg-[#E7E7E7] rounded-2xl flex flex-col h-full">
    <div class="p-10 flex flex-col flex-1 text-center">
      <h3 class="text-2xl font-bold text-gray-600">{{ title }}</h3>
      <p class="text-gray-400 mb-4 font-semibold">{{ subtitle }}</p>

      <div class="mt-5 mb-5">
        <img
          :src="image"
          :alt="title"
          :class="['w-full object-cover rounded-lg', imageHeight || 'h-64']"
        />
      </div>

      <div class="text-left flex-1">
        <slot name="content"></slot>
      </div>

      <div class="mt-10">
        <Button />
      </div>
    </div>
  </div>
</template>
